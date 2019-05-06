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


export default class effectAndImpactContent extends React.Component {

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
        let growthTotalCapacity = [{
            "month": "Nov 2018",
            "San Jose": "200",
            "Palo Alto": "300",
            "Sunnyvale": "400"
        },{
            "month": "Dec 2018",
            "San Jose": "100",
            "Palo Alto": "250",
            "Sunnyvale": "250"
        },{
            "month": "Jan 2019",
            "San Jose": "900",
            "Palo Alto": "950",
            "Sunnyvale": "850"
        },{
            "month": "Feb 2019",
            "San Jose": "600",
            "Palo Alto": "400",
            "Sunnyvale": "500"
        },{
            "month": "Mar 2019",
            "San Jose": "300",
            "Palo Alto": "400",
            "Sunnyvale": "350"
        },{
            "month": "Apr 2019",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        }];
        let newInstallationIncentivesVsCost = [{
            "month": "Nov 2018",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100",
            "Average Cost": "3000"
        },{
            "month": "Dec 2018",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100",
            "Average Cost": "2990"
        },{
            "month": "Jan 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Cost": "2800"
        },{
            "month": "Feb 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Cost": "2800"
        },{
            "month": "Mar 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Cost": "2800"
        },{
            "month": "Apr 2019",
            "San Jose": "800",
            "Palo Alto": "500",
            "Sunnyvale": "100",
            "Average Cost": "2750"
        }];
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
                                        <div>Growth of Total Solar Capacity</div>
                                        <CitiesLineChart data={growthTotalCapacity} unit='kW'/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Installation Incentives vs Average Cost</div>
                                        <CitiesLineChart data={newInstallationIncentivesVsCost} unit='kW/USD' showLabels={true} extraLineKey='Average Cost'/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Electricity Generated by Solar in a Day (April 2019)</div>
                                        <CitiesLineChart data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Transformer Load in a Day (April 2019)</div>
                                        <CitiesLineChart data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Daytime Solar Energy Maximum Conversion Rate (April 2019)</div>
                                        <CitiesLineChart data={this.state.chargeCompare_data}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Average Electricity Bill per Household (April 2019)</div>
                                        <CitiesLineChart data={this.state.chargeCompare_data}/>
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
