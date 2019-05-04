import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
});

class NeighborMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [window.localStorage.getItem('lat'), window.localStorage.getItem('lon')],
    }; 
  }

  render() {
    console.log(this.state.x);
    console.log(this.state.y);
    return (
      <Map 
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "50vh",
          width: "45vw"
        }}
        center={this.state.center}
        zoom={[13]}
        >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={this.state.center}/>
        </Layer>
    </Map>
    );
  }
}

export default NeighborMap;