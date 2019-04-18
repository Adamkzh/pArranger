import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
/*var text = '{"panels":['+'{"Month": "Apr","city":"San Jose", "number":"1000"},' + '{"Month": "March","city":"San Jose", "number":"1500"},' + '{"Month": "Feb","city":"San Jose", "number":"2000"}]}';

obj = JSON.parse(text);
*/
const data = [
      {Month: 'Oct 2018', SanJose: 1000, SantaClara: 2400, MountainView: 2400},
      {Month: 'Nov 2018', SanJose: 1200, SantaClara: 2600, MountainView: 2800},
      {Month: 'Dec 2018', SanJose: 1300, SantaClara: 2900, MountainView: 3000},
      {Month: 'Jan 2019', SanJose: 1350, SantaClara: 3000, MountainView: 3000},
      {Month: 'Feb 2019', SanJose: 1500, SantaClara: 3400, MountainView: 3200},
      {Month: 'Mar 2019', SanJose: 1800, SantaClara: 3600, MountainView: 3400},
];

const box_style = {
    'box-shadow':' 0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)'
}
const title_style = {
    'text-align': 'center',
}
export default class SimpleBarChart extends PureComponent{
	render () {
  	return (
        <div style={box_style}>
        <div style={title_style}>
        Total Solar Panels
        </div>
      <BarChart
      width={410}
      height={290}
      data={data}
      margin={{
          top: 10, left: 10,right: 50, bottom: 10,
      }}
      
  >
       <CartesianGrid strokeDasharray="3 3"/>
       
        {/* <Label value="New Installed Solar Panels" offset={0} position="insideBottom" /> */}
       

       <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
       <XAxis dataKey="Month" tick={{fontSize: 12}}/>
       <Tooltip/>
       <Legend wrapperStyle={{'font-size': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
       <Bar dataKey="SanJose" fill="#8884d8" />
       <Bar dataKey="SantaClara" fill="#82ca9d" />
       <Bar dataKey="MountainView" fill="#FFB533" />
      </BarChart>
      </div>
    );
  }
}


