import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';

import { gdGeoCoordinats, gdPreloaserStatus } from '../../redux/commonReducer';
import { gdCurrentWeather, gdForecastFiveDay } from '../../redux/weatherReducer';

import Weather from './Weather';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ConnectionAllow from '../../assets/img/ConnectionAllow.png';


class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlWeather: 'https://api.openweathermap.org/data/2.5/',
      appid: 'YOUR-KEY',
      
      showConnectAllow: 'd-none'
    };
  }

  componentDidMount() {
    this.props.gdGeoCoordinats(2);
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

  showHideConnectAllow = () => {
    if (this.state.showConnectAllow === 'd-none') {
      this.setState({ showConnectAllow: 'd-block' });
    } else {
      this.setState({ showConnectAllow: 'd-none' });
    }
  }

  render() {
    return <>
    {
        this.props.commonData.geoIP
        &&
        <div className="mb-3 text-center" onClick={this.showHideConnectAllow} style={{ cursor: 'pointer' }}>
          <h6 className="text-danger"  >
            Geo-coordinates are defined by IP with low accuracy<br />
            Show: how to disable browser lock and improve the accuracy of geo-coordinates
            </h6>
          <img className={"mx-auto " + this.state.showConnectAllow} src={ConnectionAllow} alt='connection' />
        </div>
      }

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



