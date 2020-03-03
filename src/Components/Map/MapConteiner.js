import React from 'react';

import { gdGeoCoordinats } from '../../redux/commonReducer';
import { gdCurrentMap } from '../../redux/mapsReducer';

import MapGoogle from './MapGoogle';
import MapHere from './MapHere';
import MapLeaflet from './MapLeaflet';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


class MapContainer extends React.Component {

  componentDidMount() {
    this.navGeo();

  }

  navGeo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let latlon = {
        latitude: (position.coords.latitude).toFixed(5),
        longitude: position.coords.longitude.toFixed(5)
      }
      this.props.gdGeoCoordinats(JSON.stringify(latlon));
    });

  }

  setMap = (map) => {
    this.props.gdCurrentMap(map)
  }

  render() {

    if (this.props.commonData.geoCoordinats.latitude !== null) {
      return <>
        <div className='text-center mb-2'>
          <ToggleButtonGroup size="sm" type="radio" name="options" defaultValue={1} >
            <ToggleButton onClick={() => { this.setMap('Leaflet') }} value={1} variant="success">Leaflet Maps</ToggleButton>
            <ToggleButton onClick={() => { this.setMap('Here') }} value={2} variant="success">Here Maps</ToggleButton>
            <ToggleButton onClick={() => { this.setMap('Google') }} value={3} variant="success">Google Maps</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className='row'>
          <div className='col-lg-3 col-md-3 text-left '>
            <b>{this.props.mapsData.map} Map</b>
          </div>
          <div className='col-lg-9 col-md-9 text-right '>
            <b>GEODATA: </b>
            latitude - <span className='text-danger font-weight-bold'>{this.props.commonData.geoCoordinats.latitude}</span>;
            longitude - <span className='text-danger font-weight-bold'>{this.props.commonData.geoCoordinats.longitude}</span>
          </div>
        </div>


        {
          this.props.mapsData.map === 'Leaflet'
            ?
            <MapLeaflet
              geoCoordinatsData={this.props.commonData.geoCoordinats}
            />
            :
            this.props.mapsData.map === 'Google'
              ?
              <MapGoogle
                geoCoordinatsData={this.props.commonData.geoCoordinats}
              />
              :
              <MapHere
                geoCoordinatsData={this.props.commonData.geoCoordinats}
              />
        }





      </>
    } else {
      return <>
      </>
    }


  }
}

let mapStateToProps = (state) => {
  return {
    // связка с редакс стором - reduxStore,

    commonData: state.common,
    mapsData: state.maps,


    // usersRedCount: state.usersRedCount,
    // usersOnPage: state.usersOnPage,
    // pages: state.pages,
    // carrentPage: state.carrentPage,
    //isLoadingPage: state.isLoadingPage,
  }
}

export default compose(
  connect(mapStateToProps, {

    gdGeoCoordinats,

    gdCurrentMap

  }),

)(MapContainer);



