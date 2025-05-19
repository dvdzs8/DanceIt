import React from 'react';
import { useState, useRef } from 'react';

export default function VideoControlsContainer({ 
    vidRef, clickPlay, playing, clickFullScreen,
    fullScreen, formatTime, curTime, vidDuration,
}) {

    const [speed, setSpeed] = useState(1.0);

    const [bigSkipBack, setBigSkipBack] = useState(10.0);
    const [skipBack, setSkipBack] = useState(1.0);
    const [skipForward, setSkipForward] = useState(1.0);
    const [bigSkipForward, setBigSkipForward] = useState(10.0);

    const [speedInc, setSpeedInc] = useState(.05);
    const [speedDec, setSpeedDec] = useState(.05);

    const [speedPreset1, setSpeedPreset1] = useState(.25);
    const [speedPreset2, setSpeedPreset2] = useState(.5);
    const [speedPreset3, setSpeedPreset3] = useState(.75);
    const [speedPreset4, setSpeedPreset4] = useState(1);
    const [speedPreset5, setSpeedPreset5] = useState(1.25);

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
        if (newRate > 2) {
            newRate = 2;
        } else if (newRate < .1){
            newRate = .1;
        } 
        
        vidRef.current.playbackRate = newRate;
        setSpeed(newRate);

        }

    }

    function changeSpeedInc(e, isIncButton) {
        console.print("test" + e.target.value);
        const value = parseFloat(e.target.value);
        if (!value) {
        return;
        }

        if (isIncButton) {
        setSpeedInc(value ? value : speedInc);
        } else {
        setSpeedDec(value ? value: speedDec);
        }
    }

    function changeSpeedPreset(e, presetNum) {
        const value = parseFloat(e.target.value);

        if (presetNum === 1) {
        setSpeedPreset1(value);
        }
    }

    return (
        <div className="video-controls-container">
            
            <div className="primary-controls">
                <div className="timeline-container">
                    <span>{`${formatTime(curTime)} / ${formatTime(vidDuration)}`}</span>
                </div>

                <div className="first-line-controls">

                    <div className="volume-container">
                        <button className="mute-button" onClick={clickMute}>Vol/Mute</button>
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
                        {fullScreen ? "Exit" : "Full Screen"}  
                    </button>
               
                </div>

                <div className="speed-container">

                <input className="speed-inc-input" 
                    defaultValue={speedDec} type="number" 
                    step="0.05" min=".05" max="1"
                    onChange={(e) => changeSpeedInc(e, false)}>
                </input>
                <button className="speed-inc-button" onClick={() => incSpeed(0, -speedDec)}> {"-"} </button>
                
                <span className="speed-text">{speed}x</span>
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

                <button className="speed-inc-button" onClick={() => incSpeed(0, speedInc)}> {"+"} </button>
                <input className="speed-inc-input" 
                    defaultValue={speedInc} type="number" 
                    step="0.05" min=".05" max="1"
                    onChange={(e) => changeSpeedInc(e, true)}>
                </input>

                <div className="speed-presets">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset1, 0)}>A</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset1} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 1)}>
                    </input>
                    
                </div>
                
                </div>
            
            </div>

        </div>
    );
    

}