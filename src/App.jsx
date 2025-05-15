/**
 * 
 * CURRENT TASK:
 * speed inc and dec buttons with their inputs
 * speed presets
 * mirror
 * 
 * 
 * ISSUES: 
 * how should i make it so when you change the skip to an invalid value,
 *  it goes back to what it was before? not big issue though
 * 
 * i think i maybe want to make full screen only display the video
 * if there are no controls except pause in full screen is that fine?
 * maybe keep the forward and back arrows.
 * 
 * make it so clicking on div/text of a button also clicks that button
 * 
 */

import vid from './assets/vid.MOV';
import './App.css';

import { useState, useRef, useEffect } from 'react';

function App() {

  // note: later add in upload somehow

  //useStates to sync UI
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [curTime, setCurTime] = useState(0.0); //in seconds
  const [vidDuration, setVidDuration] = useState(0.0); //is set to correct format
  const [speed, setSpeed] = useState(1.0);

  const [bigSkipBack, setBigSkipBack] = useState(10.0);
  const [skipBack, setSkipBack] = useState(1.0);
  const [skipForward, setSkipForward] = useState(1.0);
  const [bigSkipForward, setBigSkipForward] = useState(10.0);

  const [speedInc, setSpeedInc] = useState(.05);

  //get DOM references (js usable vars drawn from the HTML)
  const vidContainerRef = useRef(null);
  const vidRef = useRef(null);

  //handle keyboard inputs
  //useeffect is called on first render and on every time one of provided dependecies (like a useState) in the array change
  //this says: "on first render (since no dependencies), add listener for keydown to the whole window.
  //  then, when we are done, the return function is called to cleanup the listener"
  useEffect(() => { 

    function handleKeyDown(myE) {
      switch (myE.key.toLowerCase()) {
        case " ":
          myE.preventDefault();
          clickPlay();
          break;
        case "arrowleft":
          skip(-1);
          break;
        case "arrowright":
          skip(1);
          break;
      }
    }

    document.addEventListener('fullscreenchange', () => {
      setFullScreen(document.fullscreenElement != null);
    })
    window.addEventListener('keydown', (e) => handleKeyDown(e));

    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e));
      document.removeEventListener('fullscreenchange', () => {
        setFullScreen(document.fullscreenElement != null);
      });
    }

  }, []);

  function skip(t) {
    if (isNaN(t)) {
      return;
    }

    //check if end of video
    const calcTime = vidRef.current.currentTime + parseFloat(t);
    if (calcTime >= vidDuration) {
      vidRef.current.dispatchEvent(new Event("ended"));
    }
    vidRef.current.currentTime = calcTime;
  }

  function clickPlay() {
    //actually pause/unpause the video
    playing ? vidRef.current.pause() : vidRef.current.play();

    //change the state to rerender button
    setPlaying(!playing);
  }

  function clickMute() {
    vidRef.current.muted = !vidRef.current.muted;
  }

  function changeVolume(e) {
    vidRef.current.volume = e.target.value;
    vidRef.current.muted = e.target.value === 0;
  }

  function clickFullScreen() {

    if (document.fullscreenElement == null) {
      vidContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    //remember i still need state changes to trigger icon rerenders
    setFullScreen(!fullScreen);
  }

  function changeSkip(e, button) {
    
    const value = e.target.value;
    console.log("value: "+ value);

    if (button === "bigSkipBack") {
      setBigSkipBack(value ? value : bigSkipBack);
    } else if (button === 'skipBack') {
      setSkipBack(value ? value : skipBack);
    } else if (button === 'skipForward') {
      setSkipForward(value ? value : skipForward);
    } else if (button === 'bigSkipForward') {
      setBigSkipForward(value ? value : bigSkipForward);
    }

  }

  // provide either the value or the amt to increment by
  function incSpeed(value, inc) {
    value = parseFloat(value);
    inc = parseFloat(inc);

    if (value !== 0) {

      if (value > 2 || value < .05) return;

      vidRef.current.playbackRate = value;
      setSpeed(value);

    } else if (inc !== 0) {

      let newRate = vidRef.current.playbackRate + inc;
      newRate = Math.round(newRate*100)/100
      if (newRate > 2 || newRate < .05) return;
      
      vidRef.current.playbackRate = newRate;
      setSpeed(newRate);

    }

  }

  function changeSpeedInc(e, isIncButton) {
    const value = parseFloat(e.target.value);

    if (isIncButton) {
      setSpeedInc(value ? value : speedInc);
    }
  }

  //unfortunately... no idea what this is
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2});

  //formats both the cur time and the total duration
  function formatTime(time) {

    let strBuild = "";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
    }

  }

  return (
    <>
      <div className="video-container" ref={vidContainerRef}>

        <video 
          src={vid} 
          ref={vidRef} 
          onClick={clickPlay} 
          onEnded={clickPlay}
          onTimeUpdate={(e) => setCurTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setVidDuration(e.target.duration)}
        />

      </div>
      <div className="video-controls-container">

          <div className="timeline-container"> </div>

          <div className="controls">

            <button className="play-button" onClick={clickPlay}>
              { playing ? "Pause" : "Play" }
            </button>

            <div className="volume-container">
              <button className="mute-button" onClick={clickMute}>Vol/Mute</button>
              <input className="volume-slider" onChange={(e) => changeVolume(e)} type="range" min="0" max="1" step="any" defaultValue="1"></input>
            </div>

            <button className="full-screen-button" onClick={clickFullScreen}>{fullScreen ? "Exit" : "Full Screen"}  
            </button>
            
            <div className="duration-container">
              <button className="skip-button" onClick={() => skip(-bigSkipBack)}>{"<<"}</button>
              <input className="skip-input" defaultValue={bigSkipBack} type="number" step="0.1" onChange={(e) => changeSkip(e, "bigSkipBack")}></input> 

              <button className="skip-button" onClick={() => skip(-skipBack)}> {"<"}  </button>
              <input className="skip-input" defaultValue={skipBack} type="number" step="0.1" onChange={(e) => changeSkip(e, "skipBack")}></input>

              <p>{`${formatTime(curTime)} / ${formatTime(vidDuration)}`}</p>

              <input className="skip-input" defaultValue={skipForward} type="number" step="0.1" onChange={(e) => changeSkip(e, "skipForward")}></input>
              <button className="skip-button" onClick={() => skip(skipForward)}> {">"} </button>

              <input className="skip-input" defaultValue={bigSkipForward} type="number" step="0.1" onChange={(e) => changeSkip(e, "bigSkipForward")}></input>
              <button className="skip-button" onClick={() => skip(bigSkipForward)}> {">>"} </button>

            </div> 

            <div className="speed-container">

              <p className="speed-text">{speed}x</p>
              <input className="speed-slider" 
                onChange={(e) => incSpeed(e.target.value, 0)} 
                type="range" min=".1" max="2" step=".05" 
                value={speed} list="step-list">
              </input>
              <datalist id="step-list">
                  <option>.25</option>
                  <option>.5</option>
                  <option>.75</option>
                  <option>1</option>
                  <option>1.25</option>
                  <option>1.5</option>
                  <option>1.75</option>
              </datalist>

              <input className="speed-inc-input" 
                defaultValue={speedInc} type="number" 
                step="0.05" min=".05" max="1"
                onChange={(e) => changeSpeedInc(e, true)}>
              </input>
              <button className="speed-inc-button" onClick={() => incSpeed(0, speedInc)}> {"+"} </button>
              
            </div>
          
          </div>

      </div>
      <div className="footer">
        <p>DanceIt!</p>
      </div>
    </>
  );
}

export default App;
