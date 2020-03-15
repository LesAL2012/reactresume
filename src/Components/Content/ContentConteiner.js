import React, { Suspense, lazy } from 'react';
import css from './Content.module.css';
//import MainContainer from '../Main/MainConteiner';
//import WeatherContainer from '../Weather/WeatherConteiner';
//import MapContainer from '../Map/MapConteiner';
//import CurrencyExchangeConteiner from '../CurrencyExchange/CurrencyExchangeConteiner';
import ReportsAgroTechnicConteiner from '../ReportsAgro/ReportsAgroTechnicConteiner';
import AdminPanelConteiner from '../AdminPanel/AdminPanelConteiner';
import AgroData from '../AgroData/AgroData';


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
    <div className="container" >
      <div className={css.content} >
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={MainContainer} />
            <Route exact path="/weather" render={() => <WeatherContainer />} />
            <Route exact path="/map" render={() => <MapContainer />} />
            <Route exact path="/currencyexchange" render={() => <CurrencyExchangeConteiner />} />
            <Route exact path="/reportsagromachinery" render={() => <ReportsAgroTechnicConteiner />} />
            <Route exact path="/admin" render={() => <AdminPanelConteiner />} />
            <Route exact path="/agrodata" render={() => <AgroData />} />


          </Switch>
        </Suspense>
      </div >
    </div >

  )

}

export default ContentContainer;
