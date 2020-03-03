import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import css from './Map.module.css';

export class MapGoogle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.geoCoordinatsData.latitude,
            longitude: this.props.geoCoordinatsData.longitude
        }
    }

    render() {

        return (
            <div className={css.contentMap}>
                <Map
                    google={this.props.google}
                    zoom={13}

                    initialCenter={{
                        lat: this.state.latitude,
                        lng: this.state.longitude,
                    }}
                >
                    <Marker
                        position={{
                            lat: this.state.latitude,
                            lng: this.state.longitude
                        }}
                        title={'Is this your area?'} />
                </Map>
            </div >

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'YOUR-KEY'
})(MapGoogle);