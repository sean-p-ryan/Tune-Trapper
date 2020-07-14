import React from 'react';
import Recorder from './Recorder';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (    
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      className="container">
        <AppBar className="app-bar">
          <Typography style={{textAlign: 'center'}} variant="h6"><div className="logo">TuneTrapper</div></Typography>
        </AppBar>
      {/* <img style={{width: '20%', height: '20%', marginTop: '5%'}} src={require('./images/microphone.png')}></img> */}
      < Recorder />
    </Grid>
  );
}

export default App;
