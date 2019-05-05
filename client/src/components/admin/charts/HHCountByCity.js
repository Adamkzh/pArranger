import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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

// class CustomizedAxisTick extends PureComponent {
//     render () {
//         const {x, y, stroke, payload} = this.props;
//
//         return (
//             <g transform={`translate(${x},${y})`}>
//                 <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
//             </g>
//         );
//     }
// }

export default class HHCountByCity extends PureComponent {
    render() {
        return (
            <ResponsiveContainer height='100%' width='100%'>
                <BarChart
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city"/>
                    <YAxis label={{ value: 'Number of HH', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="availableHouseholdCount" fill="#CBD9EF" />
                    <Bar dataKey="numberOfHHWithPanels" fill="#80AAED" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
