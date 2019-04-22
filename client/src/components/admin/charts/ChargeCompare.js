import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';


const data = [
    {
        month: 'JAN', solar: 200, average: 590
    },
    {
        month: 'FEB', solar: 400, average: 675
    },
    {
        month: 'MAR', solar: 638, average: 874
    },
    {
        month: 'APR', solar: 629, average: 900
    },
    {
        month: 'MAY', solar: 688, average: 1065
    },
    {
        month: 'JUN', solar: 977, average: 1602
    },
    {
        month: 'JUL', solar: 1102, average: 1799
    },
    {
        month: 'AUG', solar: 1206, average: 2300
    },
    {
        month: 'SEP', solar: 1000, average: 1765
    },
    {
        month: 'OCT', solar: 500, average: 1300
    },
    {
        month: 'NOV', solar: 400, average: 896
    },
    {
        month: 'DEC', solar: 300, average: 680
    },
  ];


export default class SolarRadiance extends PureComponent {
    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <LineChart
                    width={550}
                    height={290}
                    data={data}
                    margin={{
                        top: 10, right: 55, left: 15, bottom: 10,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'USD', angle: -90, position: 'insideLeft' ,float:'left'}} />
                    <ReferenceLine x="AUG" stroke="red" label="Max Cost Difference"/>
                    <ReferenceLine y={2300} label="Max Cost" stroke="red"/>
                    <Tooltip />
                    <Legend />
                    <Line dataKey="average" barSize={10} stroke="#FEBF51" fill="#FEBF51" />
                    <Line dataKey="solar" barSize={10} stroke="#82ca9d" fill="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
