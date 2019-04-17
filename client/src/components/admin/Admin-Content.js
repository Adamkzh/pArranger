import React from "react";
import DeckGL, { HexagonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import * as d3 from 'd3';
import '../../style/admin/adminContent.css';
import StackedBarChar from './charts/StackedBarChar';

import "semantic-ui-css/semantic.min.css";
import {
  Divider,
  Grid,
  Header,
  Image,
  Label,
  Menu,
  Table
} from "semantic-ui-react";

const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';
const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];
const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

export default class adminContent extends React.Component{

    constructor(props){
      super(props);
      this.state={
         radius: 2000,
         coverage: 1,
         upperPercentile:100,
      }
    }

    handleChange = (e) =>{
      var value = e.target.value;
      this.setState({
        [e.target.id] : value
      })
    }

    render() {
        return(
          <div >
          <Grid >
          <Grid.Column
            computer={2}
            only="tablet computer"
            id="sidebar"
          >
            <Menu vertical borderless fluid text>
              <Menu.Item active as="a">
                Overview
              </Menu.Item>
              <Menu.Item as="a">Reports</Menu.Item>
              <Menu.Item as="a">Analytics</Menu.Item>
              <Menu.Item as="a">Export</Menu.Item>
              <Divider hidden />
              <Menu.Item as="a">Nav item</Menu.Item>
              <Menu.Item as="a">Nav item again</Menu.Item>
              <Menu.Item as="a">One more nav</Menu.Item>
              <Menu.Item as="a">Another nav item</Menu.Item>
              <Menu.Item as="a">More navigation</Menu.Item>
              <Divider hidden />
              <Menu.Item as="a">Macintoch</Menu.Item>
              <Menu.Item as="a">Linux</Menu.Item>
              <Menu.Item as="a">Windows</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            computer={14}
            floated="right"
            id="content"
          >
            <Grid padded>
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Dashboard
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column computer={4}>
                  <StackedBarChar />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
        {/* <div className="showbox">
            <div id="control-panel">
              <div>
                  <label>Radius</label>
                  <input id="radius" type="range" min="500" max="10000" step="100" value={this.state.radius} onChange={this.handleChange}></input>
                  <span id="radius-value"></span>
              </div>
              <div>
                  <label>Coverage</label>
                  <input id="coverage" type="range" min="0" max="1" step="0.1" value={this.state.coverage} onChange={this.handleChange}></input>
                  <span id="coverage-value"></span>
              </div>
              <div>
                  <label>Upper Percentile</label>
                  <input id="upperPercentile" type="range" min="90" max="100" step="0.2" value={this.state.upperPercentile} onChange={this.handleChange}></input>
                  <span id="upperPercentile-value"></span>
              </div>
            </div>
            <DeckGL
              initialViewState={{ longitude: -1.4157, latitude: 52.2324, zoom: 6, pitch:40.5 }}
              controller={true}
              layers={[
                new HexagonLayer({
                  type: HexagonLayer,
                  id: 'heatmap',
                  data: d3.csv(DATA_URL),
                  radius: this.state.radius,
                  coverage: this.state.coverage,
                  upperPercentile: this.state.upperPercentile,
                  colorRange: COLOR_RANGE,
                  elevationRange: [0, 1000],
                  elevationScale: 250,
                  extruded: true,
                  getPosition: d => [Number(d.lng), Number(d.lat)],
                  lightSettings: LIGHT_SETTINGS,
                  opacity: 1,
                  pickable: true,
                  autoHighlight: true,
                  onClick: console.log
                })
              ]}
            >
              <StaticMap
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA" 
              />
            </DeckGL>
          </div> */}
        </div>
        )
    }
}
