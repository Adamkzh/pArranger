import React from "react";

import AdminMenu from './Admin-Menu';
import CitiesCompareBarChart from './charts/CitiesCompareBarChart'
import CitiesLineChart from './charts/CitiesLineChart'

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
            totalSolarCapacity: null,
            solarCapacityPerCapita: null,
            solarCapacityPerSurfaceArea: null,
            solarCapacityAddedIn30Days: null
        }
        const fetchDataUrl = "/api/v1/charting/summaryDashboardData";
        axios.get(fetchDataUrl)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        totalSolarCapacity: response.data.result.totalSolarCapacity,
                        solarCapacityPerCapita: response.data.result.solarCapacityPerCapita,
                        solarCapacityPerSurfaceArea: response.data.result.solarCapacityPerSurfaceArea,
                        solarCapacityAddedIn30Days: response.data.result.solarCapacityAddedIn30Days
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let totalCapacityOfSolarPanels = [
            {
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
        let growthTotalCapacity = [{
            "label": "Nov 2018",
            "San Jose": "200",
            "Palo Alto": "300",
            "Sunnyvale": "400"
        },{
            "label": "Dec 2018",
            "San Jose": "100",
            "Palo Alto": "250",
            "Sunnyvale": "250"
        },{
            "label": "Jan 2019",
            "San Jose": "900",
            "Palo Alto": "950",
            "Sunnyvale": "850"
        },{
            "label": "Feb 2019",
            "San Jose": "600",
            "Palo Alto": "400",
            "Sunnyvale": "500"
        },{
            "label": "Mar 2019",
            "San Jose": "300",
            "Palo Alto": "400",
            "Sunnyvale": "350"
        },{
            "label": "Apr 2019",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        }];
        let newInstallationIncentivesVsCost = [{
            "label": "Nov 2018",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100",
            "Average Installation Cost": "3000"
        },{
            "label": "Dec 2018",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100",
            "Average Installation Cost": "2990"
        },{
            "label": "Jan 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Installation Cost": "2800"
        },{
            "label": "Feb 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Installation Cost": "2800"
        },{
            "label": "Mar 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Installation Cost": "2800"
        },{
            "label": "Apr 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Installation Cost": "2750"
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
                                        <CitiesCompareBarChart data={this.state.totalSolarCapacity} unit="kW"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity per Capita</div>
                                        <CitiesCompareBarChart data={this.state.solarCapacityPerCapita} unit="kW/person"/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity per Surface Area</div>
                                        <CitiesCompareBarChart data={this.state.solarCapacityPerSurfaceArea} unit="kW/mi²"/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Capacity Added (last 30 days)</div>
                                        <CitiesCompareBarChart data={this.state.solarCapacityAddedIn30Days} unit="kW"/>
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
                                        <div>Growth of Solar Capacity</div>
                                        <CitiesLineChart data={growthTotalCapacity} unit='kW'/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Rebate Incentives vs Average Installation Cost</div>
                                        <CitiesLineChart data={newInstallationIncentivesVsCost} unit='kW/USD' showLabels={true} extraLineKey='Average Installation Cost'/>
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
