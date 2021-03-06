import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Map from '../../components/map/Map';

const getLocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    }
};

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCoordinates: { lat: 51.5, lng: -0.1 },
            infoWindowData: null
        };

        getLocation((coords) => {
            const currentCoordinates = {
                lat: coords.coords.latitude,
                lng: coords.coords.longitude
            };

            this.setState({ currentCoordinates });
            this.props.getInitialTweets({ coordinates: currentCoordinates });
        });
    }

    onBoundsChanged() {
        const bounds = this.mapRef.getBounds();
        const NE = bounds.getNorthEast();
        const SW = bounds.getSouthWest();

        // const boundingBox = `${SW.lng()},${SW.lat()},${NE.lng()},${NE.lat()}`;
        const boundingBox = {
            swLng: SW.lng(),
            swLat: SW.lat(),
            neLng: NE.lng(),
            neLat: NE.lat()
        };
        this.props.setCurrentLocation(boundingBox);
    }

    toggleInfoWindow(marker) {
        this.setState({ infoWindowData: marker });
    }

    render() {
        const { currentCoordinates, infoWindowData } = this.state;
        const { tweets } = this.props;

        return (
            <Map
                mapRef={node => (this.mapRef = node)}
                currentCoordinates={currentCoordinates}
                markers={tweets}
                onBoundsChanged={this.onBoundsChanged.bind(this)}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: 'calc(100vh - 77px)' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                infoWindowData={infoWindowData}
                toggleInfoWindow={this.toggleInfoWindow.bind(this)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tweets: state.map.tweets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentLocation: bindActionCreators(actions.setCurrentLocation, dispatch),
        getInitialTweets: bindActionCreators(actions.getInitialTweets, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
