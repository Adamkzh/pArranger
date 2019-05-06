import React, {PureComponent} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const colors = ["#c5a1fd", "#82ca9d", "#FFB533"];

export default class SimpleBarChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidUpdate = () => {
        this.setState({
            data: this.props.data
        })
    }

    render() {
        let cell = '';
        if (this.state.data) {
            cell = this.state.data.map((entry, index) => (
                <Cell cursor="pointer" fill={colors[index]} key={`cell-${index}`}/>
            ));
        }
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
                <BarChart
                    data={this.state.data}
                    margin={{
                        top: 10, left: 0, right: 20, bottom: 10,
                    }}

                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis label={{
                        value: this.props.unit,
                        angle: -90,
                        position: 'insideLeft',
                        style: {textAnchor: 'middle'}
                    }} tick={{fontSize: 12}}/>
                    <XAxis dataKey="label" tick={{fontSize: 12}}/>
                    <Bar dataKey="value" fill="#c5a1fd">
                        {cell}
                        <LabelList dataKey="value" position='insideTop' fill="#000000"/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}


