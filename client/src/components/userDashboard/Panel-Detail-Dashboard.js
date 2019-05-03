import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Image, Grid, Container, Segment, Button, Label, Modal, Icon } from 'semantic-ui-react';
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
            <Grid>
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
    );
}
}

export default PDDashboard;   