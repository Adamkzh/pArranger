import React from "react";
import DeckGL, { HexagonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import '../../style/admin/adminContent.css';
import * as d3 from 'd3';

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

export default class App extends React.Component{
    render() {
        var data = d3.csv(DATA_URL);
        console.log(data);
        return(
          <DeckGL
            initialViewState={{ longitude: -1.4157, latitude: 52.2324, zoom: 6, pitch:40.5 }}
            controller={true}

            layers={[
              new HexagonLayer({
                type: HexagonLayer,
                id: 'heatmap',
                data: d3.csv(DATA_URL),
                radius: 2000,
                coverage: 1,
                upperPercentile: 100,
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
        )
    }
}
