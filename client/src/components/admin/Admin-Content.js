import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import {HexagonLayer} from 'deck.gl';
import {MapboxLayer} from '@deck.gl/mapbox';
import * as d3 from "d3";


import html2canvas from 'html2canvas';
import PropTypes from 'prop-types'
import { List , Message, Dimmer,Loader } from 'semantic-ui-react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import uuid from 'uuid';
import Promise from 'promise';



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
        style: 'mapbox://styles/mapbox/satellite-v9',
        preserveDrawingBuffer: true
      })
      var geocoder = new MapboxGeocoder({
        accessToken: MapboxGl.accessToken,
        zoom:20.1
      });
      
      map.flyTo({
        center: [this.state.x, this.state.y],
        zoom:0.5,
        speed:4 
      })
      map.on('load', (...args) => {
        this.setState({ map })
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
            <Dimmer active={this.state.uploading}>
            <Loader 
            indeterminate
            size='big'
            >Constructing</Loader>
              { map && children }
            </Dimmer>
          </div>
        </div>
        )
      }
}

export default AdminContent;
