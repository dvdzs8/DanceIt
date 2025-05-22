/**
 * 
 * CURRENT TASK:
 * loop (for subsections)
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
 * warnings: 'content-type' header charset should be utf-8? media type should be
 * text/jsx not text/javascript ? form field should have id or name attribute
 */

import vid from './assets/vid.MOV';
import './App.css';

import VideoContainer from './components/VideoContainer';

import { useState, useRef, useEffect } from 'react';
import VideoControls from './components/VideoControls';

function App() {

  // note: later add in upload somehow

  //useStates to sync UI
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [curTime, setCurTime] = useState(0.0); //in seconds
  const [vidDuration, setVidDuration] = useState(0.0);
  const [looping, setLooping] = useState(false);

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

    function handleFullScreen() {
      setFullScreen(document.fullscreenElement != null);
    }

    document.addEventListener('fullscreenchange', handleFullScreen); 
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreen);
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  function clickPlay() {
    //actually pause/unpause the video
    playing ? vidRef.current.pause() : vidRef.current.play();

    //change the state to rerender button
    setPlaying(!playing);
    return "haha";
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
      
      <VideoContainer 
        vidContainerRef={vidContainerRef}
        vid={vid}
        vidRef={vidRef}
        clickPlay={clickPlay}
        setCurTime={setCurTime}
        setVidDuration={setVidDuration}
        looping={looping}
      />

      <VideoControls
        vidRef={vidRef}
        clickPlay={clickPlay}
        playing={playing}
        clickFullScreen={clickFullScreen}
        fullScreen={fullScreen}
        formatTime={formatTime}
        curTime={curTime}
        vidDuration={vidDuration}
        looping={looping}
        setLooping={setLooping}
      />
      
      <div className="footer">
        <span>DanceIt!</span>
      </div>
    </>
  );
}

export default App;
