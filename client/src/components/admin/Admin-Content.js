import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import {HexagonLayer} from 'deck.gl';
import {MapboxLayer} from '@deck.gl/mapbox';
import * as d3 from "d3";

import html2canvas from 'html2canvas';
import PropTypes from 'prop-types'
import {Loader } from 'semantic-ui-react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import uuid from 'uuid';
import Promise from 'promise';

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
let hexagonLayer;

class AdminContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          x:"-20.012006",
          y:"20.077361",
          map:null,
          uuid:null,
          uploading:false,
        }; 
      }
    
      static childContextTypes = {
        map: PropTypes.object
      }
    
    getChildContext = () => ({
        map: this.state.map
    })
      
    
    componentDidMount() {
      this.generateUuid();
    
      /**
       * This part is for mapbox configuration
       */
      MapboxGl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
      const map = new MapboxGl.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/dark-v9',
        preserveDrawingBuffer: true,
        zoom:2,
        pitch: 40.5,
        center: [-1.4157, 52.2324],
      })
      var geocoder = new MapboxGeocoder({
        accessToken: MapboxGl.accessToken,
      });
      
      map.flyTo({
        center: [this.state.x, this.state.y],
        zoom:0.5,
        speed:4 
      })
      map.on('load', (...args) => {
        this.setState({ map });
     
        hexagonLayer = new MapboxLayer({
          type: HexagonLayer,
          id: 'heatmap',
          data:  d3.csv(DATA_URL),
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
        });
        
        map.addLayer(hexagonLayer, 'waterway-label');
      })

      map.addControl(geocoder);
      map.scrollZoom.disable();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
      return (
        nextProps.children !== this.props.children ||
        nextState.map !== this.state.map||
        nextState.uploading !== this.state.uploading
      )
    }
    
    //generate UUID
    generateUuid(){
      if(window.localStorage.getItem('uuid') !== null){
        this.setState({
          uuid : window.localStorage.getItem('uuid')
        })
      }else{
        this.setState({
          uuid : uuid()
        },() =>{
          window.localStorage.setItem('uuid',this.state.uuid);
        });
      }
    }
    
    
    //asynchronous problem
    isValidated(){
      this.setState({
        uploading: true, 
      });
      
      return new Promise((resolve, reject) => {
      //capture the map and save the map pic
        html2canvas(document.querySelector(".mapboxgl-canvas")).then(canvas => {
          // need store the image
          resolve();
        })
      });
    }
    
    
    
      render() {
        const { children } = this.props;
        const { map } = this.state;
    
      return (
        
        <div className='cao'>
          <div className='Mapdd' ref={(x) => { this.container = x }}>
            <Loader 
            indeterminate
            size='big'
            >Constructing</Loader>
              { map && children }
          </div>
        </div>
        )
      }
}

export default AdminContent;
