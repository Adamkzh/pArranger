import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List , Message, Loader } from 'semantic-ui-react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import '../style/Map.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Promise from 'promise';


class Location extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x:"-20.012006",
      y:"20.077361",
      map:null,
    }; 
  }

  static childContextTypes = {
    map: PropTypes.object
  }

getChildContext = () => ({
    map: this.state.map
})
  

componentDidMount() {
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

  map.on('moveend', (...args) => {
    let ctn = document.getElementsByClassName("mapboxgl-ctrl-geocoder mapboxgl-ctrl");
    var inputTextValue = "empty_address";
    if(ctn[0] !== null ){
      inputTextValue = ctn[0].textContent;
    }
    console.log("Input value: ");
    console.log( inputTextValue);
    // 1 Washington St, Marblehead, Massachusetts 01945, United States
    // let address = inputTextValue.substr(0, inputTextValue.indexOf('United States'));
    let address = inputTextValue.substr(0, inputTextValue.indexOf('United States') + 13);


    console.log(address);
    window.localStorage.setItem('address',address);   
    window.localStorage.setItem('original_map',map.getCanvas().toDataURL());
  });

  map.addControl(geocoder);
  map.scrollZoom.disable();
}

shouldComponentUpdate(nextProps, nextState) {
  return (
    nextProps.children !== this.props.children ||
    nextState.map !== this.state.map
  )
}


//asynchronous problem
isValidated(){
  return new Promise((resolve, reject) => {
    resolve();
  });
}


  render() {
    const { children } = this.props;
    const { map } = this.state;
    
  return (
    
    <div className='Sarea'>
      <div className='_title'>
        LOCATION       
      </div>
      <div className='Map' ref={(x) => { this.container = x }}>
        <Loader 
        indeterminate
        size='big'
        >Constructing</Loader>
          { map && children }
      </div>
        <div className="reminder" >
        <Message 
          size='mini'
          >
            <List as='ol'>
              <List.Item as='li'>Enter the address of your desired solar install.</List.Item>
              <List.Item as='li'>Center your installation location and click next.</List.Item>
            </List>
          </Message>
      </div>
    </div>
    )
  }
}

export default Location;
