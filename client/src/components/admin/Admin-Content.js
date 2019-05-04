import React from "react";

import DifferentPower from './charts/DifferentPower';
import DailyPowerGeneration from './charts/DailyPowerGeneration';
import SolarRadiance from './charts/SolarRadiance';
import ChargeCompare from './charts/ChargeCompare';
import NumberOfSolarPanels from './charts/NumberOfSolarPanels';
import HHCountByCity from './charts/HHCountByCity';
import AvgElectricityPerDayByCity from './charts/AvgElectricityPerDayByCity';
import AvgMoneySavedPerMonthByCity from './charts/AvgMoneySavedPerMonthByCity';
import NumberOfSolarPanelsByCity from './charts/NumberOfSolarPanelsByCity';

import "semantic-ui-css/semantic.min.css";
import '../../style/admin/adminContent.css';
import '../../style/admin/chart.css';

import {
  Grid,
  Header, Label,
  Menu, Segment,
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

        totalHHInstalled: 4000,
        totalHHNotInstalled: 2000,
        totalElectricityGeneratedYTD: 80000,
        totalMoneySavedYTD: 800000
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
                <div>Yearly Electric Generation By Renewable Energy(US)</div>
                <DifferentPower data={this.state.differentPower_data}/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Top Solar Power Generation City</div>
                <DailyPowerGeneration data={this.state.dailyPowerGeneration_data}/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Total Solar Panels By City</div>
                <NumberOfSolarPanels data={this.state.numberOfSolarPanels_data}/>
                {/*<NumberOfSolarPanelsByCity/>*/}
              </Grid.Column>
            </Grid.Row>
            {/*<Grid.Row columns={2}>*/}
              {/*<Grid.Column className='chartBox'>*/}
                {/*<div>Average Electricity Cost Comparison Monthly</div>*/}
                {/*<ChargeCompare data={this.state.chargeCompare_data}/>*/}
              {/*</Grid.Column>*/}
              {/*<Grid.Column className='chartBox'>*/}
                {/*<div>Live Radiation Data</div>*/}
                {/*<SolarRadiance data = {this.state.solarRadiance_data}/>*/}
              {/*</Grid.Column>*/}
            {/*</Grid.Row>*/}
            <Grid.Row columns={4}>
              <Grid.Column className='chartBox'>
                <div> Num of Household Installed Panels by City </div>
                <HHCountByCity />
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Total Solar Panels Installed By City(KW)</div>
                <NumberOfSolarPanelsByCity/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Average Electricity Generated Per Month By City</div>
                <AvgElectricityPerDayByCity/>
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Avg Money Saved Per HH Per Month By City</div>
                <AvgMoneySavedPerMonthByCity/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={4}>
              <Grid.Column>
                <Segment raised>
                  <Label attached='top'>Household Installed</Label>
                  <p>
                    {this.state.totalHHInstalled}
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Label attached='top'>Household not Installed</Label>
                  <p>
                    {this.state.totalHHNotInstalled}
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Label attached='top'>Electricity Generated YTD</Label>
                  <p>
                    {this.state.totalElectricityGeneratedYTD} KWh
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Label attached='top'>Total Money Saved YTD</Label>
                  <p>
                    $ {this.state.totalMoneySavedYTD}
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
      </div>
      )
  }
}
