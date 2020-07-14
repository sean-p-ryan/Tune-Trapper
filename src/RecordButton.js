import React from 'react';
import Typography from '@material-ui/core/Typography';
import './App.js'

const RecordButton = ({ isRecording, startRecording, stopRecording }) => {
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: '300px', height: '300px', border: '5px solid #fff', position: 'relative'}} onClick={isRecording ? stopRecording : startRecording} className="record-button-container">
            <div className={isRecording ? "inner-shape-recording" : "inner-shape-not-recording"} style={{}}>
            </div>            
        </div>
        <Typography style={{ zIndex: '5', letterSpacing: '0.13rem', fontSize: '20px', marginBottom: '20px', color: '#fff' }}>TAP TO {isRecording ? `STOP` : `RECORD`}</Typography>
        </div>
    );
}

export default RecordButton;
