import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { city: 'SanJose', totalHHSuitableForInstall: 4000, numberOfHHAlreadyInstalled: 2000, month: "apr" },
    { city: 'Sunnyvale', totalHHSuitableForInstall: 1000, numberOfHHAlreadyInstalled: 800, month: "apr" },
    { city: 'PaloAlto', totalHHSuitableForInstall: 3000, numberOfHHAlreadyInstalled: 2000, month: "apr" }, ];

export default class HHCountByCity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    render () {
        return (
            <ResponsiveContainer maxHeight={290} width="100%" height="100%">
                <BarChart width={410} height={290} data={data} margin={{ top: 10, left: 10,right: 50, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis label={{ value: 'HH COUNT', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12}} />
                    <XAxis dataKey="city" tick={{fontSize: 12}}/>
                    <XAxis dataKey="month" tick={{fontSize: 12}}/>
                    <Tooltip/>
                    <Legend wrapperStyle={{'fontSize': '9.8px'}} verticalAlign="bottom" height={36} align="right" />
                    <Bar dataKey="numberOfHHAlreadyInstalled" fill="#B5CC18" />
                    <Bar dataKey="totalHHSuitableForInstall" fill="#FFB533" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}


