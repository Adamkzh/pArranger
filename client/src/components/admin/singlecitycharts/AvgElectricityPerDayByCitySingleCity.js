import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    { Month: "Apr 2019",  SanJose: 4000, AllCitiesAverage: 3000},
    { Month: "Mar 2019",  SanJose: 4200, AllCitiesAverage: 3100},
    { Month: "Feb 2019",  SanJose: 4300, AllCitiesAverage: 3200},
];

export default class AvgElectricityPerDayByCity extends PureComponent {
    render() {
        return (
            <BarChart
                width={300}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" />
                <YAxis label={{ value: 'KW Per Day', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="SanJose" fill="#82ca9d" />
                <Bar dataKey="AllCitiesAverage" fill="#dee3ea" />
            </BarChart>
        );
    }
}
