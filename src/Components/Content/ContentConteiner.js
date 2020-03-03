import React, { Suspense, lazy } from 'react';
import css from './Content.module.css';
//import MainContainer from '../Main/MainConteiner';
//import WeatherContainer from '../Weather/WeatherConteiner';
//import MapContainer from '../Map/MapConteiner';
//import CurrencyExchangeConteiner from '../CurrencyExchange/CurrencyExchangeConteiner';

import {
  Switch,
  Route
} from "react-router-dom";

const MainContainer = lazy(() => import('../Main/MainConteiner'));
const WeatherContainer = lazy(() => import('../Weather/WeatherConteiner'));
const MapContainer = lazy(() => import('../Map/MapConteiner'));
const CurrencyExchangeConteiner = lazy(() => import('../CurrencyExchange/CurrencyExchangeConteiner'));

const ContentContainer = (props) => {

  return (
    <div className={css.content} >
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/weather" render={() => <WeatherContainer />} />
          <Route exact path="/map" render={() => <MapContainer />} />
          <Route exact path="/currencyexchange" render={() => <CurrencyExchangeConteiner />} />


          {/* <Route exact path="/blue" component={ContentBlue} />
          <Route exact path="/profile/:userId" render={() => <ContentProfileContainer />} /> */}
        </Switch>
      </Suspense>
    </div >
  )

}

export default ContentContainer;
