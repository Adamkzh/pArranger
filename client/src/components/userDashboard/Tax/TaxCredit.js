import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
} from 'recharts';


const data = [
    {year: '2007', cost: 0.38, savings: 0.16},
    {year: '2008', cost: 0.32, savings: 0.14},
    {year: '2009', cost: 0.32, savings: 0.14},
    {year: '2010', cost: 0.24, savings: 0.10},
    {year: '2010', cost: 0.19, savings: 0.08},
    {year: '2011', cost: 0.15, savings: 0.06},
    {year: '2012', cost: 0.12, savings: 0.05},
    {year: '2013', cost: 0.09, savings: 0.04},
    {year: '2014', cost: 0.08, savings: 0.035},
    {year: '2015', cost: 0.07, savings: 0.03},
    {year: '2016', cost: 0.06, savings: 0.025},
    {year: '2017', cost: 0.03, savings: 0.01},
    {year: '2018', cost: 0.02, savings: 0.008},
    {year: '2019', cost: 0.01, savings: 0.004},
];


export default class TextCredit extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            data : null,
        }
    }

    componentDidUpdate = () =>{

    }

    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <BarChart 
                 width={550}
                 height={230}
                 data={data}
                 margin={{
                     top: 10, right: 15, left: 5, bottom: 30,
                 }}
                >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="year"/>
                <YAxis label={{ value: 'COST ($/kwh)', angle: -90, position: 'insideLeft' }}/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="cost" stackId="a" fill="#8884d8" label={{ value: 'cost', position: 'insideTop' ,float:'left'}}/>
                <Bar dataKey="savings" stackId="a" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
