import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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
                <AreaChart
                    width={410}
                    height={290}
                    data={this.state.data}
                    margin={{
                        top: 10, right: 55, left: 15, bottom: 10,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{fontSize: 12}}/>
                    <YAxis label={{ value: 'RADIATION', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="GHI" stroke="#FE0101" fill="#FEBF51" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
