import React from "react";

import {Link} from 'react-router-dom';

import "semantic-ui-css/semantic.min.css";

import {
  Grid,
  Menu
} from "semantic-ui-react";


export default class adminMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let selected = this.props.selected;
        let overview;
        let overviewPerCapita;
        let overviewPerLandArea;
        let citySanJose;
        let citySunnyvale;
        let cityPaloAlto;

        if (selected === 'overview') {
            overview = <Menu.Item active as='a'> Overview </Menu.Item>;
        } else {
            overview = <Menu.Item as={Link} to='/console'> Overview </Menu.Item>;
        }

        if (selected === 'overviewPerCapita') {
            overviewPerCapita = <Menu.Item active as='a'> Overview (Per Capita) </Menu.Item>;
        } else {
            overviewPerCapita = <Menu.Item as={Link} to='/console/overviewPerCapita'> Overview (Per Capita) </Menu.Item>;
        }

        if (selected === 'overviewPerLandArea') {
            overviewPerLandArea = <Menu.Item active as='a'> Overview (Per Land Area) </Menu.Item>;
        } else {
            overviewPerLandArea = <Menu.Item as={Link} to='/console/overviewPerLandArea'> Overview (Per Land Area) </Menu.Item>;
        }

        if (selected === 'citySanJose') {
            citySanJose = <Menu.Item active as='a'> San Jose </Menu.Item>;
        } else {
            citySanJose = <Menu.Item as={Link} to='/console/sanjose'> San Jose </Menu.Item>;
        }

        if (selected === 'citySunnyvale') {
            citySunnyvale = <Menu.Item active as='a'> Sunnyvale </Menu.Item>;
        } else {
            citySunnyvale = <Menu.Item as={Link} to='/console/sunnyvale'> Sunnyvale </Menu.Item>;
        }

        if (selected === 'cityPaloAlto') {
            cityPaloAlto = <Menu.Item active as='a'> Palo Alto </Menu.Item>;
        } else {
            cityPaloAlto = <Menu.Item as={Link} to='/console/paloalto'> Palo Alto </Menu.Item>;
        }

        return <Grid.Column computer={2} only="tablet computer" id="sidebar">
            <br/>
            <br/>
            <Menu vertical borderless fluid text>
                <Menu.Item header>Compete</Menu.Item>
                {overview}
                {overviewPerCapita}
                {overviewPerLandArea}
                <Menu.Item header>City</Menu.Item>
                {citySanJose}
                {citySunnyvale}
                {cityPaloAlto}
            </Menu>
        </Grid.Column>
    }
}
