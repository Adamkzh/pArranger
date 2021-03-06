import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Grid, Segment, Statistic, Modal, Button, Icon } from 'semantic-ui-react';
import Map from './map/map';

import SolarRadiance from './LineChart/SolarRadiance';

import './panel-detail-dashboard.css'
import ChargeCompare from './LineChart/ChargeCompare';
import PayBack from './PB/PayBack';
import Taxreturn from './Tax/TaxCredit'

const cardStyle = {
    'textAlign':'center',
    height: '90px',
    marginTop: '10px'
}
 
var currentDate = new Date();
var hour = currentDate.getHours() - 9;


var monthTotalEnergy = window.localStorage.getItem('watts') * 6 * 30 * 0.78 * 0.001;
monthTotalEnergy = monthTotalEnergy.toFixed(2) + " kWh";

var todayGenerate = window.localStorage.getItem('watts') * hour * 0.001;
todayGenerate = todayGenerate.toFixed(2) + ' kWh';

var todaySaving = window.localStorage.getItem('watts') * hour * 0.002 * 0.16;
todaySaving = "$ " + todaySaving.toFixed(2);

var monthBill =  window.localStorage.getItem('watts') * 6 * 30 * 0.78 * 0.001 * -0.16 + 101.49;
monthBill = "$ " + monthBill.toFixed(2);

var co2EmissionsDecliined = window.localStorage.getItem('watts') * 6 * 30 * 0.78 * 0.001 * 0.94 * 12;
co2EmissionsDecliined = co2EmissionsDecliined.toFixed(2) + " kg";

class PDDashboard extends Component{

constructor(props){
    super(props);
    this.state = {
        address: window.localStorage.getItem('address'),
        uuid: window.localStorage.getItem('uuid'),
        solarRadiance_data: null,
        modalOpen: false,
        apidata: null,
    }
}

handleOpen = () => this.setState({ modalOpen: true })

handleClose = () => this.setState({ modalOpen: false })

noDataErr = () => {
    window.localStorage.setItem('step', 0);
    window.location = '/design'
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

       // fetch current user data from server
    var id = this.props.match.params.id;
    if(id !== "admin"){  
        const getUserByIDUrl = '/api/v1/getUser?id=' + id;
        axios.get(getUserByIDUrl)
        .then((response) =>{
            const data = response.data.result;
            if (data) {
                this.setState({
                    uuid: data._id,
                    watts: data.watts,
                });
            } else {
                this.setState({
                    modalOpen: true
                })
                console.log(response.data.error);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        }); 
        }
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
                <Statistic color='teal'size='small'>
                    <Statistic.Label>Today Money Saved</Statistic.Label>
                    <Statistic.Value>{todaySaving}</Statistic.Value>
                </Statistic>
            </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='blue'size='small'>
                    <Statistic.Label>Today Power generated</Statistic.Label>
                    <Statistic.Value>{todayGenerate}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='purple'size='small'>
                    <Statistic.Label>monthly electricity bill</Statistic.Label>
                    <Statistic.Value>{monthBill}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='orange' size='tiny'>
                    <Statistic.Label>Generated Energy monthly</Statistic.Label>
                    <Statistic.Value>{monthTotalEnergy}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
                <Segment style={cardStyle}> 
                <Statistic color='olive' size='tiny'>
                    <Statistic.Label>co2 emissions reducted yearly</Statistic.Label>
                    <Statistic.Value>{co2EmissionsDecliined}</Statistic.Value>
                </Statistic>
                </Segment>
            </Grid.Column>
            </Grid.Row>

         {/* map */}
         <Grid.Row>
            <Grid.Column width={8}>
                <Segment  className="chart-container">
                <Statistic>
                    <Statistic.Label>Comparison of annual payment</Statistic.Label>
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
            <Grid.Row>
            <Grid.Column width={5}>
                <Segment className="chart-container">
                <Statistic>
                    <Statistic.Label>Solar Payback Period</Statistic.Label>
                </Statistic>
                <PayBack />
                </Segment>
            </Grid.Column>

            <Grid.Column width={5}>
                <Segment className="chart-container">
                <Statistic>
                    <Statistic.Label>Value of 30% federal tax credit</Statistic.Label>
                </Statistic>
                <Taxreturn />
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
            {this.state.modalOpen && 
            <div>
            <Modal
                open={this.state.modalOpen}
                onClose={this.noDataErr}
                basic
                size='small'
                style={{ left: '25%', top: '25%' }}
            >
                <Modal.Content>
                <h3>No data found! Please construct your panel first.</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.noDataErr} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
                </Modal.Actions>
            </Modal>
            </div>
            }
        </div>
        </div>
    );
}
}

export default PDDashboard;   