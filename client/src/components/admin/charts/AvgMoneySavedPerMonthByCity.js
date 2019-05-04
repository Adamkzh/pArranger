import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        city: 'SanJose', moneySavedPerMonthPerHH: 4000,
    },
    {
        city: 'Sunnyvale', moneySavedPerMonthPerHH: 3000,
    },
    {
        city: 'PaloAlto', moneySavedPerMonthPerHH: 1000,
    },
];

export default class AvgMoneySavedPerMonthByCity extends PureComponent {
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
                <XAxis dataKey="city" />
                <YAxis label={{ value: 'US Dollar', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                <Tooltip />
                {/*<Legend />*/}
                <Bar dataKey="moneySavedPerMonthPerHH" fill="#80AAED" />
            </BarChart>
        );
    }
}
