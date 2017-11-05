import React, { Component } from 'react';
import Map from '../../components/map/Map';

const getLocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    }
};

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { currentCoordinates: {} };

        getLocation(coords => this.setState({
            currentCoordinates: {
                lat: coords.coords.latitude,
                lng: coords.coords.longitude
            }
        }));
    }

    render() {
        const { currentCoordinates } = this.state;

        return (
            <Map
                currentCoordinates={currentCoordinates}
                markers={[{ coordinates: { lat: -34.397, lng: 150.644 } }]}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: 'calc(100vh - 77px)' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        );
    }
}
