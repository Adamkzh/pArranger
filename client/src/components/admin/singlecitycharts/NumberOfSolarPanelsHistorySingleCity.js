import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LabelList
} from 'recharts';


export default class SimpleBarChart extends PureComponent{
    constructor(props){
      super(props);
      this.state={
          data : null
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
        data={this.props.data}
        margin={{
            top: 10, left: 10,right: 50, bottom: 10,
        }}
        
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' ,style: {textAnchor: 'middle'} }} tick={{fontSize: 12}}
            />
        <XAxis dataKey="Month" tick={{fontSize: 12}}/>
        <Tooltip/>
        <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
        <Bar dataKey={this.props.city} fill="#82ca9d" >
            <LabelList dataKey={this.props.city} position="insideTop" />
        </Bar>
        <Bar dataKey="AllCitiesAverage" fill="#dee3ea">
            <LabelList dataKey="AllCitiesAverage" position="insideTop" />
        </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


