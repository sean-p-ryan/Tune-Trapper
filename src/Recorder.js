import React, { useState, useEffect, useRef } from 'react';
import Recording from './Recording';
import RecordButton from './RecordButton';
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
            <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} className="record-button" />          
            {recordings.map(recording =>
                <Recording url={recording.url} />
            )}
        </Grid>
    )
}

