import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';

// Sample data:
// var dailyPowerGenerationByCity = [
//     {"date":"2019-3-1","SanJose":4000,"AllCitiesAverage":6400},
//     {"date":"2019-3-2","SanJose":3000,"AllCitiesAverage":7398},
//     {"date":"2019-3-3","SanJose":2000,"AllCitiesAverage":6800},
//     {"date":"2019-3-4","SanJose":2780,"AllCitiesAverage":6908},
//     {"date":"2019-3-5","SanJose":1890,"AllCitiesAverage":6800},
//     {"date":"2019-3-6","SanJose":2390,"AllCitiesAverage":7800},
//     {"date":"2019-3-7","SanJose":3490,"AllCitiesAverage":5300}];


export default class MonthlyPowerGenerationSingleCity extends PureComponent {
    constructor(props){
      super(props);
      this.state={
          data : null
      }
  }

  render() {
      return (
        <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
          <LineChart
            width={410}
            height={290}
            data={this.props.data}
            margin={{
                top: 10, left: 5,right: 55, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" tick={{fontSize: 12}}/>
            <YAxis label={{ value: 'KWh', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
            <Tooltip />
            <Legend wrapperStyle={{'fontSize': '14px'}} align="center" />
            <Legend verticalAlign="bottom" height={36} align="right"/>
            <Line type="monotone" dataKey={this.props.city} stroke="#82ca9d" >
              <LabelList dataKey={this.props.city} position="insideTop" />
            </Line>
            <Line type="monotone" dataKey="AllCitiesAverage" stroke="#1e2b12" >
                <LabelList dataKey="AllCitiesAverage" position="insideTop" />
            </Line>
            </LineChart>
      </ResponsiveContainer>
      );
  }
}
