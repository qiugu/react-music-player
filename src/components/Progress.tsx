import React, { useRef } from 'react';
import './progress.css';

interface IProgress {
    barColor: string;
    progress: number;
    onChangeProgress: (progress: number) => void;
}

function Progress (props: IProgress) {
    const progressBar = useRef<HTMLDivElement>(null);
    
    const changeProgress = (e) => {
        const node = progressBar.current;
        if (node === null) return;
        const progress = (e.clientX - node.getBoundingClientRect().left) / node.clientWidth;
        props.onChangeProgress && props.onChangeProgress(progress);
    };

    return (
        <div className="components-progress" ref={progressBar} onClick={changeProgress}>
            <div className="progress" style={{background: props.barColor, width: `${props.progress}%`}}/>
        </div>
    );
}

export default Progress;
