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
            currentCoordinates: {}
        };

        getLocation((coords) => {
            const currentCoordinates = {
                lat: coords.coords.latitude,
                lng: coords.coords.longitude
            };

            this.setState({ currentCoordinates });
        });
    }

    onBoundsChanged() {
        const bounds = this.mapRef.getBounds();
        const NE = bounds.getNorthEast();
        const SW = bounds.getSouthWest();

        const boundingBox = `${SW.lng()},${SW.lat()},${NE.lng()},${NE.lat()}`;
        this.props.setCurrentLocation(boundingBox);
    }

    render() {
        const { currentCoordinates } = this.state;
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
        setCurrentLocation: bindActionCreators(actions.setCurrentLocation, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
