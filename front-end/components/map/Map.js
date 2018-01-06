import React from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import InfoModalInner from './InfoModalInner';

const Map = (props) => {
    let tags = null;
    if (props.infoWindowData) {
        tags = props.infoWindowData.hashTags
            .map(tag => `#${tag.text}`)
            .join(', ');
    }

    return (
        <GoogleMap
            ref={props.mapRef}
            defaultZoom={11}
            defaultCenter={props.currentCoordinates}
            onBoundsChanged={props.onBoundsChanged}
        >
            <MarkerClusterer>
                {props.markers.map(marker => (
                    <Marker
                        key={marker.twid}
                        position={marker.coordinates}
                        onClick={props.toggleInfoWindow.bind(null, marker)}
                    />
                ))}
            </MarkerClusterer>
            {props.infoWindowData && (
                <InfoWindow
                    position={props.infoWindowData.coordinates}
                    onCloseClick={props.toggleInfoWindow.bind(null, null)}
                >
                    <InfoModalInner
                        infoWindowData={props.infoWindowData}
                        tags={tags}
                    />
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(Map));
