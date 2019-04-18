import React from "react";
import '../../style/admin/adminContent.css';

import StackedBarChar from './charts/StackedBarChar';
import DailyPowerGeneration from './charts/DailyPowerGeneration';

import "semantic-ui-css/semantic.min.css";
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
            <Menu.Item active as="a">
              Overview
            </Menu.Item>
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
            <Grid.Row columns={4}>
              <Grid.Column >
                <StackedBarChar />
              </Grid.Column>
              <Grid.Column >
                <DailyPowerGeneration />
              </Grid.Column>
              <Grid.Column >
                <DailyPowerGeneration />
              </Grid.Column>
              <Grid.Column >
                <DailyPowerGeneration />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
      </div>
      )
  }
}
