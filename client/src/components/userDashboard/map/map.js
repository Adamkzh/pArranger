import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const markerUrl = "https://impactinggroup.com/wp-content/uploads/2016/02/impacting-pinpoint.png";

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
    return (
      // eslint-disable-next-line
      <Map style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={this.state.center}
        zoom={[13]}
        >
        <Layer
          type="symbol"
          id="marker"
        >
        <Feature coordinates={this.state.center}/>
        </Layer>
        <Marker
            coordinates={this.state.center}
            anchor="bottom">
            <img src={markerUrl} alt="alt"height={30}/>
        </Marker>
    </Map>
    );
  }
}

export default NeighborMap;