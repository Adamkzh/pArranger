import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer    
} from 'recharts';


export default class StackedBarChar extends PureComponent {

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
                <BarChart
                    width={410}
                    height={290}
                    data={this.state.data}
                    margin={{
                        top: 10, left: 10,right: 50, bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
                    <XAxis dataKey="year" tick={{fontSize: 12}}/>
                    <Tooltip />
                    <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                    <Bar dataKey="HYDRO" stackId="a" fill="#8F8FA3" />
                    <Bar dataKey="SOLAR" stackId="a" fill="#EFDF28" />
                    <Bar dataKey="BIOMASS" stackId="a" fill="#80AAED" />
                    <Bar dataKey="WIND" stackId="a" fill="#CBD9EF" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
