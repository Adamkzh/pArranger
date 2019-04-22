import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    {
        time: '12:00', GHI: 200,
    },
    {
        time: '13:00', GHI: 310,
    },
    {
        time: '14:00', GHI: 410,
    },
    {
        time: '15:00', GHI: 510,
    },
    {
        time: '16:00', GHI: 310,
    },
    {
        time: '17:00', GHI: 710,
    },
    {
        time: '18:00', GHI: 810,
    },
];

export default class SolarRadiance extends PureComponent {
    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <AreaChart
                    width={410}
                    height={290}
                    data={data}
                    margin={{
                        top: 10, right: 55, left: 15, bottom: 10,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{fontSize: 12}}/>
                    <YAxis label={{ value: 'RADIATION', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="GHI" stroke="#FE0101" fill="#FEBF51" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
