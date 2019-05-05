import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';


export default class AvgMoneySavedPerMonthByCitySingleCity extends PureComponent {
    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
            <BarChart
                width={260}
                height={230}
                data={this.props.data}
                margin={{
                    top: 10, left: 10,right: 50, bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" tick={{fontSize: 12}}/>
                <YAxis label={{ value: 'US Dollar', angle: -90, position: 'insideLeft' }} tick={{fontSize: 10 }}/>
                <Tooltip />
                <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                <Bar dataKey={this.props.city} fill="#82ca9d" />
                <Bar dataKey="AllCitiesAverage" fill="#dee3ea" />
            </BarChart>
            </ResponsiveContainer>
        );
    }
}
