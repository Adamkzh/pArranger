import React from "react";

import DifferentPower from './charts/DifferentPower';
import DailyPowerGeneration from './charts/DailyPowerGeneration';
import SolarRadiance from './charts/SolarRadiance';
import ChargeCompare from './charts/ChargeCompare';
import NumberOfSolarPanels from './charts/NumberOfSolarPanels';

import "semantic-ui-css/semantic.min.css";
import '../../style/admin/adminContent.css';
import '../../style/admin/chart.css';

import {
  Grid,
  Header,
  Menu,
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
        <div >
        <Grid >
        <Grid.Column
          computer={2}
          only="tablet computer"
          id="sidebar"
        >
          <Menu vertical borderless fluid text>
            <Menu.Item active as="a"> Overview </Menu.Item>
            <Menu.Item as="a">Reports</Menu.Item>
            <Menu.Item as="a">Analytics</Menu.Item>
            <Menu.Item as="a">Export</Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column
          computer={14}
          floated="right"
          id="content"
        >
          <Grid padded>
            <Grid.Row>
              <Header dividing size="huge" as="h1">
                Dashboard
              </Header>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column className='chartBox'>
                <div>Yearly Renewable Electric Energy Generation</div>
                <DifferentPower data={this.state.differentPower_data}/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Top Solar Power Generation City</div>
                <DailyPowerGeneration data={this.state.dailyPowerGeneration_data}/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Total Solar Panels</div>
                <NumberOfSolarPanels data={this.state.numberOfSolarPanels_data}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className='chartBox'>
                <div>Electricity Cost Comparison</div>
                <ChargeCompare data={this.state.chargeCompare_data}/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Live Radiation Data</div>
                <SolarRadiance data = {this.state.solarRadiance_data}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
      </div>
      )
  }
}
