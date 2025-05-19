import { useState, useRef } from 'react';
import SpeedControls from './SpeedControls';
import AdditionalControls from './AdditionalControls';

export default function VideoControlsContainer({ 
    vidRef, clickPlay, playing, clickFullScreen,
    fullScreen, formatTime, curTime, vidDuration,
}) {

    const [bigSkipBack, setBigSkipBack] = useState(10.0);
    const [skipBack, setSkipBack] = useState(1.0);
    const [skipForward, setSkipForward] = useState(1.0);
    const [bigSkipForward, setBigSkipForward] = useState(10.0);

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

    function changeSkip(e, button) {
    
        const value = e.target.value;

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

    function clickMute() {
        vidRef.current.muted = !vidRef.current.muted;
    }

    function changeVolume(e) {
        vidRef.current.volume = e.target.value;
        vidRef.current.muted = e.target.value === 0;
    }

    return (
        <div className="video-controls-container">
            
            <div className="primary-controls">
                <div className="timeline-container">
                    <span className="time-text">{`${formatTime(curTime)} / ${formatTime(vidDuration)}`}</span>
                </div>

                <div className="first-line-controls">

                    <div className="volume-container">
                        <button className="mute-button" onClick={clickMute}>V</button>
                        <input className="volume-slider" onChange={(e) => changeVolume(e)} type="range" min="0" max="1" step="any" defaultValue="1"></input>
                    </div>
                    
                    <button className="skip-button" onClick={() => skip(-bigSkipBack)}>{"<<"}</button>
                    <input className="skip-input" defaultValue={bigSkipBack} type="number" step="0.1" onChange={(e) => changeSkip(e, "bigSkipBack")}></input> 

                    <button className="skip-button" onClick={() => skip(-skipBack)}> {"<"}  </button>
                    <input className="skip-input" defaultValue={skipBack} type="number" step="0.1" onChange={(e) => changeSkip(e, "skipBack")}></input>

                    <button className="play-button" onClick={clickPlay}>
                        { playing ? "Pause" : "Play" }
                    </button>

                    <input className="skip-input" defaultValue={skipForward} type="number" step="0.1" onChange={(e) => changeSkip(e, "skipForward")}></input>
                    <button className="skip-button" onClick={() => skip(skipForward)}> {">"} </button>

                    <input className="skip-input" defaultValue={bigSkipForward} type="number" step="0.1" onChange={(e) => changeSkip(e, "bigSkipForward")}></input>
                    <button className="skip-button" onClick={() => skip(bigSkipForward)}> {">>"} </button>
                    
                    <button className="full-screen-button" onClick={clickFullScreen}>
                        {fullScreen ? "> <" : "[ ]"}  
                    </button>
               
                </div>
            </div>

            <SpeedControls
                vidRef={vidRef}
            />

            <AdditionalControls
                vidRef={vidRef}
            />
            
        </div>
    );
    

}