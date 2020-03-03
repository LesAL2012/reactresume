import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import css from './Map.module.css';


//className={css.leafletContainer}

const Map = (props) => {

    return <>


        <LeafletMap
            className={css.leafletContainer}
            center=
            {[
                props.geoCoordinatsData.latitude,
                props.geoCoordinatsData.longitude
            ]}
            zoom={14}
            maxZoom={30}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.4}
        >
            <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position=
                {[
                    props.geoCoordinatsData.latitude,
                    props.geoCoordinatsData.longitude
                ]}
            >
                <Popup>
                    Is this your area?
              </Popup>
            </Marker>
        </LeafletMap>
    </>


}

export default Map