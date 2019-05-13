import React from "react";

import NumberOfSolarPanelsHistorySingleCity from './singlecitycharts/NumberOfSolarPanelsHistorySingleCity';
import AvgMoneySavedPerMonthByCitySingleCity from './singlecitycharts/AvgMoneySavedPerMonthByCitySingleCity';
import "semantic-ui-css/semantic.min.css";

import { Grid, Header, Segment, Statistic } from "semantic-ui-react";
import axios from 'axios';
import DailyPowerGenerationSingleCity from "./singlecitycharts/DailyPowerGenerationSingleCity";
import MonthlyPowerGenerationSingleCity from "./singlecitycharts/MonthlyPowerGenerationSingleCity";
import AdminMenu from "./Admin-Menu";


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
                        <AdminMenu selected={this.props.selected}/>
                    </Grid.Column>

                    <Grid.Column computer={14} floated="right" id="content" >

                        <Grid padded>
                            <Grid.Row> <Header dividing size="huge" as="h2"> {this.props.city.toUpperCase()} CITY OVERVIEW</Header> </Grid.Row>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalHHInstalled.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Household Installed #</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='orange'>
                                            <Statistic.Value>{this.props.data.totalHHNotInstalled.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Household not Installed #</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalElectricityGeneratedYTD.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Electricity Generated YTD (KWh)</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.props.data.totalMoneySavedYTD.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Total Money Saved YTD (USD)</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Total Solar Panel Capacity Comparison</div>
                                        <NumberOfSolarPanelsHistorySingleCity data={this.props.data.numberOfSolarPanelsHistorySingleCity_data} city={this.props.city}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Solar Panel Capacity Per HH Comparison</div>
                                        <NumberOfSolarPanelsHistorySingleCity data={this.props.data.numberOfSolarPanelsPerHHSingleCity} city={this.props.city}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Total Electricity Generated Monthly Trend</div>
                                        <MonthlyPowerGenerationSingleCity city={this.props.city} data={this.props.data.electricityGeneratedMonthlyCompareToCitiesAvgSingleCity}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Total Electricity Generated Per HH Monthly Trend</div>
                                        <MonthlyPowerGenerationSingleCity city={this.props.city} data={this.props.data.totalElectricityGeneratedPerHHMonthly}/>
                                    </Segment>
                                </Grid.Column>


                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Monthly Electricity Bill Savings Comparison</div>
                                        <AvgMoneySavedPerMonthByCitySingleCity city={this.props.city} data={this.props.data.moneySavedMonthlyCompareToCitiesAvgSingleCity}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={8}>
                                    <Segment className="chart-container">
                                        <div>Daily Electricity Generation Trend 6 Days</div>
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
