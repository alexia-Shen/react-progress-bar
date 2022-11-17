import React from 'react';
import { ProgressBarItem } from '../models/ProgressBar.model';
import './ProgressBar.scss';

function ProgressBarComponent(pros: { progressBar: ProgressBarItem }) {
    const { progressBar }: { progressBar: ProgressBarItem } = pros;

    // Generate progress bar styles based on progressBar object
    const barClass = progressBar.progress > 100 ? 'bar danger' : 'bar normal';
    const barStyle = {
        width : progressBar.progress + '%'
    };
    return (
        <div className='progress-bar'>
            <div className='label'>
                {progressBar.progress}%
            </div>
            <div
                id = 'bar'
                className={barClass}
                style={barStyle}
            ></div>
        </div>
    );
}
export default ProgressBarComponent;
