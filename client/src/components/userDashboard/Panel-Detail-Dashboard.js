import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import Map from './map/map';

import SolarRadiance from './LineChart/SolarRadiance';



import './panel-detail-dashboard.css'
import ChargeCompare from './LineChart/ChargeCompare';

const cardStyle = {
    'textAlign':'center',
    height: '90px',
    marginTop: '10px'
}
 

class PDDashboard extends Component{

constructor(props){
    super(props);
    this.state = {
        address: window.localStorage.getItem('address'),
        solarRadiance_data: null,
    }
}



componentDidMount= ()=> {
    const fetchDataUrl = "/api/v1/charting/dashboardData";
      axios.get(fetchDataUrl)
      .then((response) =>{
          if (response.data.success) {
              this.setState({
                chargeCompare_data :response.data.result.chargeCompare,
                dailyPowerGeneration_data : response.data.result.dailyPowerGeneration,
                differentPower_data : response.data.result.differentPower,
                numberOfSolarPanels_data : response.data.result.numberOfSolarPanels,
                solarRadiance_data : response.data.result.solarRadiance,
              })
            }
      })
      .catch(function (error) {
          console.log(error);
      })
}

// | 'red'
// | 'orange'
// | 'yellow'
// | 'olive'
// | 'green'
// | 'teal'
// | 'blue'
// | 'violet'
// | 'purple'
// | 'pink'
// | 'brown'
// | 'grey'
// | 'black'

render(){

    return(
        <div>
        <Header activeTag={"dashboard"}/>
        <div style={{marginLeft:'50px'}}>
            <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
            <Segment style={cardStyle}>
                <Statistic color='olive'size='small'>
                    <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                    <Statistic.Value>{2000}</Statistic.Value>
                </Statistic>
            </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='olive'size='small'>
                    <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                    <Statistic.Value>{2000}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='olive'size='small'>
                    <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                    <Statistic.Value>{2000}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='olive' size='small'>
                    <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                    <Statistic.Value>{2000}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='olive' size='small'>
                    <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                    <Statistic.Value>{2000}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            </Grid.Row>

         {/* map */}
         <Grid.Row>
            <Grid.Column width={8}>
                <Segment  className="chart-container">
                <Statistic>
                    <Statistic.Label>Money Saved</Statistic.Label>
                </Statistic>
                <ChargeCompare data = {this.state.chargeCompare_data}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
                <Segment className="chart-container">
                <Map />
                </Segment>
            </Grid.Column>
            </Grid.Row>
            
            {/* chart */}
            <div></div>
            <Grid.Row>
            <Grid.Column width={5}>
                <Segment className="chart-container">
                <Statistic>
                    <Statistic.Label>Power Output</Statistic.Label>
                </Statistic>
                <SolarRadiance data = {this.state.solarRadiance_data}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
                <Segment className="chart-container">
                <Statistic>
                    <Statistic.Label>Live Radiation Data</Statistic.Label>
                </Statistic>
                <SolarRadiance data = {this.state.solarRadiance_data}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
                <Segment className="chart-container">
                <Statistic>
                    <Statistic.Label>Live Radiation Data</Statistic.Label>
                </Statistic>
                <SolarRadiance data = {this.state.solarRadiance_data}/>
                </Segment>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </div>
        </div>
    );
}
}

export default PDDashboard;   