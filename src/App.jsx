import vid from './assets/vid.MOV';
import './App.css';

import { useState, useRef } from 'react';

function App() {

  //later add in upload somehow

  const [playing, setPlaying] = useState(false);
  const vidRef = useRef(null);

  function clickPlay() {
    //actually pause/unpause the video
    playing ? vidRef.current.pause() : vidRef.current.play();

    //change what the button says
    setPlaying(!playing);
  }


  return (
    <>
      <div className="video-container">
        <video src={vid} ref={vidRef}></video>
      </div>

      <div className="video-controls-container">
          <div className="timeline-container"></div>

          <div className="controls">
            <button className="play-button" onClick={clickPlay}>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
      </div>

      <br/>
      <div className="footer">
        <p>DanceIt! by David Shi</p>
      </div>
    </>
  );
}

export default App;
