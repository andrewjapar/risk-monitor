import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';

function handleSubmit(event) {
  alert('A name was submitted: ' + event);
  event.preventDefault();
}

function App() {
  const [entryPoint, setEntryPoint] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Risk Monitor</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="App-text-input">
            <TextField id="entry-point" onKeyUp={e => setEntryPoint(e.target.value)} fullWidth label="Entry Point" variant="filled" />
          </div>
          <div className="App-text-input">
            <TextField id="stop-loss" onKeyUp={e => setStopLoss(e.target.value)} fullWidth label="Stop Loss" variant="filled" />
          </div>
          <div className="App-text-input">
            <TextField id="take-profit" onKeyUp={e => setTakeProfit(e.target.value)} fullWidth label="Take Profit" variant="filled" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
