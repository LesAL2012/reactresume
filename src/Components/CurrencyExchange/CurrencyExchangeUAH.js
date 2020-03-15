import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import { gdPreloaserStatus } from '../../redux/commonReducer';
import BYN from '../../assets/img/money_BYN.jpg';
import TWD from '../../assets/img/money_TWD.jpg';

import {
  gdFilterCurrencies,
  gdFilterBankBranch,
  gdFilterBankNames,
  gdFilterCity,
  gdBanksOfUkraine,
  gdBanksOfUkraineTable
} from '../../redux/currencyExchangeReducer';


import { compose } from 'redux';
import { connect } from 'react-redux';

import css from './CurrencyExchange.module.css';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup, Button, Table } from 'react-bootstrap';


class CurrencyExchangeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kostyl: 'https://cors-anywhere.herokuapp.com/',
      linkHTTP: 'https://resources.finance.ua/ua/public/currency-cash.json',
      localLang: 'UA',
      date: '',
      orgTypes: {},
      city: {},
      codCityFilter: ["7oiylpmiow8iy1smadi", "7oiylpmiow8iy1smadj"], //7oiylpmiow8iy1smadi: "Київ", 7oiylpmiow8iy1smadj: "Харків"
      currencies: [],
      banks: [],
      currenciesCountry: {},
      organizations: {},

      sort: 'title',
      sortTable: 'currencies',
      desc: null,
    };

  }

  getRateUAB = (link) => {
    this.props.gdPreloaserStatus(true);

    fetch(this.state.kostyl + link)
      .then(data => {
        return data.json(data);
      })
      .then(data => {

        this.setState({ date: data.date.slice(0, -15) });
        this.setState({ orgTypes: data.orgTypes });
        this.setState({ currenciesCountry: data.currencies });
        this.setState({ organizations: data.organizations });

        let currenciesAll = [];
        data.organizations.map(element => Object.keys(element.currencies).map(keyName => currenciesAll.push(keyName)));
        let currenciesSet = new Set(currenciesAll);
        let currencies = Array.from(currenciesSet).sort();
        this.setState({ currencies: currencies });

        let city = {};
        data.organizations.map(element => city[element.cityId] = data.cities[element.cityId]);
        this.setState({ city: city });

        let cityFilter = [];
        Object.keys(city).map(keyName => (
          this.state.codCityFilter.includes(keyName) === true
            ?
            cityFilter.push(city[keyName])
            : false
        ));
        this.props.gdFilterCity(cityFilter)

        let banksAll = [];
        data.organizations.map(element => banksAll.push(element.title));
        let banksSet = new Set(banksAll);
        let banks = Array.from(banksSet).sort();
        this.setState({ banks: banks });

        this.props.gdPreloaserStatus(false);

        this.setSelectedData();
        this.setSelectedTableData();

      });
  }

  setSelectedData = () => {
    let dataAll = this.state.organizations.slice();
    let arrData = [];
    let currenciesF = this.props.currencyExchangeData.filterCurrencies.slice();
    let bankF = this.props.currencyExchangeData.filterBankNames.slice();
    let cityF = this.props.currencyExchangeData.filterCities.slice();
    let bankBrancF = this.props.currencyExchangeData.filterBankBranch.slice();

    Object.keys(dataAll).forEach(keyName => {
      let arrCurrency = {};

      Object.keys(dataAll[keyName].currencies).map(keyCurr => (
        currenciesF.includes(keyCurr)
          ?
          arrCurrency[keyCurr] = dataAll[keyName].currencies[keyCurr]
          :
          false
      ))

      if (
        JSON.stringify(arrCurrency) !== '{}'
        &&
        bankF.includes(dataAll[keyName].title)
        &&
        cityF.includes(this.state.city[dataAll[keyName].cityId])
        &&
        bankBrancF.includes(dataAll[keyName].orgType)
      )
        arrData.push({
          bankBranch: this.state.orgTypes[dataAll[keyName].orgType],
          city: this.state.city[dataAll[keyName].cityId],
          title: dataAll[keyName].title,
          address: dataAll[keyName].address,
          phone: dataAll[keyName].phone,
          currencies: arrCurrency,
        })

    });
    this.props.gdBanksOfUkraine(arrData);
  }

  setSelectedTableData = () => {
    let arrData = [];
    let dataAll = this.state.organizations.slice();
    let currenciesF = this.props.currencyExchangeData.filterCurrencies.slice();
    let bankF = this.props.currencyExchangeData.filterBankNames.slice();
    let cityF = this.props.currencyExchangeData.filterCities.slice();
    let bankBrancF = this.props.currencyExchangeData.filterBankBranch.slice();

    Object.keys(dataAll).forEach(keyName => {

      Object.keys(dataAll[keyName].currencies).map(keyCurr => (
        currenciesF.includes(keyCurr)
          &&
          bankF.includes(dataAll[keyName].title)
          &&
          cityF.includes(this.state.city[dataAll[keyName].cityId])
          &&
          bankBrancF.includes(dataAll[keyName].orgType)
          ?
          arrData.push({
            currencies: keyCurr,
            ask: dataAll[keyName].currencies[keyCurr]['ask'],
            bid: dataAll[keyName].currencies[keyCurr]['bid'],
            bankBranch: this.state.orgTypes[dataAll[keyName].orgType],
            title: dataAll[keyName].title,
            city: this.state.city[dataAll[keyName].cityId],
            address: dataAll[keyName].address,
            phone: dataAll[keyName].phone,
          })
          :
          false
      ))
    });
    this.props.gdBanksOfUkraineTable(arrData);
  }

  componentDidMount() {
    this.getRateUAB(this.state.linkHTTP);
  }

  setLinkHTTP = (data, localLang) => {
    this.getRateUAB(data);
    this.setState({ linkHTTP: data });
    this.setState({ localLang: localLang });

  }

  bankBranch = (event, data) => {
    let arrBankBranch = this.props.currencyExchangeData.filterBankBranch.slice();

    if (event.target.className === 'btn-sm btn active btn-success') {
      let pos = arrBankBranch.indexOf(data);
      arrBankBranch.splice(pos, 1);
      this.props.gdFilterBankBranch(arrBankBranch)
    }

    if (event.target.className === 'btn-sm btn btn-success') {
      arrBankBranch.push(data);
      this.props.gdFilterBankBranch(arrBankBranch)
    }

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }

  addFilterCurrencies = (event) => {
    let arrFilterCurrencies = this.props.currencyExchangeData.filterCurrencies;
    if (event.target.checked) {
      arrFilterCurrencies.push(event.target.id);
    } else {
      let pos = arrFilterCurrencies.indexOf(event.target.id);
      arrFilterCurrencies.splice(pos, 1);
    }
    this.props.gdFilterCurrencies(arrFilterCurrencies);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }

  addFilterBankNames = (event) => {
    let arrFilterBankNames = this.props.currencyExchangeData.filterBankNames;

    if (event.target.checked) {
      arrFilterBankNames.push(event.target.id);
    } else {
      let pos = arrFilterBankNames.indexOf(event.target.id);
      arrFilterBankNames.splice(pos, 1);
    }
    this.props.gdFilterBankNames(arrFilterBankNames);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }

  addFilterCities = (event) => {
    let arrFilterCities = this.props.currencyExchangeData.filterCities;

    if (event.target.checked) {
      arrFilterCities.push(event.target.id);
    } else {
      let pos = arrFilterCities.indexOf(event.target.id);
      arrFilterCities.splice(pos, 1);
    }
    this.props.gdFilterCity(arrFilterCities);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }


  selectAllCurrencies = (data) => {
    this.props.gdFilterCurrencies(data);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }

  selectAllBankNames = (data) => {
    this.props.gdFilterBankNames(data);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }

  selectAllCities = (data) => {
    this.props.gdFilterCity(data);

    this.state.sort !== 'currencies'
      ?
      this.setSelectedData()
      :
      this.setSelectedTableData()
  }


  //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  setSort = (event, data) => {
    event.preventDefault();

    if (data !== 'currencies') {
      if (data !== this.state.sort) {
        this.setState({ sort: data });
        this.setState({ desc: null });
      } else if (data === this.state.sort && this.state.desc === null) {
        this.setState({ desc: 'desc' });
      } else { this.setState({ desc: null }); }
      this.setSelectedData();
    } else {
      if (data !== this.state.sort) {
        this.setState({ sort: data });
        this.setState({ desc: null });
      } else if (data === this.state.sort && this.state.desc === null) {
        this.setState({ desc: 'desc' });
      } else { this.setState({ desc: null }); }
      this.setSelectedTableData();
    }
  }

  setSortTable = (event, data) => {
    event.preventDefault();
    if (data !== this.state.sortTable) {
      this.setState({ sortTable: data });
      this.setState({ desc: null });
    } else if (data === this.state.sortTable && this.state.desc === null) {
      this.setState({ desc: 'desc' });
    } else { this.setState({ desc: null }); }

    this.setSelectedTableData();
  }


  render() {

    return (<>

      {
        this.props.commonData === true
          ?
          < Preloader />
          :
          <div>


            <div className={'text-center font-weight-bolder ' + css.marginY}>
              {this.state.date}
            </div>

            <div className='row mb-1'>

              <div className='col-lg-3 col-md-3 col-sm-5 col-5 '>
                <div><i className="fas fa-language"></i> Local language</div>
                <ButtonToolbar >
                  <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.localLang}>
                    <ToggleButton value='UA' variant="info" className='btn-sm'
                      onClick={() => this.setLinkHTTP('https://resources.finance.ua/ua/public/currency-cash.json', 'UA')}
                    >Ukrainian</ToggleButton>
                    <ToggleButton value='RU' variant="info" className='btn-sm'
                      onClick={() => this.setLinkHTTP('https://resources.finance.ua/ru/public/currency-cash.json', 'RU')}
                    >Russian</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              <div className='col-lg-3 col-md-4 col-sm-7 col-7 '>
                <div className='text-right'><i className="fas fa-sort-amount-up-alt"></i> Sort by ...</div>
                <ButtonToolbar className='float-right'>
                  <ToggleButtonGroup type="radio" name="options" >

                    <ToggleButton value={'Cities'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'city')}
                    ><i className="fas fa-city"></i> Cities
                        </ToggleButton>

                    <ToggleButton value={'Address'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'address')}
                    ><i className="fas fa-map-marker-alt"></i> Address
                        </ToggleButton>

                    <ToggleButton value={'Phone'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'phone')}
                    ><i className="fas fa-phone-volume"></i> Phone
                        </ToggleButton>

                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              <div className='col-lg-4 col-md-5 col-sm-8 col-12 '>
                <div className='text-right'><i className="fas fa-sort-amount-up-alt"></i> Sort by ...</div>
                <ButtonToolbar className='float-right'>
                  <ToggleButtonGroup type="radio" name="options" >

                    <ToggleButton value={'Bank Names'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'title')}
                    ><i className="fas fa-university"></i> Bank Names
                          </ToggleButton>

                    <ToggleButton value={'Branch'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'bankBranch')}
                    ><i className="fas fa-code-branch"></i> Branch
                          </ToggleButton>

                    <ToggleButton value={'Currencies'} variant="success" className='btn-sm'
                      onClick={(event) => this.setSort(event, 'currencies')}
                    ><i className="far fa-money-bill-alt"></i> Currencies
                        </ToggleButton>

                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              <div className='col-lg-2 col-md-4 col-sm-4 col-12 '>
                <div className='text-left'><i className="fas fa-toggle-on"></i> Include: On/Off</div>
                <ButtonToolbar className='float-left'>
                  <ToggleButtonGroup type="checkbox" name="options" defaultValue={[1]}>
                    <ToggleButton value={1} variant="success" className='btn-sm'
                      onClick={(event) => this.bankBranch(event, 1)}
                    >{this.state.orgTypes['1']}</ToggleButton>
                    <ToggleButton value={2} variant="success" className='btn-sm'
                      onClick={(event) => this.bankBranch(event, 2)}
                    >{this.state.orgTypes['2']}</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>
            </div>

            <div id="accordion" >
              <div className={"card " + css.bgAccordion}>
                <div className="" id="headingOne">
                  <div className="row " >
                    <div className="col-4 " >
                      <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fas fa-city"></i> Cities
                      </button>
                    </div>
                    <div className="col-8  " >
                      <ButtonToolbar className="mt-1 mr-3 float-right">
                        <ToggleButtonGroup type="radio" name="options">
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllCities(Object.keys(this.state.city).map(keyName => this.state.city[keyName]).slice())}
                          >Select all</ToggleButton>
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllCities([])}
                          >Deselect all</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                    </div>
                  </div>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <div className={css.bgFoneLight}>
                      <div className="row">
                        {Object.keys(this.state.city).map(keyName =>
                          <div key={this.state.city[keyName]} className={"col-lg-2 col-md-3 col-sm-4 col-6 " + css.marginY}>
                            <input key={this.state.city[keyName]}
                              onChange={this.addFilterCities}
                              type="checkbox" id={this.state.city[keyName]}
                              checked=
                              {
                                this.props.currencyExchangeData.filterCities.includes(this.state.city[keyName]) === true
                              }
                            />
                            &nbsp;<label htmlFor={this.state.city[keyName]} ><span className={
                              this.props.currencyExchangeData.filterCities.includes(this.state.city[keyName]) === true ? "font-weight-bold" : ''
                            }>{this.state.city[keyName]}</span></label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"card " + css.bgAccordion}>
                <div className="" id="headingTwo">
                  <div className="row " >
                    <div className="col-4 " >
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fas fa-university"></i> Bank Names
                    </button>
                    </div>
                    <div className="col-8  " >
                      <ButtonToolbar className="mt-1 mr-3 float-right">
                        <ToggleButtonGroup type="radio" name="options">
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllBankNames(this.state.banks.slice())}
                          >Select all</ToggleButton>
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllBankNames([])}
                          >Deselect all</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                    </div>
                  </div>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                    <div className={css.bgFoneLight}>
                      <div className="row ">
                        {this.state.banks.map(element => (
                          <div key={element} className={"col-lg-3 col-md-4 col-sm-4 col-6 " + css.marginY}>
                            <input key={element}
                              onChange={this.addFilterBankNames}
                              type="checkbox" id={element}
                              checked=
                              {
                                this.props.currencyExchangeData.filterBankNames.includes(element) === true
                              }
                            />
                            &nbsp;<label htmlFor={element}  ><span className={
                              this.props.currencyExchangeData.filterBankNames.includes(element) === true ? "font-weight-bold" : ''
                            }>{element}</span></label>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"card " + css.bgAccordion}>
                <div className="" id="headingThree">
                  <div className="row " >
                    <div className="col-4 " >
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <i className="far fa-money-bill-alt"></i> Currencies
                    </button>
                    </div>
                    <div className="col-8  " >
                      <ButtonToolbar className="mt-1 mr-3 float-right">
                        <ToggleButtonGroup type="radio" name="options">
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllCurrencies(this.state.currencies.slice())}
                          >Select all</ToggleButton>
                          <ToggleButton variant="info" className='btn-sm'
                            onClick={() => this.selectAllCurrencies([])}
                          >Deselect all</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>

                    </div>
                  </div>

                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                  <div className="card-body">
                    <div className={css.bgFoneLight}>
                      <div className="row">
                        {this.state.currencies.map(element => (
                          <div key={element} className="col-sm-6 col-12 ">
                            {/* https://www.cssscript.com/national-currency-flags/ */}
                            <div className={'currency-flag currency-flag-' + element.toLowerCase() + ' currency-flag-lg'} style={{ margin: '0 4px -4px 0' }}></div>
                            <input key={element}
                              onChange={this.addFilterCurrencies} type="checkbox" id={element}
                              checked=
                              {
                                this.props.currencyExchangeData.filterCurrencies.includes(element) === true
                              }
                            />
                            &nbsp;<label htmlFor={element} ><span className={
                              this.props.currencyExchangeData.filterCurrencies.includes(element) === true ? "font-weight-bold" : ''
                            }>{element} - {this.state.currenciesCountry[element]}</span></label>
                            {
                              element === 'TWD'
                                ?
                                <img
                                  src={TWD}
                                  alt={'logo_' + element} style={{ height: '30px', marginRight: '20px', textAlign: 'right' }} className="float-right" />
                                :

                                element === 'BYN' ?
                                  <img
                                    src={BYN}
                                    alt={'logo_' + element} style={{ height: '30px', marginRight: '20px', textAlign: 'right' }} className="float-right" />
                                  :
                                  <img
                                    src={'https://www.economicdata.ru/img/currency/' + element + '/small-logo-' + element + '.jpg'}
                                    alt={'logo_' + element} style={{ height: '30px', marginRight: '20px', textAlign: 'right' }} className="float-right" />
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {
              this.state.sort === 'currencies' ?
                <div className="">
                  <Table className={css.tableText} striped bordered hover size="sm" style={{ background: 'rgb(233, 235, 215)' }} >
                    <thead className='text-center bg-success'>
                      <tr >
                        <th onClick={(event) => this.setSortTable(event, 'currencies')}                        >
                          <Button className='w-100' variant="success">
                            <i className="far fa-money-bill-alt"></i>
                          </Button>
                        </th>
                        <th onClick={(event) => this.setSortTable(event, 'ask')}                        >
                          <Button className='w-100' variant="success">
                            Ask
                          </Button>
                        </th>
                        <th onClick={(event) => this.setSortTable(event, 'bid')}                        >
                          <Button className='w-100' variant="success">
                            Bid
                          </Button>
                        </th>
                        <th className={css.displayNone} onClick={(event) => this.setSortTable(event, 'bankBranch')}                        >
                          <Button className='w-100' variant="success">
                            <i className="fas fa-code-branch">                   </i>
                          </Button>

                        </th>
                        <th onClick={(event) => this.setSortTable(event, 'title')}                        >
                          <Button className='w-100' variant="success">
                            <i className="fas fa-university"></i>
                          </Button>
                        </th>
                        <th
                          onClick={(event) => this.setSortTable(event, 'city')}                        >
                          <Button className='w-100' variant="success">
                            <i className="fas fa-city"></i>
                          </Button>
                        </th>
                        <th className={css.displayNone}
                          onClick={(event) => this.setSortTable(event, 'address')}>
                          <Button className='w-100' variant="success">
                            <i className="fas fa-map-marker-alt"></i>
                          </Button>
                        </th>
                        <th className={css.displayNone} onClick={(event) => this.setSortTable(event, 'phone')}>         <Button className='w-100' variant="success">
                          <i className="fas fa-phone-volume"></i>
                        </Button>
                        </th>

                      </tr>
                    </thead>
                    <tbody >

                      {
                        this.props.currencyExchangeData.banksOfUkraineTable[0] !== undefined
                          &&
                          this.props.currencyExchangeData.banksOfUkraineTable[0]['ask'] !== undefined
                          ?
                          this.props.currencyExchangeData.banksOfUkraineTable
                            .sort(this.compareValues(this.state.sortTable, this.state.desc))
                            .map(element => (
                              <tr key={element.currencies + element.address + element.phone} >
                                <td style={{ border: '1px solid #17a2b8' }}>{element.currencies}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.ask}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.bid}</td>
                                <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.bankBranch}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.title}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.city}</td>
                                <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.address}</td>
                                <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.phone}</td>
                              </tr>
                            ))
                          :
                          <tr className='text-center'>
                            <td style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>-</td>
                            <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>-</td>
                          </tr>
                      }

                    </tbody>
                  </Table>


                </div>
                :

                Object.keys(this.props.currencyExchangeData.banksOfUkraine
                  .sort(this.compareValues(this.state.sort, this.state.desc)))
                  .map(keyName => (
                    <div key={keyName + 'row'}>

                      <div key={keyName} className="row ">

                        {
                          this.state.sort === 'title'
                            ?
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                              <b>{this.props.currencyExchangeData.banksOfUkraine[keyName].title}</b> - {this.props.currencyExchangeData.banksOfUkraine[keyName].bankBranch}
                              <br />
                              {this.props.currencyExchangeData.banksOfUkraine[keyName].city} - {this.props.currencyExchangeData.banksOfUkraine[keyName].address}
                              <br />
                              tel:&nbsp;
                                {!this.props.currencyExchangeData.banksOfUkraine[keyName].phone ? '' :

                                this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -6) === '0800'
                                  ?
                                  '0800-' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-6, -3) +
                                  '-' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-3)
                                  :
                                  '(' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -7) +
                                  ') ' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-7, -4) +
                                  '-' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-4, -2) +
                                  '-' +
                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-2)
                              }
                            </div>
                            :
                            this.state.sort === 'bankBranch' ?
                              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                {this.props.currencyExchangeData.banksOfUkraine[keyName].title} - <b>{this.props.currencyExchangeData.banksOfUkraine[keyName].bankBranch}</b>
                                <br />
                                {this.props.currencyExchangeData.banksOfUkraine[keyName].city} - {this.props.currencyExchangeData.banksOfUkraine[keyName].address}
                                <br />
                                tel:&nbsp;
                                  {!this.props.currencyExchangeData.banksOfUkraine[keyName].phone ? '' :

                                  this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -6) === '0800'
                                    ?
                                    '0800-' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-6, -3) +
                                    '-' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-3)
                                    :
                                    '(' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -7) +
                                    ') ' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-7, -4) +
                                    '-' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-4, -2) +
                                    '-' +
                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-2)
                                }
                              </div>
                              :
                              this.state.sort === 'city' ?
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                  {this.props.currencyExchangeData.banksOfUkraine[keyName].title} - {this.props.currencyExchangeData.banksOfUkraine[keyName].bankBranch}
                                  <br />
                                  <b>{this.props.currencyExchangeData.banksOfUkraine[keyName].city}</b> - {this.props.currencyExchangeData.banksOfUkraine[keyName].address}
                                  <br />
                                  tel:&nbsp;
                                    {!this.props.currencyExchangeData.banksOfUkraine[keyName].phone ? '' :

                                    this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -6) === '0800'
                                      ?
                                      '0800-' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-6, -3) +
                                      '-' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-3)
                                      :
                                      '(' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -7) +
                                      ') ' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-7, -4) +
                                      '-' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-4, -2) +
                                      '-' +
                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-2)
                                  }
                                </div>
                                :
                                this.state.sort === 'address' ?
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                    {this.props.currencyExchangeData.banksOfUkraine[keyName].title} - {this.props.currencyExchangeData.banksOfUkraine[keyName].bankBranch}
                                    <br />
                                    {this.props.currencyExchangeData.banksOfUkraine[keyName].city} - <b>{this.props.currencyExchangeData.banksOfUkraine[keyName].address}</b>
                                    <br />
                                    tel:&nbsp;
                                      {!this.props.currencyExchangeData.banksOfUkraine[keyName].phone ? '' :

                                      this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -6) === '0800'
                                        ?
                                        '0800-' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-6, -3) +
                                        '-' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-3)
                                        :
                                        '(' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -7) +
                                        ') ' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-7, -4) +
                                        '-' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-4, -2) +
                                        '-' +
                                        this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-2)
                                    }
                                  </div>
                                  :
                                  this.state.sort === 'phone' ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                      {this.props.currencyExchangeData.banksOfUkraine[keyName].title} - {this.props.currencyExchangeData.banksOfUkraine[keyName].bankBranch}
                                      <br />
                                      {this.props.currencyExchangeData.banksOfUkraine[keyName].city} - {this.props.currencyExchangeData.banksOfUkraine[keyName].address}
                                      <br />
                                      tel:&nbsp;<b>
                                        {!this.props.currencyExchangeData.banksOfUkraine[keyName].phone ? '' :

                                          this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -6) === '0800'
                                            ?
                                            '0800-' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-6, -3) +
                                            '-' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-3)
                                            :
                                            '(' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(0, -7) +
                                            ') ' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-7, -4) +
                                            '-' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-4, -2) +
                                            '-' +
                                            this.props.currencyExchangeData.banksOfUkraine[keyName].phone.slice(-2)
                                        }
                                      </b>
                                    </div>
                                    : false
                        }
                        {this.props.currencyExchangeData.banksOfUkraine[keyName].currencies
                          ?
                          <div className="col-lg-6 col-md-6 col-sm-8 col-12">
                            {Object.keys(this.props.currencyExchangeData.banksOfUkraine[keyName].currencies).map(carrName => (
                              <div key={carrName} className="row ">

                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                  <b>{carrName}:</b>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                  ask - {this.props.currencyExchangeData.banksOfUkraine[keyName].currencies[carrName].ask};
                              </div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                  bid - {this.props.currencyExchangeData.banksOfUkraine[keyName].currencies[carrName].bid}
                                </div>
                              </div>
                            ))}
                          </div>
                          : false
                        }

                      </div>

                      <hr />
                    </div>
                  ))
            }

          </div>
      }

    </>)
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

    gdFilterCurrencies,
    gdFilterBankBranch,
    gdFilterBankNames,
    gdFilterCity,
    gdBanksOfUkraine,
    gdBanksOfUkraineTable

  }),

)(CurrencyExchangeContainer);
