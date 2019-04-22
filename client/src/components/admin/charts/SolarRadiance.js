import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    {
        time: '5:00', GHI: 200,
    },
    {
        time: '6:00', GHI: 310,
    },
    {
        time: '7:00', GHI: 320,
    },
    {
        time: '8:00', GHI: 350,
    },
    {
        time: '9:00', GHI: 410,
    },
    {
        time: '10:00', GHI: 420,
    },
    {
        time: '11:00', GHI: 510,
    },
    {
        time: '12:00', GHI: 520,
    },
    {
        time: '13:00', GHI: 527,
    },
    {
        time: '14:00', GHI: 520,
    },
    {
        time: '15:00', GHI: 510,
    },
    {
        time: '16:00', GHI: 410,
    },
    {
        time: '17:00', GHI: 370,
    },
    {
        time: '18:00', GHI: 310,
    },
    {
        time: '19:00', GHI: 200,
    },
    {
        time: '20:00', GHI: 20,
    },
    {
        time: '21:00', GHI: 0,
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
