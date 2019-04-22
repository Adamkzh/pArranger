import React from "react";
import '../../style/admin/adminContent.css';

import DifferentPower from './charts/DifferentPower';
import DailyPowerGeneration from './charts/DailyPowerGeneration';
import SolarRadiance from './charts/SolarRadiance';
import ChargeCompare from './charts/ChargeCompare';
import NumberOfSolarPanels from './charts/NumberOfSolarPanels';

import "semantic-ui-css/semantic.min.css";
import '../../style/admin/chart.css';

import {
  Grid,
  Header,
  Menu,
} from "semantic-ui-react";

export default class adminContent extends React.Component{

    constructor(props){
      super(props);
      this.state={
       
      }
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
                <div>EYearly Renewable Electric Energy Generation</div>
                <DifferentPower />
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Top 3 Solar Power Generation City</div>
                <DailyPowerGeneration />
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Total Solar Panels</div>
                <NumberOfSolarPanels/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className='chartBox'>
                <div>Electricity Cost Comparison</div>
                <ChargeCompare />
              </Grid.Column>
              <Grid.Column className='chartBox'>
                <div>Live Radiation Data</div>
                <SolarRadiance />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
      </div>
      )
  }
}
