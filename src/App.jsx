import vid from './assets/vid.MOV';
import './App.css';

import { useState, useRef, useEffect } from 'react';
import { splitVendorChunkPlugin } from 'vite';

function App() {

  // note: later add in upload somehow

  //useStates to sync UI
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [curTime, setCurTime] = useState(0); //in seconds
  const [vidDuration, setVidDuration] = useState(0); //is set to correct format

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
          skip(-5);
          break;
        case "arrowright":
          skip(5);
          break;
      }
    }

    window.addEventListener('keydown', (e) => handleKeyDown(e));

    return () => window.removeEventListener('keydown', (e) => handleKeyDown(e));
  }, []);

  function skip(time) {
    vidRef.current.currentTime += duration;
  }

  function clickPlay() {
    if (!vidRef.current) return;

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
      <div className={`video-container ${fullScreen ? 'full-screen' : ''}`} ref={vidContainerRef}>

        <video 
          src={vid} 
          ref={vidRef} 
          onClick={clickPlay} 
          onEnded={clickPlay}
          onTimeUpdate={(e) => setCurTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setVidDuration(formatTime(e.target.duration))}
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
              <p>{`${formatTime(curTime)} / ${vidDuration}`}</p>
            </div>

          </div>

      </div>

      <div className="footer">
        <p>DanceIt! by David Shi</p>
      </div>
    </>
  );
}

export default App;
