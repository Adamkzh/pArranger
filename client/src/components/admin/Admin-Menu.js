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
        var summary            = <Menu.Item as={Link} to='/console'> Summary </Menu.Item>;
        var effectAndImpact   = <Menu.Item as={Link} to='/console/effectAndImpact'> Effect & Impact </Menu.Item>;
        var citySanJose         = <Menu.Item as={Link} to='/console/sanjose'> San Jose </Menu.Item>;
        var citySunnyvale       = <Menu.Item as={Link} to='/console/sunnyvale'> Sunnyvale </Menu.Item>;
        var cityPaloAlto        = <Menu.Item as={Link} to='/console/paloalto'> Palo Alto </Menu.Item>;

        switch (this.props.selected) {
            case "summary":
                summary = <Menu.Item active as='a'> Summary </Menu.Item>;
                break;
            case "effectAndImpact":
                effectAndImpact = <Menu.Item active as='a'> Effect & Impact </Menu.Item>;
                break;
            case "citySanJose":
                citySanJose = <Menu.Item active as='a'> San Jose </Menu.Item>;
                break;
            case "citySunnyvale":
                citySunnyvale = <Menu.Item active as='a'> Sunnyvale </Menu.Item>;
                break;
            case "cityPaloAlto":
                cityPaloAlto = <Menu.Item active as='a'> Palo Alto </Menu.Item>;
                break;
            default:
                break;
        }

        return <Grid.Column computer={2} only="tablet computer" id="sidebar">
            <br/>
            <br/>
            <Menu vertical borderless fluid text>
                <Menu.Item header>Overview</Menu.Item>
                {summary}
                {effectAndImpact}
                <Menu.Item header>City</Menu.Item>
                {citySanJose}
                {citySunnyvale}
                {cityPaloAlto}
            </Menu>
        </Grid.Column>
    }
}
