import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        year: '2019', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        year: '2018', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        year: '2017', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        year: '2016', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        year: '2015', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        year: '2014', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        year: '2013', uv: 3490, pv: 4300, amt: 2100,
    },
];

export default class StackedBarChar extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

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
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            </BarChart>
        );
    }
}
