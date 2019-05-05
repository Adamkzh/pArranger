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
        var overview            = <Menu.Item as={Link} to='/console'> Overview </Menu.Item>;
        var overviewPerCapita   = <Menu.Item as={Link} to='/console/overviewPerCapita'> Overview (Per Capita) </Menu.Item>;
        var overviewPerLandArea = <Menu.Item as={Link} to='/console/overviewPerLandArea'> Overview (Per Land Area) </Menu.Item>;
        var citySanJose         = <Menu.Item as={Link} to='/console/sanjose'> San Jose </Menu.Item>;
        var citySunnyvale       = <Menu.Item as={Link} to='/console/sunnyvale'> Sunnyvale </Menu.Item>;
        var cityPaloAlto        = <Menu.Item as={Link} to='/console/paloalto'> Palo Alto </Menu.Item>;

        switch (this.props.selected) {
            case "overview":
                overview = <Menu.Item active as='a'> Overview </Menu.Item>;
                break;
            case "overviewPerCapita":
                overviewPerCapita = <Menu.Item active as='a'> Overview (Per Capita) </Menu.Item>;
                break;
            case "overviewPerLandArea":
                overviewPerLandArea = <Menu.Item active as='a'> Overview (Per Land Area) </Menu.Item>;
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
