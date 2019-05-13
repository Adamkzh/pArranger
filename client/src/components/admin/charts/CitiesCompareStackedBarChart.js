import React, {PureComponent} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    LabelList,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

const colors = ["#c5a1fd", "#82ca9d", "#FFB533"];
const fadedColor = ["#e0cdfe", "#b8e0c7", "#ffda99"];

export default class CitiesCompareStackedBarChart extends PureComponent {
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
        let fadedCell = '';
        if (this.state.data) {
            fadedCell = this.state.data.map((entry, index) => (
                <Cell cursor="pointer" fill={fadedColor[index]} key={`cell-${index}`}/>
            ));
        }
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
                <BarChart
                    data={this.state.data}
                    margin={{
                        top: 10, left: 1, right: 20, bottom: 10,
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
                    <Tooltip />
                    <Legend iconSize={0}/>
                    <Bar dataKey="(Dark) Claimed Incentives" stackId='a'>
                        {cell}
                        <LabelList dataKey="(Dark) Claimed Incentives" position='center' fill="#000000"/>
                    </Bar>
                    <Bar dataKey="(Light) Remaining Budget" stackId='a'>
                        {fadedCell}
                        <LabelList dataKey="(Light) Remaining Budget" position='center' fill="#000000"/>
                    </Bar>
                    <ReferenceLine y={0} stroke='#000'/>

                </BarChart>
            </ResponsiveContainer>
        );
    }
}


