import {useState, useRef} from 'react';

export default function SpeedControlsContainer ( { vidRef }) {

    const [speed, setSpeed] = useState(1.0);
    const [speedInc, setSpeedInc] = useState(.05);
    const [speedDec, setSpeedDec] = useState(.05);

    const [speedPreset1, setSpeedPreset1] = useState(.25);
    const [speedPreset2, setSpeedPreset2] = useState(.5);
    const [speedPreset3, setSpeedPreset3] = useState(.75);
    const [speedPreset4, setSpeedPreset4] = useState(1);
    const [speedPreset5, setSpeedPreset5] = useState(1.25);

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
        <div className="speed-container">

            <span className="speed-text">{"Speed: " +speed}x</span>
            
            <button className="speed-inc-button" onClick={() => incSpeed(0, -speedDec)}> {"-"} </button>
            <input className="speed-inc-input" 
                defaultValue={speedDec} type="number" 
                step="0.05" min=".05" max="1"
                onChange={(e) => changeSpeedInc(e, false)}>
            </input>
            
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

            <div className="speed-presets">

                <div className="speed-preset">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset1, 0)}>A</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset1} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 1)}>
                    </input>
                </div>
                <div className="speed-preset">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset2, 0)}>B</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset2} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 2)}>
                    </input>
                </div>
                <div className="speed-preset">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset3, 0)}>C</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset3} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 3)}>
                    </input>
                </div>
                <div className="speed-preset">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset4, 0)}>D</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset4} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 4)}>
                    </input>
                </div>
                <div className="speed-preset">
                    <button className="speed-preset-button" onClick={() => incSpeed(speedPreset5, 0)}>E</button>
                    <input className="speed-preset-input" 
                    defaultValue={speedPreset5} type="number" 
                    step="0.05" min=".1" max="2"
                    onChange={(e) => changeSpeedPreset(e, 5)}>
                    </input>
                </div>
                
            </div>
                    
        </div>
    );
}