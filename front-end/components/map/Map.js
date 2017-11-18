import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

const Map = props => (
    <GoogleMap
        ref={props.mapRef}
        defaultZoom={11}
        defaultCenter={props.currentCoordinates}
        onBoundsChanged={props.onBoundsChanged}
    >
        {props.markers.map((marker, index) => <Marker key={index} position={marker.coordinates} />)}
    </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
