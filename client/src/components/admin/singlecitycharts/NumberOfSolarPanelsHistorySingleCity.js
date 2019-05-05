import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export default class SimpleBarChart extends PureComponent{
    constructor(props){
      super(props);
      this.state={
          data :  [
              {"Month":"Oct 2018","SanJose":1000,"AllCitiesAverage":2400},
              {"Month":"Nov 2018","SanJose":1200,"AllCitiesAverage":2600},
              {"Month":"Dec 2018","SanJose":1300,"AllCitiesAverage":2900},
              {"Month":"Jan 2019","SanJose":1350,"AllCitiesAverage":3000},
              {"Month":"Feb 2019","SanJose":1500,"AllCitiesAverage":3400},
              {"Month":"Mar 2019","SanJose":1800,"AllCitiesAverage":3600}]
    ,
      }
  }

  componentDidUpdate = () =>{
      // this.setState({
      //     data : this.props.data
      // })
  }

	render () {
  	return (
      <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
        <BarChart
        width={410}
        height={290}
        data={this.state.data}
        margin={{
            top: 10, left: 10,right: 50, bottom: 10,
        }}
        
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
        <XAxis dataKey="Month" tick={{fontSize: 12}}/>
        <Tooltip/>
        <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
        <Bar dataKey="SanJose" fill="#82ca9d" />
        <Bar dataKey="AllCitiesAverage" fill="#dee3ea" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


