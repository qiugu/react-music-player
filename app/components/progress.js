import React from 'react';
import './progress.less';

class Progress extends React.Component {
    constructor() {
        super();
        this.changeProgress = this.changeProgress.bind(this);
        this.progressBar = ele => {
            this.refProgress = ele;
        }
    }

    changeProgress(e) {
        let progress = (e.clientX - this.refProgress.getBoundingClientRect().left) / this.refProgress.clientWidth;
        this.props.onChangeProgress && this.props.onChangeProgress(progress);
    }

    render() {
        return (
            <div className="components-progress" ref={this.progressBar} onClick={this.changeProgress}>
                <div className="progress" style={{background: this.props.barColor, width: `${this.props.progress}%`}}/>
            </div>
        )
    }
}

export default Progress;