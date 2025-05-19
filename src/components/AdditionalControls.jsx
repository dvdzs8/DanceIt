import {useState} from 'react';

/*
loop: in button, timestamp of start - timestamp of end, out button
countdown options: start of video, start of loop, off
mirror: on or off
*/
export default function AdditionalControls({
    vidRef
}) {



    return (
        <div className="additional-controls-container">
            
            <div className="loop-container">
                <button className="loop-button">In</button>
                <span className="loop-text">{`{}`}</span>
                <button className="loop-button">Out</button>
            </div>

            <div className="countdown-container">
                
            </div>
        </div>
    );
}