import React, { Component } from "react";
import HPlatform, {
    HMap,
    HMapMarker,


} from "react-here-map";



const markerIcon =
    '<svg width="24" height="24" ' +
    'xmlns="https://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

export default class Map extends Component {

    render() {

        return (
            <HPlatform
                app_id='YOUR-KEY'
                app_code='YOUR-KEY'
                useCIT
                useHTTPS
                includeUI
                interactive // Required for events
                includePlaces
            >
                <HMap
                    style={{
                        height: '75vh',
                        width: '100%',
                        border: '3px solid green'
                    }}
                    useEvents // Required for events
                    mapEvents={{ pointerdown: e => console.log("Map Pointer Down", e) }} // event handlers
                    mapOptions={{
                        center: {
                            lat: this.props.geoCoordinatsData.latitude,
                            lng: this.props.geoCoordinatsData.longitude
                        },
                        zoom: 6,
                        pixelRatio: window.devicePixelRatio || 1
                    }}
                >

                    <HMapMarker
                        coords={{
                            lat: this.props.geoCoordinatsData.latitude,
                            lng: this.props.geoCoordinatsData.longitude
                        }}
                        icon={markerIcon}
                        objectEvents={{ pointerdown: e => console.log("Marker Pointer Down", e) }}
                    />
                </HMap>
            </HPlatform>
        )
    }
}