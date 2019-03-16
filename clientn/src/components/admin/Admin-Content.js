import React from "react";
import DeckGL, { ScatterplotLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import '../../style/admin/adminContent.css'

export default class App extends React.Component{
    render() {
        return(
            <DeckGL
            initialViewState={{ longitude: -122.45, latitude: 37.78, zoom: 12, pitch:40.5 }}
            controller={true}
            layers={[
              new ScatterplotLayer({
                data: [{ position: [-122.45, 37.78] }],
                radiusScale: 100,
                getColor: [255, 0, 0, 255]
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

// import React, { Component } from 'react';
// import DeckGL, { LineLayer, MapboxLayer, HexagonLayer } from "deck.gl";
// import * as d3 from "d3";
// import { StaticMap } from "react-map-gl";

// class adminContent extends Component{
//     render() {
//         const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
//         const layers = [
//             new LineLayer({id: 'line-layer', data})
//         ];
//         return(
//             <DeckGL
//             initialViewState={{ longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 40.5}}
//             controller={true}
//             layers={layers}
//           >
//             <StaticMap
//               mapStyle="mapbox://styles/mapbox/dark-v9"
//               mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
//             />
//           </DeckGL>
//         )
//     }
// }
// export default adminContent;

// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import mapboxGl from 'mapbox-gl/dist/mapbox-gl.js'



// class adminContent extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       x:"-122.41669",
//       y:"37.7853",
//       map:null,
//     }; 
//   }

//   static childContextTypes = {
//     map: PropTypes.object
//   }

// getChildContext = () => ({
//     map: this.state.map
// })
  

// componentDidMount() {
//     const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';
//     const COLOR_RANGE = [
//     [1, 152, 189],
//     [73, 227, 206],
//     [216, 254, 181],
//     [254, 237, 177],
//     [254, 173, 84],
//     [209, 55, 78]
//     ];
//     const LIGHT_SETTINGS = {
//     lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
//     ambientRatio: 0.4,
//     diffuseRatio: 0.6,
//     specularRatio: 0.2,
//     lightsStrength: [0.8, 0.0, 0.8, 0.0],
//     numberOfLights: 2
//     };

//     console.log("here")
//     console.log(d3.csv(DATA_URL));
//     console.log("2")
//     mapboxGl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
//   const map = new mapboxGl.Map({
//     container: this.container,
//     style: 'mapbox://styles/mapbox/dark-v9',
//     preserveDrawingBuffer: true,
//     center: [-1.4157, 52.2324],
//     zoom: 6,
//     pitch: 40.5
//   })

//   let hexagonLayer;
//   let data = d3.csv(DATA_URL);

//   map.on('load', () => {
//     hexagonLayer = new HexagonLayer({
//       ref: 'hexagon-layer',
//       data,
//       radius: 2000,
//       coverage: 1,
//       upperPercentile: 100,
//       colorRange: COLOR_RANGE,
//       elevationRange: [0, 1000],
//       elevationScale: 250,
//       extruded: true,
//       getPosition: d => [Number(d.lng), Number(d.lat)],
//       lightSettings: LIGHT_SETTINGS,
//       opacity: 1,
//       pickable: true,
//       autoHighlight: true,
//       onClick: console.log
//     });
//     console.log(hexagonLayer)
//     // map.addLayer(test, 'map');
//     map.addLayer({
//         id: 'rpd_parks',
//         type: 'fill',
//         source: hexagonLayer,
//         'source-layer': 'map'
//       });
//   });
// }

//   render() {
//     const { map } = this.state;
    
//   return (
    
//     <div>
//       <div id='map' ref={(x) => { this.container = x }}>
//           {map}
//       </div>
//     </div>
//     )
//   }
// }

// export default adminContent;
