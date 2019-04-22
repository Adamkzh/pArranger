import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer    
} from 'recharts';

const data = [
    { year: '2014', HYDRO: 259.367, SOLAR: 28.924, BIOMASS: 63.989, WIND: 181.655 },
    { year: '2015', HYDRO: 249.08, SOLAR: 39.032, BIOMASS: 63.632, WIND: 190.719 },
    { year: '2016', HYDRO: 267.812, SOLAR: 77.276, BIOMASS: 62.76, WIND: 226.993 },
    { year: '2017', HYDRO: 300.333, SOLAR: 77.276, BIOMASS:62.762, WIND: 254.303 },
    { year: '2018', HYDRO: 291.724, SOLAR: 96.147, BIOMASS: 62.765, WIND: 274.952 }
];

export default class StackedBarChar extends PureComponent {
    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <BarChart
                    width={410}
                    height={290}
                    data={data}
                    margin={{
                        top: 10, left: 10,right: 50, bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
                    <XAxis dataKey="year" tick={{fontSize: 12}}/>
                    <Tooltip />
                    <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                    <Bar dataKey="HYDRO" stackId="a" fill="#8884d8" />
                    <Bar dataKey="SOLAR" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="BIOMASS" stackId="a" fill="#FFB533" />
                    <Bar dataKey="WIND" stackId="a" fill="#0088FE" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
