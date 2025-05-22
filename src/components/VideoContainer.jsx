import React from 'react';

export default function VideoContainer({ 
    vidContainerRef, vid, vidRef, clickPlay,
    setCurTime, setVidDuration, looping
}) {

        return (
            <div className="video-container" ref={vidContainerRef}>
            
                <video 
                src={vid} 
                ref={vidRef} 
                onClick={clickPlay} 
                onEnded={looping ? null : clickPlay}
                onTimeUpdate={(e) => setCurTime(e.target.currentTime)}
                onLoadedMetadata={(e) => setVidDuration(e.target.duration)}
                />
        
            </div>
        );
        

}