import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Grid, Segment } from 'semantic-ui-react';
import AreaChartComponent from './AreachartComponent/AreaChartComponent';
import LineChartComponent from './LineChart/LineChartComponent';

import './panel-detail-dashboard.css'


class PDDashboard extends Component{

constructor(props){
    super(props);
    this.state = {
        address: window.localStorage.getItem('address'),
        uuid: window.localStorage.getItem('uuid'),
        username: " ",
        email: " ",
        watts: window.localStorage.getItem('watts'),
        mountType: window.localStorage.getItem('0mountType'),
        image:'',
        modalOpen: false,
        apidata: null,
    }
}



componentDidMount= ()=> {
    
}


render(){

    return(
        <div>
        <Header activeTag={"dashboard"}/>
        <div style={{marginLeft:'50px'}}>
            <h1>Dashboard</h1>
            <Grid>
            <Grid.Row>
            <Grid.Column width={4}>
                <Segment className="chart-container">
                ijoi
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment className="chart-container">
                ijoi
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment className="chart-container">
                ijoi
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment className="chart-container">
                ijoi
                </Segment>
            </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
            <Grid.Column width={8}>
                <Segment className="chart-container">
                <LineChartComponent />
                </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
                <Segment className="chart-container">
                <AreaChartComponent />
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