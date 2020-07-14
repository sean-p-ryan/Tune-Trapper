import React from 'react';
import Grid from '@material-ui/core/Grid';

const Recording = ({url }) => {
    return (
        <div className="recording-container">
            <audio style={{ marginBottom: '5px' }} src={url} controls='true'></audio>
        </div>
    );
}

export default Recording;
