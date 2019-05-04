import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export default class SimpleBarChart extends PureComponent{
    constructor(props){
      super(props);
      this.state={
          data : [
              {
                  city: 'SanJose', totalPanels: 12000,
              },
              {
                  city: 'Sunnyvale', totalPanels: 9000,
              },
              {
                  city: 'PaloAlto', totalPanels: 8000,
              },
          ]
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
        width={300}
        height={300}
        data={this.state.data}
        margin={{
            top: 10, left: 10,right: 50, bottom: 10,
        }}
        
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
        <XAxis dataKey="city" tick={{fontSize: 12}}/>
        <Tooltip/>
        {/*<Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />*/}
        <Bar dataKey="totalPanels" fill="#CBD9EF" />
        {/*<Bar dataKey="PaloAlto" fill="#80AAED" />*/}
        {/*<Bar dataKey="Sunnyvale" fill="#FFB533" />*/}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


