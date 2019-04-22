import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

export default class SolarRadiance extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            data : null,
        }
    }

    componentDidUpdate = () =>{
        this.setState({
            data : this.props.data
        })
    }

    render() {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <LineChart
                    width={550}
                    height={290}
                    data={this.state.data}
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
