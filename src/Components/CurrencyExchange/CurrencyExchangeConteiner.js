import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';

import { gdPreloaserStatus } from '../../redux/commonReducer';
import { gdRateECB, gdBankData } from '../../redux/currencyExchangeReducer';

import CurrencyExchangeUAH from './CurrencyExchangeUAH';
import { compose } from 'redux';
import { connect } from 'react-redux';
import flagEuro from '../../assets/img/icon_europeanunion_16px.png';
import css from './CurrencyExchange.module.css';
import { Image, Form, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


class CurrencyExchangeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      baseECB: "USD",
      checkedECB: ["EUR", "RUB", "CAD", "PHP"],
      rateECB: {},

      calcVal: "EUR",
      calcMoney: null,

    };
  }

  getRateECB = () => {
    this.props.gdPreloaserStatus(true);
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ date: data.date });
        this.setState({ rateECB: data.rates });
        this.props.gdPreloaserStatus(false);
        this.props.gdRateECB(data.rates, this.state.checkedECB);
      });
  }

  componentDidMount() {
    this.getRateECB();
  }

  addChecked = (event) => {
    let arrECB = this.state.checkedECB;
    if (event.target.checked) {
      arrECB.push(event.target.id);
    } else {
      let pos = arrECB.indexOf(event.target.id);
      arrECB.splice(pos, 1);
    }
    this.setState({ checkedECB: arrECB });
    this.props.gdRateECB(this.state.rateECB, this.state.checkedECB);
  }

  setBaseCurrency = (event) => {
    this.setState({ baseECB: event.target.value });
  }

  calcRate = (event) => {
    event.preventDefault();
    this.setState({ calcMoney: event.target['carIn'].value });

  }

  setCarVal = (event) => {
    this.setState({ calcVal: event.target.value });
  }

  changeBanks = (banks, banksName) => {
    this.props.gdBankData([banks, banksName])
  }


  render() {   

    return (<div>
      <div className="row">
        <div className="col-5">
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue='ECB'>
              <ToggleButton value='ECB' variant="info" className='btn-sm'
                onClick={() => this.changeBanks('ECB', 'European Central Bank')}
              >EC Bank</ToggleButton>
              <ToggleButton value='UAH' variant="info" className='btn-sm'
                onClick={() => this.changeBanks('UAH', 'Ukrainian banks')}
              >UAH Banks</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        {/* https://www.countryflags.io/ */}
        <div className="col-2 text-center">
          {
            this.props.currencyExchangeData.bankData[0] === 'ECB'
              ?
              <img src="https://www.countryflags.io/EU/shiny/64.png" style={{marginTop: '-14px'}} alt='flag_EU'/>
              :
              <img src="https://www.countryflags.io/UA/shiny/64.png" alt='flag_UA' style={{marginTop: '-14px'}} />

                }
        </div>
        <div className="col-5">
          <h4 className="text-right">{this.props.currencyExchangeData.bankData[1]}</h4>
        </div>
      </div>

        {
          this.props.currencyExchangeData.bankData[0] === 'ECB'
            ?
            this.props.commonData === true
              ?
              < Preloader />
              :
              <div>

                <div className="row">

                  <div className="col-lg-3 col-md-3 col-sm-6 col-6 mt-1">
                    {this.state.date}
                  </div >
                  <div className="col-lg-3 col-md-3 col-sm-6 col-6 font-weight-bold mt-1">
                    Base currency&nbsp;{
                      <Image src={`https://fxtop.com/ico/${this.state.baseECB}.gif`} alt={`flag_${this.state.baseECB}`} />
                    }
                  </div >

                  <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-1">
                    {this.state.baseECB} = {(+this.state.rateECB[this.state.baseECB]).toFixed(2)} / USD
                  </div >

                  <div className="col-lg-3 col-md-2 col-sm-6 col-6 mt-1" style={{ marginBottom: '-20px' }}>
                    <Form onChange={this.setBaseCurrency}>
                      <Form.Group controlId="exampleForm.ControlSelect1" >
                        <Form.Control as="select" defaultValue={this.state.baseECB}>
                          {
                          Object.keys(this.state.rateECB).sort().map(keyName => <option key={keyName} name={keyName} defaultValue={keyName}>{keyName}</option>)
                          }
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </div >
                </div >

                <hr />

                <div className="row">
                  {this.state.checkedECB.map(keyName => (
                    <div key={keyName} className="col-lg-2 col-md-3 col-sm-3 col-4">
                      <div className={css.checkedECB}>
                        {
                          <Image src={`https://fxtop.com/ico/${keyName}.gif`} alt={`flag_${keyName}`} style={{ borderRadius: '5px' }} />
                        }
                        &nbsp;{keyName}&nbsp;<br />
                        <span className="font-weight-bold">
                          {((+this.state.rateECB[keyName]) / (+this.state.rateECB[this.state.baseECB])).toFixed(4)}
                        </span>
                        <br /> = 1 {this.state.baseECB}
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div className={css.checkedECB + " row py-1"}>
                  <div className="col-sm-2 col-12 font-weight-bold my-auto">I want&nbsp;
                  <img
                      src={'https://www.economicdata.ru/img/currency/' + this.state.calcVal + '/small-logo-' + this.state.calcVal + '.jpg'}
                      alt={this.state.calcVal}
                      className={css.val}
                    />
                  </div>

                  <div className="col-sm-6 col-12 my-auto mx-auto">
                    <form onSubmit={this.calcRate}>
                      <input type="number" defaultValue="150" name="carIn" style={{ width: '80px', margin: '7px 10px 0 0', padding: '4px 0 6px 2px' }} />
                      <select onInput={this.setCarVal} name="carVal" style={{ width: '65px', margin: '7px 10px 0 0', padding: '5px 0 8px 2px' }} defaultValue={this.state.calcVal}>
                        {this.state.checkedECB.sort().map((keyName) =>
                          <option key={keyName} value={keyName}>{keyName}</option>
                        )}
                      </select>
                      <input type="submit" value="Calculation" className="btn btn-secondary" style={{ margin: '7px 0' }} />
                    </form>
                  </div>
                  <div className="col-sm-4 col-12 my-auto">
                    <span className="font-weight-bold ">Result&nbsp;</span>
                    <img
                      src={'https://www.economicdata.ru/img/currency/' + this.state.baseECB + '/small-logo-' + this.state.baseECB + '.jpg'}
                      alt={this.state.baseECB}
                      className={css.val}
                    /><br />
                    {
                      this.state.calcMoney !== null
                        ?
                        // `${this.state.calcVal} ${this.state.calcMoney} = ${this.state.baseECB}\u00A0${(this.state.calcMoney / this.state.rateECB[this.state.calcVal] * this.state.rateECB[this.state.baseECB]).toFixed(2)}`

                        this.state.calcVal + '\u00A0' + this.state.calcMoney + '\u00A0= ' + this.state.baseECB +
                        '\u00A0' + ((+this.state.calcMoney) / (+this.state.rateECB[this.state.calcVal]) * (+this.state.rateECB[this.state.baseECB])).toFixed(2)
                        : ''
                    }

                  </div>
                </div>
                <hr />
                <div className="row">
                  {Object.keys(this.props.currencyExchangeData.ratesECB).sort().map(keyName => (
                    <div key={keyName} className="col-lg-2 col-md-3 col-sm-3 col-4">
                      {
                        keyName === "EUR"
                          ?
                          <Image src={flagEuro} alt={`flag_${keyName}`} />
                          :
                          <Image src={`https://www.ecb.europa.eu/shared/img/flags/${keyName}.gif`} alt={`flag_${keyName}`} />
                      }
                      &nbsp; &nbsp;
  
                <input onChange={this.addChecked} type="checkbox" id={keyName} name={keyName} defaultChecked={
                        this.props.currencyExchangeData.ratesECB[keyName]['checked'] === "checked" ? "checked" : ''
                      }
                      />&nbsp;<label htmlFor={keyName} ><span className={
                        this.props.currencyExchangeData.ratesECB[keyName]['checked'] === "checked" ? "font-weight-bold" : ''
                      }>{keyName}</span></label>
                    </div>
                  ))}
                </div>
              </div>

            :
            <CurrencyExchangeUAH />
        }
      </div>)
    }
  }
  
let mapStateToProps = (state) => {

  return {
        // связка с редакс стором - reduxStore,
        commonData: state.common.preloaserStatus,
      currencyExchangeData: state.currencyExchange
    }
  }
  
  export default compose(
  connect(mapStateToProps, {

        gdPreloaserStatus,

        gdRateECB,
        gdBankData

      }),
    
    )(CurrencyExchangeContainer);
    
    
    
