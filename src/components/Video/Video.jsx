import React, {useRef} from 'react';
import {useInView} from 'react-intersection-observer';

const Video = () => {
    const videoRef = useRef(null);
    const {ref, inView} = useInView({threshold: 0.5});

    React.useEffect(() => {
        if (videoRef.current) {
            if (inView) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [inView]);

    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <div ref={ref} className="flex justify-center items-center h-screen w-full">
            <video
                ref={videoRef}
                src="/workVideo.mp4"
                className="w-full h-[80vh] object-cover"
                muted
                playsInline
                onEnded={handleVideoEnd}
            />
        </div>
    );
};

export default Video;
