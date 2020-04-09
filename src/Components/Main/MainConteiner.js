import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import css from './MainConteiner.module.css';
import iconWeather from '../../assets/img/icon_weather_react.png';
import iconMap from '../../assets/img/icon_map_react.png';
import iconCurrencyExchange from '../../assets/img/icon_currency_exchange_react.png';
import iconCurrencyExchangeUA from '../../assets/img/icon_currency_exchange_react_UA.png';
import iconAgroData from '../../assets/img/icon_agro_data.png';
import iconToDoList from '../../assets/img/icon_to_do_list.png';
import iconToDoListPHP from '../../assets/img/icon_to_do_list_PHP.png';

import { Nav } from 'react-bootstrap';

const data = {

  agroData: {
    title: 'Big Data: agricultural',
    desc: "Summary corporation data. Google Charts. Editing data in a browser",
    linkImg: iconAgroData,
    linkHTTP: '/agrodata',
  },

  currencyExchange: {
    title: 'Currency exchange',
    desc: 'API of European Central Bank',
    linkImg: iconCurrencyExchange,
    linkHTTP: '/currencyexchange',
  },

  currencyExchangeUA: {
    title: 'UA banks: live exchange',
    desc: 'Two API of сurrency exchange of Ukrainian banks (Local language)  - sort by bank name, city, phone, address ...',
    linkImg: iconCurrencyExchangeUA,
    linkHTTP: '/currencyexchange',
  },  

  todolistPHP: {
    title: 'To-do list: NO JS (clear PHP)',
    desc: 'Add and edit tasks',
    linkImg: iconToDoListPHP,
    linkHTTP: 'https://php-task-1.ts.biz.ua/index.php?page=0&DESC=DESC&order=id',
  },

  todolist: {
    title: 'To-do list: SQL&PHP',
    desc: 'Language switching, adding, editing and deleting users, clients and tasks',
    linkImg: iconToDoList,
    linkHTTP: 'https://react-task-1-d596b.web.app/',
  },

  map: {
    title: 'Maps: three options',
    desc: 'Leaflet Map, HERE Map or Google Map',
    linkImg: iconMap,
    linkHTTP: '/map',
  },

  weather: {
    title: 'Weather forecast:',
    desc: 'Two API.openweathermap by geographic coordinates, Promise.all - current day & 5 day weather forecast',
    linkImg: iconWeather,
    linkHTTP: '/weather',
  },  
}


const MainContainer = (props) => {

  return (
    <div>
      <h4 className="text-center">React Portfolio</h4>
      <Carousel className={css.slider + " d-block mx-auto m-2"}>
        {
          Object.keys(data).map(keyName => (
            <Carousel.Item key={keyName}>
              <img
                className="d-block w-100 border border-dark"
                src={data[keyName].linkImg}
                alt={keyName + '_slide'}
              />
              <Carousel.Caption>
                <div className={css.description}>
                  <h3>{data[keyName].title}</h3>
                  <p>{data[keyName].desc}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>

      <hr />

      <div className="row">
        {
          Object.keys(data).map(keyName => (
            <div className="col-md-3 col-sm-4 col-6" key={keyName}>
              <div className={css.icons} key={keyName}>
                <Nav.Link href={data[keyName].linkHTTP} className={css.link}>
                  <h6>{data[keyName].title}</h6>
                  <img
                    className="w-100"
                    src={data[keyName].linkImg}
                    alt={keyName + '_icon'}
                  />
                </Nav.Link>
              </div>
            </div>
          ))}
      </div>
    </div >
  )

}

export default MainContainer;
