import vid from './assets/vid.MOV';
import './App.css';

import { useState, useRef } from 'react';

function App() {

  // note: later add in upload somehow

  //useStates to sync UI
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //get DOM references (js usable vars drawn from the HTML)
  const vidRef = useRef(null);

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

  return (
    <>
      <div className={`video-container ${fullScreen ? 'full-screen' : ''}`}>

        <video src={vid} ref={vidRef} onEnded={clickPlay}> </video>

        <br/>

        <div className="video-controls-container">

          <div className="timeline-container">

          </div>

          <div className="controls">
            <button className="play-button" onClick={clickPlay}>
              { playing ? "Pause" : "Play" }
            </button>

            <div className="volume-container">
              <button className="mute-button" onClick={clickMute}>Vol/Mute</button>
              <input className="volume-slider" onChange={(e) => changeVolume(e)} type="range" min="0" max="1" step="any" defaultValue="1"></input>
            </div>

            <button className="full-screen-button" onClick={() => setFullScreen(!fullScreen)}>{fullScreen ? "Exit" : "Full Screen"}</button>

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
