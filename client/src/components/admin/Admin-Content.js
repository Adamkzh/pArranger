import React from "react";

import DifferentPower from './charts/DifferentPower';
import DailyPowerGeneration from './charts/DailyPowerGeneration';
import SolarRadiance from './charts/SolarRadiance';
import ChargeCompare from './charts/ChargeCompare';
import NumberOfSolarPanels from './charts/NumberOfSolarPanels';

import "semantic-ui-css/semantic.min.css";

import {
  Grid,
  Header,
  Menu,
  Segment
} from "semantic-ui-react";
import axios from 'axios';


export default class adminContent extends React.Component{

    constructor(props){
      super(props);
      this.state={
        chargeCompare_data:null,
        dailyPowerGeneration_data:null,
        differentPower_data:null,
        numberOfSolarPanels_data:null,
        solarRadiance_data:null,
      }
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

  render() {
      return(
        <div style={{marginLeft:'50px'}}>
        <h1>Dashboard</h1>
        <Grid >
        <Grid.Row>
          <Grid.Column width={5}>
              <Segment className="chart-container">
              <div>Yearly Renewable Electric Energy Generation</div>
              <DifferentPower data={this.state.differentPower_data}/>
              </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
              <Segment className="chart-container">
              <div>Top Solar Power Generation City</div>
              <DailyPowerGeneration data={this.state.dailyPowerGeneration_data}/>
              </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
              <Segment className="chart-container">
              <div>Total Solar Panels</div>
              <NumberOfSolarPanels data={this.state.numberOfSolarPanels_data}/>
              </Segment>
          </Grid.Column>
        </Grid.Row>
         <Grid.Row>
         <Grid.Column width={7}>
             <Segment className="chart-container">
             <div>Electricity Cost Comparison</div>
             <ChargeCompare data={this.state.chargeCompare_data}/>
             </Segment>
         </Grid.Column>
         <Grid.Column width={7}>
             <Segment className="chart-container">
             <div>Live Radiation Data</div>
             <SolarRadiance data = {this.state.solarRadiance_data}/>
             </Segment>
         </Grid.Column>
       </Grid.Row>
      </Grid>
      </div>
      )
  }
}
