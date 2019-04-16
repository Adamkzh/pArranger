import React from "react";
import DeckGL, { HexagonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import * as d3 from 'd3';
import '../../style/admin/adminContent.css';
import StackedBarChar from './StackedBarChar';

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
            tablet={2}
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
            tablet={14}
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
                <Grid.Column mobile={8} tablet={4} computer={3}>
                  {/*<Image*/}
                    {/*centered*/}
                    {/*circular*/}
                    {/*size="small"*/}
                    {/*src="/static/images/wireframe/square-image.png"*/}
                  {/*/>*/}
                  {/*<Label basic size="large">*/}
                    {/*Label*/}
                  {/*</Label>*/}
                  {/*<p>Something else</p>*/}
                  <StackedBarChar />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="small"
                    src="/static/images/wireframe/square-image.png"
                  />
                  <Label basic size="large">
                    Label
                  </Label>
                  <p>Something else</p>
                </Grid.Column>
              </Grid.Row>
              <Divider section hidden />
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Section title
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Table singleLine striped selectable unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>1.001</Table.Cell>
                      <Table.Cell>Lorem</Table.Cell>
                      <Table.Cell>ipsum</Table.Cell>
                      <Table.Cell>dolor</Table.Cell>
                      <Table.Cell>sit</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,002</Table.Cell>
                      <Table.Cell>amet</Table.Cell>
                      <Table.Cell>consectetur</Table.Cell>
                      <Table.Cell>adipiscing</Table.Cell>
                      <Table.Cell>elit</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,003</Table.Cell>
                      <Table.Cell>Integer</Table.Cell>
                      <Table.Cell>nec</Table.Cell>
                      <Table.Cell>odio</Table.Cell>
                      <Table.Cell>Praesent</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,003</Table.Cell>
                      <Table.Cell>libero</Table.Cell>
                      <Table.Cell>Sed</Table.Cell>
                      <Table.Cell>cursus</Table.Cell>
                      <Table.Cell>ante</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,004</Table.Cell>
                      <Table.Cell>dapibus</Table.Cell>
                      <Table.Cell>diam</Table.Cell>
                      <Table.Cell>Sed</Table.Cell>
                      <Table.Cell>nisi</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,005</Table.Cell>
                      <Table.Cell>Nulla</Table.Cell>
                      <Table.Cell>quis</Table.Cell>
                      <Table.Cell>sem</Table.Cell>
                      <Table.Cell>at</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,006</Table.Cell>
                      <Table.Cell>nibh</Table.Cell>
                      <Table.Cell>elementum</Table.Cell>
                      <Table.Cell>imperdiet</Table.Cell>
                      <Table.Cell>Duis</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,007</Table.Cell>
                      <Table.Cell>sagittis</Table.Cell>
                      <Table.Cell>ipsum</Table.Cell>
                      <Table.Cell>Praesent</Table.Cell>
                      <Table.Cell>mauris</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,008</Table.Cell>
                      <Table.Cell>Fusce</Table.Cell>
                      <Table.Cell>nec</Table.Cell>
                      <Table.Cell>tellus</Table.Cell>
                      <Table.Cell>sed</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,009</Table.Cell>
                      <Table.Cell>augue</Table.Cell>
                      <Table.Cell>semper</Table.Cell>
                      <Table.Cell>porta</Table.Cell>
                      <Table.Cell>Mauris</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,010</Table.Cell>
                      <Table.Cell>massa</Table.Cell>
                      <Table.Cell>Vestibulum</Table.Cell>
                      <Table.Cell>lacinia</Table.Cell>
                      <Table.Cell>arcu</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,011</Table.Cell>
                      <Table.Cell>eget</Table.Cell>
                      <Table.Cell>nulla</Table.Cell>
                      <Table.Cell>Class</Table.Cell>
                      <Table.Cell>aptent</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,012</Table.Cell>
                      <Table.Cell>taciti</Table.Cell>
                      <Table.Cell>sociosqu</Table.Cell>
                      <Table.Cell>ad</Table.Cell>
                      <Table.Cell>litora</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,013</Table.Cell>
                      <Table.Cell>torquent</Table.Cell>
                      <Table.Cell>per</Table.Cell>
                      <Table.Cell>conubia</Table.Cell>
                      <Table.Cell>nostra</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,014</Table.Cell>
                      <Table.Cell>per</Table.Cell>
                      <Table.Cell>inceptos</Table.Cell>
                      <Table.Cell>himenaeos</Table.Cell>
                      <Table.Cell>Curabitur</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>1,015</Table.Cell>
                      <Table.Cell>sodales</Table.Cell>
                      <Table.Cell>ligula</Table.Cell>
                      <Table.Cell>in</Table.Cell>
                      <Table.Cell>libero</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
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
