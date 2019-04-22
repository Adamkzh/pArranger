import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';


const data = [
    {
        month: 'JAN', solar: 500, average: 590
    },
    {
        month: 'FEB', solar: 600, average: 675
    },
    {
        month: 'MAR', solar: 738, average: 874
    },
    {
        month: 'APR', solar: 829, average: 900
    },
    {
        month: 'MAY', solar: 988, average: 1065
    },
    {
        month: 'JUN', solar: 1002, average: 1102
    },
    {
        month: 'JUL', solar: 1102, average: 1199
    },
    {
        month: 'AUG', solar: 1206, average: 1300
    },
    {
        month: 'SEP', solar: 1000, average: 1065
    },
    {
        month: 'OCT', solar: 800, average: 967
    },
    {
        month: 'NOV', solar: 754, average: 896
    },
    {
        month: 'DEC', solar: 588, average: 680
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
                    <Tooltip />
                    <Legend />
                    <Line dataKey="average" barSize={10} stroke="#FEBF51" fill="#FEBF51" />
                    <Line dataKey="solar" barSize={10} stroke="#82ca9d" fill="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
