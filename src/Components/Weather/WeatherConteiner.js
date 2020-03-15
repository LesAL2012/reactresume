import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';

import { gdGeoCoordinats, gdPreloaserStatus } from '../../redux/commonReducer';
import { gdCurrentWeather, gdForecastFiveDay } from '../../redux/weatherReducer';

import Weather from './Weather';
import { compose } from 'redux';
import { connect } from 'react-redux';



class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlWeather: 'https://api.openweathermap.org/data/2.5/',
      appid: 'YOUR-KEY',
    };

  }

  componentDidMount() {
    this.navGeo();
  }


  navGeo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let latlon = {
        latitude: (position.coords.latitude).toFixed(2),
        longitude: position.coords.longitude.toFixed(2)
      }
      this.props.gdGeoCoordinats(JSON.stringify(latlon));
    });
  }

  getCurrentWeatherData = () => {
    this.props.gdPreloaserStatus(true);
    let lat = this.props.commonData.geoCoordinats["latitude"];
    let lon = this.props.commonData.geoCoordinats["longitude"];

    //Без промиса
    // fetch(`${this.state.urlWeather}weather?lat=${lat}&lon=${lon}&appid=${this.state.appid}`)
    //   .then(resp => resp.json())
    //   .then(data => {
    //     this.props.gdCurrentWeather(JSON.stringify(data));
    //   });

    // fetch(`${this.state.urlWeather}forecast?lat=${lat}&lon=${lon}&appid=${this.state.appid}`)
    //   .then(resp => resp.json())
    //   .then(data => {
    //     this.props.gdForecastFiveDay(JSON.stringify(data));
    //   });


    //С промисом - два АРI запроса на одну страницу
    let current = new Promise((resolve, reject) => {
      fetch(`${this.state.urlWeather}weather?lat=${lat}&lon=${lon}&appid=${this.state.appid}`)
        .then(data => resolve(data.json()))
    });

    let five = new Promise((resolve, reject) => {
      fetch(`${this.state.urlWeather}forecast?lat=${lat}&lon=${lon}&appid=${this.state.appid}`)
        .then(data => resolve(data.json()))
    });

    Promise.all([current, five]).then(value => {
      this.props.gdCurrentWeather(JSON.stringify(value[0]));
      this.props.gdForecastFiveDay(JSON.stringify(value[1]));
      this.props.gdPreloaserStatus(false);
    });
  }

  render() {
    return <>

      {
        this.props.commonData.preloaserStatus === true
          ?
          < Preloader />
          :
          JSON.stringify(this.props.weatherData.currentWeather) === '{}'
            &&
            this.props.commonData.geoCoordinats["latitude"] !== null
            ?
            this.getCurrentWeatherData()
            :
            <Weather
              geoCoordinatsData={this.props.commonData.geoCoordinats}

              currentWeatherData={this.props.weatherData.currentWeather}
              forecastFiveDayData={this.props.weatherData.fiveDayForecast}
            />
      }
    </>
  }
}

let mapStateToProps = (state) => {

  return {
    // связка с редакс стором - reduxStore,

    commonData: state.common,
    weatherData: state.weather,
  }
}

export default compose(
  connect(mapStateToProps, {

    gdGeoCoordinats,
    gdPreloaserStatus,

    gdCurrentWeather,
    gdForecastFiveDay

  }),

)(WeatherContainer);



