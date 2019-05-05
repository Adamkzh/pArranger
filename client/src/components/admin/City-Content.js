import React from "react";

import NumberOfSolarPanelsHistorySingleCity from './singlecitycharts/NumberOfSolarPanelsHistorySingleCity';
import AvgElectricityMonthlyByCitySingleCity from './singlecitycharts/AvgElectricityMonthlyByCitySingleCity';
import AvgMoneySavedPerMonthByCitySingleCity from './singlecitycharts/AvgMoneySavedPerMonthByCitySingleCity';
import "semantic-ui-css/semantic.min.css";

import { Grid, Label, Header, Menu, Segment, Statistic } from "semantic-ui-react";
import axios from 'axios';
import DailyPowerGenerationSingleCity from "./singlecitycharts/DailyPowerGenerationSingleCity";
import {Link} from "react-router-dom";


export default class CityContent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            city: null,
            chargeCompare_data:null,
            dailyPowerGeneration_data:null,
            differentPower_data:null,
            numberOfSolarPanels_data:null,
            solarRadiance_data:null,
        };


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
            <div style={{marginLeft:'50px',marginRight:'50px'}}>
                <Grid>
                    <Grid.Column computer={2} only="tablet computer" id="sidebar" >
                        <Menu vertical borderless fluid text>
                            <Menu.Item header>Compete</Menu.Item>
                            <Menu.Item active as={Link} to='/console'> Overview </Menu.Item>
                            <Menu.Item as="a"> Overview (Per Capita) </Menu.Item>
                            <Menu.Item as="a"> Overview (Per Land Area) </Menu.Item>
                            <Menu.Item header>City</Menu.Item>
                            <Menu.Item as={Link} to='/console/sanjose'>San Jose</Menu.Item>
                            <Menu.Item as={Link} to='/console/sunnyvale'>Sunnyvale</Menu.Item>
                            <Menu.Item as={Link} to='/console/paloalto'>Palo Alto</Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column computer={14} floated="right" id="content" >

                        <Grid padded>
                            <Grid.Row> <Header dividing size="huge" as="h2"> {this.props.city.toUpperCase()} CITY OVERVIEW</Header> </Grid.Row>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalHHInstalled}</Statistic.Value>
                                            <Statistic.Label>Household Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='orange'>
                                            <Statistic.Value>{this.props.data.totalHHNotInstalled}</Statistic.Value>
                                            <Statistic.Label>Household not Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalElectricityGeneratedYTD}</Statistic.Value>
                                            <Statistic.Label>Electricity Generated YTD</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalMoneySavedYTD}</Statistic.Value>
                                            <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={5}>
                                    <Segment className="chart-container">
                                        <div>Total Solar Panel Capacity Trend</div>
                                        <NumberOfSolarPanelsHistorySingleCity data={this.props.data.numberOfSolarPanelsHistorySingleCity_data} city={this.props.city}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={5}>
                                    <Segment className="chart-container">
                                        <div>Electricity Generated Monthly Compare To AVG</div>
                                        <AvgElectricityMonthlyByCitySingleCity city={this.props.city} data={this.props.data.electricityGeneratedMonthlyCompareToCitiesAvgSingleCity}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={5}>
                                    <Segment className="chart-container">
                                        <div>Electricity Bill Savings Per HH Monthly Compare To AVG</div>
                                        <AvgMoneySavedPerMonthByCitySingleCity city={this.props.city} data={this.props.data.moneySavedMonthlyCompareToCitiesAvgSingleCity}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Segment className="chart-container">
                                        <div>Solar Power Generation Comparison In the Last Week</div>
                                        <DailyPowerGenerationSingleCity data={this.props.data.dailyPowerGenerationByCity} city={this.props.city}/>
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
