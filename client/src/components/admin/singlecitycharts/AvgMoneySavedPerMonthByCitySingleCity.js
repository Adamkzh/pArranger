import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, LabelList, Area
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
                <Bar dataKey={this.props.city} fill="#82ca9d">
                    <LabelList dataKey={this.props.city} position="insideTop" />
                </Bar>
                <Bar dataKey="AllCitiesAverage" fill="#dee3ea" >
                    <LabelList dataKey="AllCitiesAverage" position="insideTop" />
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        );
    }
}



