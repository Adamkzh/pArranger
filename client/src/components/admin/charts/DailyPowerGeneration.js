import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const data = [
    {
      date: '2019-3-1', SanJose: 4000, PaloAlto: 2400, Sunnyvale: 2400,
    },
    {
      date: '2019-3-2', SanJose: 3000, PaloAlto: 1398, Sunnyvale: 2210,
    },
    {
      date: '2019-3-3', SanJose: 2000, PaloAlto: 9800, Sunnyvale: 2290,
    },
    {
      date: '2019-3-4', SanJose: 2780, PaloAlto: 3908, Sunnyvale: 2000,
    },
    {
      date: '2019-3-5', SanJose: 1890, PaloAlto: 4800, Sunnyvale: 2181,
    },
    {
      date: '2019-3-6', SanJose: 2390, PaloAlto: 3800, Sunnyvale: 2500,
    },
    {
      date: '2019-3-7', SanJose: 3490, PaloAlto: 4300, Sunnyvale: 2100,
    },
];

const box_style = {
    'box-shadow':' 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)',
    'width':'100%'
}

const title_style = {
    'text-align': 'center',
}
export default class DailyPowerGeneration extends PureComponent {
    render() {
        return (
            <div style={box_style}>
                <div style={title_style}>
                Top 3 Solar Cities
                </div>
            <LineChart
                width={410}
                height={290}
                data={data}
                margin={{
                    top: 10, left: 5,right: 55, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{fontSize: 12}}/>
                <YAxis tick={{fontSize: 12}}/>
                <Tooltip />
                <Legend wrapperStyle={{'font-size': '14px'}} align="center" />
                <Legend verticalAlign="bottom" height={36} align="right"/>
                <Line type="monotone" dataKey="SanJose" stroke="#8884d8" />
                <Line type="monotone" dataKey="PaloAlto" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Sunnyvale" stroke="#FFB533" />
            </LineChart>
            </div>
        );
    }
}
