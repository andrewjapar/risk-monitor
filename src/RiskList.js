import React from 'react';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

import './App.css';

class RiskList extends React.Component {

    printHeader(items) {
        if (items.length > 0) {
            return <h3>Risk to Porto</h3>
        }
    }

    render() {
        let namesList = this.props.risks.map(risk => (
            <Grid item xs={4} sm={3}>
                <div className="App-risklist-item">
                    <div className="App-risklist-percentage">
                    <NumberFormat value={risk.risk} displayType={'text'} decimalScale={"3"} thousandSeparator={true} renderText={ value => `${value}%`}/>
                    <br/>Porto {risk.percentage}%
                    </div>
                </div>
            </Grid>       
        ))

        return <div className="App-risklist-container">
                { this.printHeader(this.props.risks) }
                <Grid container>
                    { namesList }
                </Grid>
            </div>;
    }
}

export default RiskList;