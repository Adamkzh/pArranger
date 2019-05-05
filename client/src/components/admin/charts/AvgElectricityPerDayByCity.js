import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    {
        city: 'SanJose', AvgElectricityPerDay: 4000,
    },
    {
        city: 'PaloAlto', AvgElectricityPerDay: 3000,
    },
    {
        city: 'Sunnyvale', AvgElectricityPerDay: 1000,
    },
];

export default class AvgElectricityPerDayByCity extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis label={{ value: 'KW Per Day', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                    <Tooltip />
                    {/*<Legend />*/}
                    <Bar dataKey="AvgElectricityPerDay" fill="#80AAED" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
