import React from "react";

import CitiesLineChart from './charts/CitiesLineChart'
import AdminMenu from './Admin-Menu';

import "semantic-ui-css/semantic.min.css";

import {
    Grid,
    Header,
    Segment,
} from "semantic-ui-react";
import axios from 'axios';
import CitiesCompareStackedBarChart from "./charts/CitiesCompareStackedBarChart";


export default class effectAndImpactContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            growthOfSolarCapacity: null,
            solarIncentiveSpending: null,
            solarEnergyConversionRate: null,
            solarElectricityGeneratedHourly: null,
            hourlyAllElectricLoad: null,
            averageBillSavings: null
        }
        const fetchDataUrl = "/api/v1/charting/getEffectAndImpactChartingData";
        axios.get(fetchDataUrl)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        growthOfSolarCapacity: response.data.result.growthOfSolarCapacity,
                        solarIncentiveSpending: response.data.result.solarIncentiveSpending,
                        solarEnergyConversionRate: response.data.result.solarEnergyConversionRate,
                        solarElectricityGeneratedHourly: response.data.result.solarElectricityGeneratedHourly,
                        hourlyAllElectricLoad: response.data.result.hourlyAllElectricLoad,
                        averageBillSavings: response.data.result.averageBillSavings
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (<div style={{ marginLeft: '50px', marginRight: '50px' }}>
                <Grid>
                    <Grid.Column computer={2} only="tablet computer" id="sidebar">
                        <AdminMenu selected={this.props.selected}/>
                    </Grid.Column>

                    <Grid.Column computer={14} floated="right" id="content">
                        <Grid padded>
                            <Grid.Row> <Header dividing size="huge" as="h1">Effect and Impact</Header> </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Growth of Solar Capacity</div>
                                        <CitiesLineChart data={this.state.growthOfSolarCapacity} unit='%'/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Incentive Budget & Spending (FY2019)</div>
                                        <CitiesCompareStackedBarChart data={this.state.solarIncentiveSpending} unit='1000 USD'/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Electricity Generated Hourly (Month Average - Last 30 Days)</div>
                                        <CitiesLineChart data={this.state.solarElectricityGeneratedHourly} unit='kW' dots={false}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Hourly All Electric Load (Month Average - Last 30 Days)</div>
                                        <CitiesLineChart data={this.state.hourlyAllElectricLoad} unit='kW' dots={false}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Daytime Solar Energy Maximum Conversion Rate (Last 30 Days)</div>
                                        <CitiesLineChart data={this.state.solarEnergyConversionRate} unit='%' dots={false}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Electricity Bill Savings per Solar Household</div>
                                        <CitiesLineChart data={this.state.averageBillSavings} unit='USD'/>
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
