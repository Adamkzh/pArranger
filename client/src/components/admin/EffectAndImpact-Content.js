import React from "react";

import CitiesLineChart from './charts/CitiesLineChart'
import CitiesCompareBarChart from './charts/CitiesCompareBarChart'
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
        let solarIncentiveSpending = [
            {
                "label": "San Jose",
                "(Dark) Claimed Incentives": 18000,
                "(Light) Remaining Budget": 100000
            },
            {
                "label": "Palo Alto",
                "(Dark) Claimed Incentives": 36000,
                "(Light) Remaining Budget": 90000
            },
            {
                "label": "Sunnyvale",
                "(Dark) Claimed Incentives": 34000,
                "(Light) Remaining Budget": 80000
            }];
        let solarElectricityGeneratedHourly = [{
            "label": "12am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "1am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "2am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "3am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "4am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "5am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "6am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "7am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "8am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "9am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "10am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "11am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "12pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "1pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "2pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "3pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "4pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "5pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "6pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "7pm",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "8pm",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "9pm",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "10pm",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "11pm",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        },{
            "label": "12am",
            "San Jose": "0",
            "Palo Alto": "0",
            "Sunnyvale": "0"
        }];
        let hourlyElectricLoad = [{
            "label": "12am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "1am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "2am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "3am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "4am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "5am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "6am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "7am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "8am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "9am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "10am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "11am",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "12pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "1pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "2pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "3pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "4pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "5pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "6pm",
            "San Jose": "100",
            "Palo Alto": "100",
            "Sunnyvale": "100"
        },{
            "label": "7pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "8pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "9pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "10pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "11pm",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
        },{
            "label": "12am",
            "San Jose": "500",
            "Palo Alto": "550",
            "Sunnyvale": "450"
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
                                        <div>Growth of Solar Capacity</div>
                                        <CitiesLineChart data={growthTotalCapacity} unit='kW'/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Incentive Spending (FY2019)</div>
                                        <CitiesCompareStackedBarChart data={solarIncentiveSpending} unit='USD'/>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Solar Electricity Generated Hourly (Month Average - April 2019)</div>
                                        <CitiesLineChart data={solarElectricityGeneratedHourly} unit='kW' dots={false}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment className="chart-container">
                                        <div>Hourly All Electric Load (Month Average - April 2019)</div>
                                        <CitiesLineChart data={hourlyElectricLoad} unit='kW' dots={false}/>
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
                                        <div>Average Electricity Bill Saving per Solar Household (April 2019)</div>
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
