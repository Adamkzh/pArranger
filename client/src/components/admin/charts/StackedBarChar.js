import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';

const data = [
    { year: '2014', HYDRO: 259.367, SOLAR: 28.924, BIOMASS: 63.989, WIND: 181.655 },
    { year: '2015', HYDRO: 249.08, SOLAR: 39.032, BIOMASS: 63.632, WIND: 190.719 },
    { year: '2016', HYDRO: 267.812, SOLAR: 77.276, BIOMASS: 62.76, WIND: 226.993 },
    { year: '2017', HYDRO: 300.333, SOLAR: 77.276, BIOMASS:62.762, WIND: 254.303 },
    { year: '2018', HYDRO: 291.724, SOLAR: 96.147, BIOMASS: 62.765, WIND: 274.952 }
];

const box_style = {
    'box-shadow':' 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)'
}

export default class StackedBarChar extends PureComponent {
    render() {
        return (
            <BarChart
                width={380}
                height={220}
                data={data}
                margin={{
                    top: 10, left: 10,right: 20, bottom: 10,
                }}
                style={box_style}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year">
                    <Label value="Yearly Renewable Electric Energy Generation" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} align="right"/>
                <Bar dataKey="HYDRO" stackId="a" fill="#8884d8" />
                <Bar dataKey="SOLAR" stackId="a" fill="#82ca9d" />
                <Bar dataKey="BIOMASS" stackId="a" fill="#FFB533" />
                <Bar dataKey="WIND" stackId="a" fill="#0088FE" />
            </BarChart>
        );
    }
}
