import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

const Map = props => (
    <GoogleMap
        defaultZoom={11}
        defaultCenter={props.currentCoordinates}
    >
        {props.markers.map((marker, index) => <Marker key={index} position={marker.coordinates} />)}
    </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
