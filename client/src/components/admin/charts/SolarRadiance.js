import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
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

const box_style = {
    'box-shadow':' 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)',
    'width':'100%'
}

const title_style = {
    'text-align': 'center',
}
export default class SolarRadiance extends PureComponent {
    render() {
        return (
            <div style={box_style}>
                <div style={title_style}>
                Live Radiation Data
                </div>
                <AreaChart
                    width={310}
                    height={200}
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
            </div>
        );
    }
}
