import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';

const fake = [
    {time: "5:00", GHI: 200, AVG: 160},
    {time: "6:00", GHI: 310, AVG: 280},
    {time: "7:00", GHI: 320, AVG: 290},
    {time: "8:00", GHI: 350, AVG: 300},
    {time: "9:00", GHI: 410, AVG: 350},
    {time: "10:00", GHI: 420, AVG: 360},
    {time: "11:00", GHI: 510, AVG: 400},
    {time: "12:00", GHI: 520, AVG: 410},
    {time: "13:00", GHI: 527, AVG: 430},
    {time: "14:00", GHI: 520, AVG: 410},
    {time: "15:00", GHI: 510, AVG: 360},
    {time: "16:00", GHI: 410, AVG: 340},
    {time: "17:00", GHI: 370, AVG: 330},
    {time: "18:00", GHI: 310, AVG: 270},
    {time: "19:00", GHI: 200, AVG: 180},
    {time: "20:00", GHI: 20, AVG: 10},
    {time: "21:00", GHI: 0, AVG: 0},
];

var currentDate = new Date();
var hour = currentDate.getHours()
var showTime = hour + ":00" 

export default class SolarRadiance extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            data : null,
            time : showTime,
        }
    }

    componentDidUpdate = () =>{
       
        this.setState({
            // data : this.props.data
            data : fake,
        })
    }

    render() {
        return (
            <ResponsiveContainer maxHeight={250} width="100%" height="90%">                     
                <AreaChart
                    width={410}
                    height={250}
                    data={this.state.data}
                    margin={{
                        top: 10, right: 55, left: 15, bottom: 10,
                    }}
                    >
                    <CartesianGrid stroke='#FFFFFF'/>
                    <ReferenceLine x={this.state.time} stroke="#FFA500" label=""/>
                    <XAxis dataKey="time" tick={{fontSize: 12}}/>
                    <YAxis label={{ value: 'Power output', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {/* label={{ value: 'GHI', position: 'insideBottom' ,float:'left'}} */}
                    <Area type="monotone" dataKey="GHI" stroke="#FFA500" fill="#FEBF51" />
                    <Area type="monotone" dataKey="AVG" stroke="#7CFC00" fill="#AFEEEE" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
