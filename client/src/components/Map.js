import React, { Component } from 'react'
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types'
import { List , Message, Dimmer,Loader } from 'semantic-ui-react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import '../style/Map.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import AWS from 'aws-sdk';
import uuid from 'uuid';
import Promise from 'promise';
import ReactGA from 'react-ga';


AWS.config.update({
  'accessKeyId':'AKIAIYVQFSGQWDI6KDUA',
  'secretAccessKey':'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',
});

class Map extends Component {

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
  

fireTracking() { 
    ReactGA.pageview('location');
}

componentDidMount() {
  ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
  this.generateUuid();
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
      const s3 = new AWS.S3({
        region:'us-west-2',
        Bucket:'legionsolar-web-app'
      });
    
      var params = {
        Bucket:'legionsolar-web-app',
        Key: 'OriginalMap/' + this.state.uuid,
        Body:canvas.toDataURL(),
      };
    
      s3.upload(params, (err,data) =>{
          if(err){
            // console.log('error !!! '+ JSON.stringify(err,null,2));
          }else{
            // console.log('success!!!' + JSON.stringify(data,null,2));
            resolve();
          }
      })
    })
  });
}



  render() {
    this.fireTracking();
    const { children } = this.props;
    const { map } = this.state;

  return (
    
    <div className='Sarea'>
      <div className='_title'>
        LOCATION       
      </div>
      <div className='Map' ref={(x) => { this.container = x }}>
        <Dimmer active={this.state.uploading}>
        <Loader 
        indeterminate
        size='big'
        >Constructing</Loader>
          { map && children }
        </Dimmer>
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

export default Map;
