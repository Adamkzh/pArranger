import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';


const data = [
    {year: '0', money: -10000},
    {year: '5', money: -5000},
    {year: '7', money: 0},
    {year: '10', money: 2000},
    {year: '15', money: 5000},
    {year: '20', money: 10000},
    {year: '25', money: 18000},
  ];


const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.money));
    const dataMin = Math.min(...data.map((i) => i.money));
  
    if (dataMax <= 0){
        return 0
    }
    else if (dataMin >= 0){
        return 1
    }
    else{
        return dataMax / (dataMax - dataMin);
    }
}

const off = gradientOffset();

export default class PayBack extends PureComponent {
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
                <AreaChart
                    width={550}
                    height={230}
                    data={data}
                    margin={{
                        top: 10, right: 15, left: 5, bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="year" label={{value : 'Year'}}/>
                    <YAxis label={{ value: 'MONEY ($)', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip/>
                    <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1}/>
                        <stop offset={off} stopColor="red" stopOpacity={1}/>
                    </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="money" stroke="#000" fill="url(#splitColor)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
