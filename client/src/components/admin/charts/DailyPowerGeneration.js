import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    {
      date: '2019-3-1', SanJose: 4000, PaloAlto: 6400, Sunnyvale: 2400,
    },
    {
      date: '2019-3-2', SanJose: 3000, PaloAlto: 7398, Sunnyvale: 2210,
    },
    {
      date: '2019-3-3', SanJose: 2000, PaloAlto: 6800, Sunnyvale: 2290,
    },
    {
      date: '2019-3-4', SanJose: 2780, PaloAlto: 6908, Sunnyvale: 2000,
    },
    {
      date: '2019-3-5', SanJose: 1890, PaloAlto: 6800, Sunnyvale: 2181,
    },
    {
      date: '2019-3-6', SanJose: 2390, PaloAlto: 7800, Sunnyvale: 2500,
    },
    {
      date: '2019-3-7', SanJose: 3490, PaloAlto: 5300, Sunnyvale: 2100,
    },
];

export default class DailyPowerGeneration extends PureComponent {
    render() {
        return (
          <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
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
              <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
              <Tooltip />
              <Legend wrapperStyle={{'fontSize': '14px'}} align="center" />
              <Legend verticalAlign="bottom" height={36} align="right"/>
              <Line type="monotone" dataKey="SanJose" stroke="#82ca9d" />
              <Line type="monotone" dataKey="PaloAlto" stroke="#FE0101" />
              <Line type="monotone" dataKey="Sunnyvale" stroke="#FFB533" />
              </LineChart>
        </ResponsiveContainer>
        );
    }
}
