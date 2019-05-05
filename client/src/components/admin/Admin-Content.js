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
import AdminMenu from './Admin-Menu';
import {Link} from 'react-router-dom';

import "semantic-ui-css/semantic.min.css";

import {
    Grid,
    Label,
    Header,
    Menu,
    Segment,
    Statistic
} from "semantic-ui-react";
import axios from 'axios';


export default class adminContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chargeCompare_data: null,
            dailyPowerGeneration_data: null,
            differentPower_data: null,
            numberOfSolarPanels_data: null,
            solarRadiance_data: null,

            totalHHInstalled: 4000,
            totalHHNotInstalled: 2000,
            totalElectricityGeneratedYTD: 80000,
            totalMoneySavedYTD: 800000
        }
        const fetchDataUrl = "/api/v1/charting/dashboardData";
        axios.get(fetchDataUrl)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        chargeCompare_data: response.data.result.chargeCompare,
                        dailyPowerGeneration_data: response.data.result.dailyPowerGeneration,
                        differentPower_data: response.data.result.differentPower,
                        numberOfSolarPanels_data: response.data.result.numberOfSolarPanels,
                        solarRadiance_data: response.data.result.solarRadiance,
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let headerText;
        if (this.props.selected === 'overview') {
            headerText = "Overview";
        } else if (this.props.selected === 'overviewPerCapita') {
            headerText = "Overview (Per Capita)";
        } else if (this.props.selected === 'overviewPerLandArea') {
            headerText = "Overview (Per Land Area)";
        } else {
            headerText = "";
        }
        return (<div style={{ marginLeft: '50px', marginRight: '50px' }}>
                <Grid>
                    <Grid.Column computer={2} only="tablet computer" id="sidebar">
                        <AdminMenu selected={this.props.selected}/>
                    </Grid.Column>

                    <Grid.Column computer={14} floated="right" id="content">
                        <Grid padded>
                            <Grid.Row> <Header dividing size="huge" as="h1">{headerText}</Header> </Grid.Row>

                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalHHInstalled.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Household Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='orange'>
                                            <Statistic.Value>{this.state.totalHHNotInstalled.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Household not Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalElectricityGeneratedYTD.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Electricity Generated YTD</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalMoneySavedYTD.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={4}>
                                {/*<Grid.Column>*/}
                                    {/*<Segment className="chart-container">*/}
                                        {/*<div>Yearly Renewable Electric Energy Generation(US)</div>*/}
                                        {/*<DifferentPower data={this.state.differentPower_data}/>*/}
                                    {/*</Segment>*/}
                                {/*</Grid.Column>*/}
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div> Total Household By City</div>
                                        <HHCountByCity/>
                                    </Segment>
                                </Grid.Column>

                                {/*<Grid.Column>*/}
                                    {/*<Segment className="chart-container">*/}
                                        {/*<div>Total Solar Panel Capacity By City</div>*/}
                                        {/*<NumberOfSolarPanels data={this.state.numberOfSolarPanels_data}/>*/}
                                    {/*</Segment>*/}
                                {/*</Grid.Column>*/}

                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Total Solar Panel Capacity By City(KW)</div>
                                        <NumberOfSolarPanelsByCity/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Total Electricity Generated Per Month</div>
                                        <AvgElectricityPerDayByCity/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Total Money Saved Per Month By City</div>
                                        <AvgMoneySavedPerMonthByCity/>
                                    </Segment>
                                </Grid.Column>

                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Electricity Cost Comparison</div>
                                        <ChargeCompare data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Top Solar Power Generation City</div>
                                        <DailyPowerGeneration data={this.state.dailyPowerGeneration_data}/>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Live Radiation Data</div>
                                        <SolarRadiance data={this.state.solarRadiance_data}/>
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
