import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export default class DailyPowerGeneration extends PureComponent {
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
            width={410}
            height={290}
            data={this.state.data}
            margin={{
                top: 10, left: 5,right: 55, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{fontSize: 12}}/>
            <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
            <Tooltip />
            <Legend wrapperStyle={{'fontSize': '14px'}} align="center" />
            <Legend verticalAlign="bottom" height={36} align="right"/>
            <Line type="monotone" dataKey="SanJose" stroke="#82ca9d" />
            <Line type="monotone" dataKey="PaloAlto" stroke="#FE0101" />
            <Line type="monotone" dataKey="Sunnyvale" stroke="#FFB533" />
            </LineChart>
      </ResponsiveContainer>
      );
  }
}
