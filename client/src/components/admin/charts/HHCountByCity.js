import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        city: 'SanJose', availableHouseholdCount: 4000, numberOfHHWithPanels: 2000
    },
    {
        city: 'Sunnyvale', availableHouseholdCount: 1000, numberOfHHWithPanels: 800
    },
    {
        city: 'PaloAlto', availableHouseholdCount: 3000, numberOfHHWithPanels: 2000
    },
];

export default class HHCountByCity extends PureComponent {
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
                <YAxis label={{ value: 'Number of HH', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="availableHouseholdCount" fill="#CBD9EF" />
                <Bar dataKey="numberOfHHWithPanels" fill="#80AAED" />
            </BarChart>
        );
    }
}
