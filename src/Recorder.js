import React, { useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function WebAudioTest() {
    const stream = useRef(null);
    const mediaRecorder = useRef(null);;
    let blob;
    let audioURL;
    let newRecording;
    let chunks = [];

    const [accessStatus, updateAccessStatus] = useState('false');
    const [recordings, updateRecordings] = useState([]);
    const [isRecording, toggleRecording] = useState(false);

    useEffect(() => {
        // check for access to user's microphone            
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(response => {
                if (response.active) { updateAccessStatus('true') };
                stream.current = response;
                console.log(stream.current)
            })
            .catch(err => console.log(err))
    }, []);

    const startRecording = () => {
        toggleRecording(!isRecording)
        mediaRecorder.current = new MediaRecorder(stream.current);
        mediaRecorder.current.ondataavailable = function (e) {
            chunks.push(e.data)
        }
        mediaRecorder.current.onstop = function (e) {
            blob = new Blob(chunks, { type: 'audio/mpeg-3' });
            audioURL = window.URL.createObjectURL(blob);
            newRecording = { url: audioURL };
            chunks = [];
            updateRecordings([...recordings, newRecording])
        }
        mediaRecorder.current.start();
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        toggleRecording(!isRecording)
        // toggleRecording(!isRecording)   
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <img style={{ cursor: 'pointer', marginTop: '10px' }} onClick={isRecording ? stopRecording : startRecording} src={isRecording ? require('./images/stop_icon.png') : require('./images/record_icon.png')}></img>
            <Typography style={{margin: '1rem'}}>{isRecording ? `Press to stop recording ` : `Press to start recording`}</Typography>
            {recordings.map(recording =>
                <audio style={{ marginBottom: '5px' }} src={recording.url} controls='true'></audio>
            )}
        </Grid>
    )
}

