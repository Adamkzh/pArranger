import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

export default class CitiesLineChart extends PureComponent {

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
        var enableDots = true;
        if (this.props.dots === false) {
            enableDots = false;
        }
        var sanJoseLine = <Line type="monotone" dataKey="San Jose" barSize={10} stroke="#c5a1fd" strokeWidth={3} fill="#c5a1fd" dot={enableDots}/>;
        var paloAltoLine = <Line type="monotone" dataKey="Palo Alto" barSize={10} stroke="#82ca9d" strokeWidth={3} fill="#82ca9d" dot={enableDots}/>;
        var sunnyvaleLine = <Line type="monotone" dataKey="Sunnyvale" barSize={10} stroke="#FFB533" strokeWidth={3} fill="#FFB533" dot={enableDots}/>;

        var extraLine = '';
        if (this.props.extraLineKey) {
            extraLine = <Line type="monotone" dataKey={this.props.extraLineKey} barSize={10} stroke="#11CEFF" strokeWidth={3} fill="#11CEFF" dot={enableDots}/>;
        }

        if (this.props.showLabels) {
            sanJoseLine = <Line type="monotone" dataKey="San Jose" barSize={10} stroke="#c5a1fd" fill="#c5a1fd" strokeWidth={3} label={<CustomizedLabel/>} dot={enableDots}/>;
            paloAltoLine = <Line type="monotone" dataKey="Palo Alto" barSize={10} stroke="#82ca9d" fill="#82ca9d" strokeWidth={3} label={<CustomizedLabel/>} dot={enableDots}/>;
            sunnyvaleLine = <Line type="monotone" dataKey="Sunnyvale" barSize={10} stroke="#FFB533" fill="#FFB533" strokeWidth={3} label={<CustomizedLabel/>} dot={enableDots}/>;
            if (this.props.extraLineKey) {
                extraLine = <Line type="monotone" dataKey={this.props.extraLineKey} barSize={10} stroke="#11CEFF" fill="#11CEFF" strokeWidth={3} label={<CustomizedLabel/>} dot={enableDots}/>;
            }
        }

        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">                     
                <LineChart
                    data={this.state.data}
                    margin={{
                        top: 20, right: 20, left: 1, bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="label" />
                    <YAxis label={{ value: this.props.unit, angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'}}} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke='#000'/>
                    {sanJoseLine}
                    {paloAltoLine}
                    {sunnyvaleLine}
                    {extraLine}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

class CustomizedLabel extends PureComponent {
    render () {
        const {x, y, stroke, value} = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    }
}
