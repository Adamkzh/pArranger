import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data1 = [
    {Month: 'Apr 2019', SanJose: 400, Sunnyvale: 300, PaloAlto: 280},
];

export default class AvgMoneySavedPerMonthByCity extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data : null
        }
    }

    // componentDidUpdate = () =>{
    //     this.setState({
    //         data : this.props.data
    //     })
    // }

    render () {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
                <BarChart
                    width={410}
                    height={290}
                    data={data1}
                    margin={{
                        top: 10, left: 10,right: 50, bottom: 10,
                    }}

                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis label={{ value: 'US DOLLAR', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
                    <XAxis dataKey="Month" tick={{fontSize: 12}}/>
                    <Tooltip/>
                    <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                    <Bar dataKey="SanJose" fill="#CBD9EF" />
                    <Bar dataKey="PaloAlto" fill="#80AAED" />
                    <Bar dataKey="Sunnyvale" fill="#FFB533" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}



