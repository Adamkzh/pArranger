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
import CitiesCompareBarChart from './charts/CitiesCompareBarChart'
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
        let totalCapacityOfSolarPanels = [{
                "label": "San Jose",
                "value": 1800
            },
            {
                "label": "Palo Alto",
                "value": 3600
            },
            {
                "label": "Sunnyvale",
                "value": 3400
            }];
        return (<div style={{ marginLeft: '50px', marginRight: '50px' }}>
                <Grid>
                    <Grid.Column computer={2} only="tablet computer" id="sidebar">
                        <AdminMenu selected={this.props.selected}/>
                    </Grid.Column>

                    <Grid.Column computer={14} floated="right" id="content">
                        <Grid padded>
                            <Grid.Row> <Header dividing size="huge" as="h1">Summary</Header> </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Total Solar Capacity</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="kW"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity per Capita</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="kw/person"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity per Surface Area</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="kW/mi²"/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity Added (last 30 days)</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="kW"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Actual Electricity Generated by Solar (last 30 days)</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="kW/H"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Number of Solar Household Added (last 30 days)</div>
                                        <CitiesCompareBarChart data={totalCapacityOfSolarPanels} unit="Household"/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Growth of Total Solar Capacity</div>
                                        <ChargeCompare data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Installation Incentives (Rebates and Tax Credits)</div>
                                        <ChargeCompare data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Daily Electricity Generated by Solar Panel (Last Month) - FIX DATA</div>
                                        <ChargeCompare data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Daily Transformer Load (Last Month) - FIX DATA</div>
                                        <ChargeCompare data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalHHInstalled}</Statistic.Value>
                                            <Statistic.Label>Household Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='orange'>
                                            <Statistic.Value>{this.state.totalHHNotInstalled}</Statistic.Value>
                                            <Statistic.Label>Household not Installed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalElectricityGeneratedYTD}</Statistic.Value>
                                            <Statistic.Label>Electricity Generated YTD</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Statistic color='olive'>
                                            <Statistic.Value>{this.state.totalMoneySavedYTD}</Statistic.Value>
                                            <Statistic.Label>Total Money Saved YTD</Statistic.Label>
                                        </Statistic>
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
