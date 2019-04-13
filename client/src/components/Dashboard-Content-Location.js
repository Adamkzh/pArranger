import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List , Message, Loader } from 'semantic-ui-react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import '../style/Map.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import b64toBlob from 'b64-to-blob';

var formData = new FormData();

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
    zoom:20.1,
    
  });

  map.flyTo({
    center: [this.state.x, this.state.y],
    zoom:0.5,
    speed:4 
  })

  geocoder.on('result', (...args) => {
    var response = args[0].result;
    window.localStorage.setItem('lat',response.center[0]);   
    window.localStorage.setItem('lon',response.center[1]);   
    window.localStorage.setItem('address',response.place_name); 
  });

  map.on('moveend', (...args) => {
    formData.set('id','origin_image')
    var contentType = 'image/png';
    var b64Data=map.getCanvas().toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
    var blob = b64toBlob(b64Data, contentType);
    formData.set('mapImage', blob);
    console.log(blob)
    console.log(b64Data);
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

isValidated = () =>{
  try{
    const config = {	
      headers: {	        
        'content-type': 'multipart/form-data'	      
      },
    };

    axios.post('/api/save', formData, config).then(function (response) {
      console.log(response);
    })
  }catch(error){
    console.log(error)
  }
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
