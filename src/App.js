import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import RiskList from './RiskList';
import RiskPorto from './RiskPorto';

import './App.css';

function calculateRiskReward(entryPoint, stopLoss, takeProfit) {
  let risk = entryPoint - stopLoss
  let reward = takeProfit - entryPoint

  let potentialRisk = risk/risk
  let potentialReward = reward/risk

  let ratio
  if (potentialReward > 2) ratio = "GOOD RATIO"
  else ratio = "BAD RATIO"

  if (potentialReward > 0 & potentialRisk > 0) return `${potentialRisk} : ${potentialReward}  ${ratio}`
  else return "Invalid Input"
}

function calculateRiskList(entryPoint, stopLoss) {
  let percentageLoss = calculatePercentageLoss(entryPoint, stopLoss)

  let cols = [];
  for (let i =10; i <= 100; i+=5) {
    let percentagePorto = i
    let riskToPorto = (percentageLoss / 100) * percentagePorto

    if (riskToPorto <= 2) {
      cols.push(new RiskPorto(percentagePorto, riskToPorto))
    }
  }
  return cols.reverse();
}

function calculatePercentageLoss(entryPoint, stopLoss) {
  return ((entryPoint - stopLoss) / entryPoint) * 100
}

function writePercentageLoss(entryPoint, stopLoss) {
  let result = calculatePercentageLoss(entryPoint, stopLoss)
  if (result > 0) return <NumberFormat value={result} displayType={'text'} decimalScale={"3"} thousandSeparator={true} renderText={ value => `${value}%`}/>
  else return "Invalid Input"
}

function App() {
  const [entryPoint, setEntryPoint] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Risk Calculator</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12}>
          <div className="App-text-input">
            <TextField id="entry-point" onKeyUp={e => setEntryPoint(e.target.value)} type="number" fullWidth label="Entry Point" variant="filled" />
          </div>
          <div className="App-text-input">
            <TextField id="stop-loss" onKeyUp={e => setStopLoss(e.target.value)} type="number" fullWidth label="Stop Loss" variant="filled" />
          </div>
          <div className="App-text-input">
            <TextField id="take-profit" onKeyUp={e => setTakeProfit(e.target.value)} type="number" fullWidth label="Take Profit" variant="filled" />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="App-reward">Risk Reward: {calculateRiskReward(entryPoint, stopLoss, takeProfit)}</div>
          <div className="App-loss">Percentage Loss: {writePercentageLoss(entryPoint, stopLoss)}</div>
        </Grid>
        <RiskList risks={calculateRiskList(entryPoint, stopLoss)} />
      </Grid>
    </div>
  );
}

export default App;
