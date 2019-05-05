import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

// const data = [
//     { Month: "Nov 2018",  SanJose: 4300, AllCitiesAverage: 3200},
//     { Month: "Dec 2018",  SanJose: 4300, AllCitiesAverage: 3200},
//     { Month: "Jan 2019",  SanJose: 4300, AllCitiesAverage: 3200},
//     { Month: "Feb 2019",  SanJose: 4300, AllCitiesAverage: 3200},
//     { Month: "Mar 2019",  SanJose: 4200, AllCitiesAverage: 3100},
//     { Month: "Apr 2019",  SanJose: 4000, AllCitiesAverage: 3000},
// ];



export default class AvgElectricityMonthlyByCitySingleCity extends PureComponent {
    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
            <BarChart
                width={410}
                height={290}
                data={this.props.data}
                margin={{
                    top: 10, left: 10,right: 50, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" tick={{fontSize: 12}}/>
                <YAxis label={{ value: 'KW', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                <Tooltip />
                <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                <Bar dataKey={this.props.city} fill="#82ca9d" />
                <Bar dataKey="AllCitiesAverage" fill="#dee3ea" />
            </BarChart>
            </ResponsiveContainer>
        );
    }
}
