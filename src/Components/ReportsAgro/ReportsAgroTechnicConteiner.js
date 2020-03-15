import React from 'react';
import LogIn from '../LogInOut/LogIn';

import { gdAuth, } from '../../redux/commonReducer';
import { gdTecnicData, gdUpdateTecnicDataWhere } from '../../redux/techReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import css from './ReportsAgro.module.css';


class ReportsAgroTechnicConteiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTable: 'block',
      displayModalWindow: 'none',
      idModal: '',
      brand_modelModal: '',
      NgovModal: '',
      NinvModal: '',
      textDefault: '',
      localFilter: {
        status: false,
        park: false,
        ent: false,
        types: false,
        brand_model: false,
        percent: false,
      },
      tableAdminPark: 'none',
      tableAdminEnt: 'none',
      tableAdminTypes: 'none',
      tableAdminBrand_model: 'none',
      tableAdminPercent: 'none',
      tableAdminCurator: 'none',
      tableAdminIconFilter: 'block',
    };

  }

  componentDidMount() {
    this.props.gdAuth();
    this.getReportAllData();
  }

  getReportAllData = () => {
    let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
    let name = ls.name;
    let hash = ls.hash;
    let rights = ls.rights;
    this.props.gdTecnicData(name, hash, rights, 'getReportAll');
  }

  setWhere = (event, id, column) => {
    let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
    let name = ls.name;
    let hash = ls.hash;
    let rights = ls.rights;
    let action = 'insertToReportWhere';

    let table = 'react_report_operative_tech_all';

    let where_id = id;

    if (column === 'readiness') {
      let data = event.target.value;
      this.props.gdUpdateTecnicDataWhere(name, hash, rights, action, table, data, column, where_id);
    } else if (column === 'comment') {
      let data = event.target['textArea'].value;
      this.props.gdUpdateTecnicDataWhere(name, hash, rights, action, table, data, column, where_id);

      this.deactivateEditMode();
    }
  }

  activateEditMode = (id, brand_model, Ngov, Ninv, textDefault) => {
    this.setState({ displayTable: 'none' });
    this.setState({ displayModalWindow: 'block' });

    this.setState({ idModal: id });
    this.setState({ brand_modelModal: brand_model });
    this.setState({ NgovModal: Ngov });
    this.setState({ NinvModal: Ninv });
    this.setState({ textDefault: textDefault });


  }

  deactivateEditMode = () => {
    this.setState({ displayTable: 'block' });
    this.setState({ displayModalWindow: 'none' });

    this.setState({ idModal: '' });
    this.setState({ brand_modelModal: '' });
    this.setState({ NgovModal: '' });
    this.setState({ NinvModal: '' });
    this.setState({ textDefault: '' });
  }

  setLocalFilter = (event, item) => {
    if (event.target.value === "ALL") {
      this.setState({
        localFilter: {
          status: false,
          park: false,
          ent: false,
          types: false,
          brand_model: false,
          percent: false,
          curator: false,
        }
      });
    } else if (item === 'percent') {
      this.setState({
        localFilter: {
          status: true,
          park: false,
          ent: false,
          types: false,
          brand_model: false,
          percent: event.target.value,
          curator: false,
        }
      })
    } else if (item === 'park') {
      this.setState({
        localFilter: {
          status: true,
          park: event.target.value,
          ent: false,
          types: false,
          brand_model: false,
          percent: false,
          curator: false,
        }
      })
    } else if (item === 'ent') {
      this.setState({
        localFilter: {
          status: true,
          park: false,
          ent: event.target.value,
          types: false,
          brand_model: false,
          percent: false,
          curator: false,
        }
      })
    } else if (item === 'types') {
      this.setState({
        localFilter: {
          status: true,
          park: false,
          ent: false,
          types: event.target.value,
          brand_model: false,
          percent: false,
          curator: false,
        }
      })
    } else if (item === 'brand_model') {
      this.setState({
        localFilter: {
          status: true,
          park: false,
          ent: false,
          types: false,
          brand_model: event.target.value,
          percent: false,
          curator: false,
        }
      })
    } else if (item === 'curator') {
      this.setState({
        localFilter: {
          status: true,
          park: false,
          ent: false,
          types: false,
          brand_model: false,
          percent: false,
          curator: event.target.value,
        }
      })
    }

    this.setState({ tableAdminPark: 'none' });
    this.setState({ tableAdminEnt: 'none' });
    this.setState({ tableAdminTypes: 'none' });
    this.setState({ tableAdminBrand_model: 'none' });
    this.setState({ tableAdminPercent: 'none' });
    this.setState({ tableAdminCurator: 'none' });
  }

  showFilterAdminTable(item) {
    if (item === 'park') {
      this.setState({ tableAdminPark: 'block' });
      this.setState({ tableAdminEnt: 'none' });
      this.setState({ tableAdminTypes: 'none' });
      this.setState({ tableAdminBrand_model: 'none' });
      this.setState({ tableAdminPercent: 'none' });
      this.setState({ tableAdminCurator: 'none' });
    } else if (item === 'ent') {
      this.setState({ tableAdminPark: 'none' });
      this.setState({ tableAdminEnt: 'block' });
      this.setState({ tableAdminTypes: 'none' });
      this.setState({ tableAdminBrand_model: 'none' });
      this.setState({ tableAdminPercent: 'none' });
      this.setState({ tableAdminCurator: 'none' });
    } else if (item === 'types') {
      this.setState({ tableAdminPark: 'none' });
      this.setState({ tableAdminEnt: 'none' });
      this.setState({ tableAdminTypes: 'block' });
      this.setState({ tableAdminBrand_model: 'none' });
      this.setState({ tableAdminPercent: 'none' });
      this.setState({ tableAdminCurator: 'none' });
    } else if (item === 'brand_model') {
      this.setState({ tableAdminPark: 'none' });
      this.setState({ tableAdminEnt: 'none' });
      this.setState({ tableAdminTypes: 'none' });
      this.setState({ tableAdminBrand_model: 'block' });
      this.setState({ tableAdminPercent: 'none' });
      this.setState({ tableAdminCurator: 'none' });
    } else if (item === 'percent') {
      this.setState({ tableAdminPark: 'none' });
      this.setState({ tableAdminEnt: 'none' });
      this.setState({ tableAdminTypes: 'none' });
      this.setState({ tableAdminBrand_model: 'none' });
      this.setState({ tableAdminPercent: 'block' });
      this.setState({ tableAdminCurator: 'none' });
    }
    else if (item === 'curator') {
      this.setState({ tableAdminPark: 'none' });
      this.setState({ tableAdminEnt: 'none' });
      this.setState({ tableAdminTypes: 'none' });
      this.setState({ tableAdminBrand_model: 'none' });
      this.setState({ tableAdminPercent: 'none' });
      this.setState({ tableAdminCurator: 'block' });
    }
  }

  render() {
    //console.log(this.props.techData)

    //console.log(this.state.localFilter)
    //console.log(this.props.techData.reportOperativeAllFilter)

    //console.log(this.props.commonData.authLogin)

    //console.log(JSON.parse(localStorage.getItem('reactUserLogin')).name)
    return <>      {

      this.props.commonData.authLogin === true
        ?
        <div >
          {JSON.stringify(this.props.techData.reportOperativeAll) !== '[]'
            ?
            JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'admin'
              ?
              <div className="adminRights">
                <Table style={{ display: this.state.displayTable, border: 'none' }} striped bordered hover size="sm" className={css.tableTextA}>
                  <thead className="text-center">
                    <tr >
                      <th onClick={() => this.showFilterAdminTable('park')} className={"align-middle " + css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>
                        Park <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminPark }}
                          onChange={(event) => this.setLocalFilter(event, 'park')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.park.map(element =>
                              <option key={element}>{element}</option>
                            )
                          }
                        </select>
                      </th>
                      <th onClick={() => this.showFilterAdminTable('ent')} className="align-middle" style={{ border: '1px solid #17a2b8' }}>
                        Enterprise <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminEnt }}
                          onChange={(event) => this.setLocalFilter(event, 'ent')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.ent.map(element =>
                              <option key={element} >{element}</option>
                            )
                          }
                        </select>
                      </th>
                      <th onClick={() => this.showFilterAdminTable('types')} className={"align-middle " + css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>
                        Type <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminTypes }}
                          onChange={(event) => this.setLocalFilter(event, 'types')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.types.map(element =>
                              <option key={element} >{element}</option>
                            )
                          }
                        </select>
                      </th>
                      <th onClick={() => this.showFilterAdminTable('brand_model')} className="align-middle" style={{ border: '1px solid #17a2b8' }}>
                        Brand/Model <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminBrand_model }}
                          onChange={(event) => this.setLocalFilter(event, 'brand_model')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.brand_model.map(element =>
                              <option key={element} >{element}</option>
                            )
                          }
                        </select>
                      </th>
                      <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>N gov</th>
                      <th className={"align-middle " + css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>N inv</th>
                      <th onClick={() => this.showFilterAdminTable('percent')} className="align-middle" style={{ border: '1px solid #17a2b8' }}>
                        % <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminPercent }}
                          onChange={(event) => this.setLocalFilter(event, 'percent')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.percent.map(element =>
                              <option key={element} >{element}</option>
                            )
                          }
                        </select>
                      </th>
                      <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>Name</th>
                      <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>Comment</th>
                      <th className={"align-middle " + css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>Date of change</th>
                      <th onClick={() => this.showFilterAdminTable('curator')} className={"align-middle " + css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>
                        Curator <i className="fas fa-filter"></i><br />
                        <select style={{ display: this.state.tableAdminCurator }}
                          onChange={(event) => this.setLocalFilter(event, 'curator')}
                          defaultValue={"ALL"}
                        >
                          <option >ALL</option>
                          {
                            this.props.techData.reportOperativeAllFilter.curator.map(element =>
                              <option key={element} >{element}</option>
                            )
                          }
                        </select>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.localFilter.status === false
                        ?
                        this.props.techData.reportOperativeAll.map(element =>

                          element.percent < 25
                            ?
                            <tr key={element.id} style={{ color: 'brown' }}>
                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                              <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                {new Date(element.date * 1000).toLocaleDateString()}<br />
                                {new Date(element.date * 1000).toLocaleTimeString()}
                              </td>

                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                            </tr>
                            :
                            element.percent >= 25 && element.percent < 75
                              ?
                              <tr key={element.id}>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                  {new Date(element.date * 1000).toLocaleDateString()}<br />
                                  {new Date(element.date * 1000).toLocaleTimeString()}
                                </td>

                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                              </tr>
                              :
                              <tr key={element.id} style={{ color: 'blue' }}>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                  {new Date(element.date * 1000).toLocaleDateString()}<br />
                                  {new Date(element.date * 1000).toLocaleTimeString()}
                                </td>

                                <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                              </tr>

                        )
                        :

                        this.state.localFilter.park
                          ?
                          this.props.techData.reportOperativeAll.map(element =>
                            element.park === this.state.localFilter.park
                              ?
                              element.percent < 25
                                ?
                                <tr key={element.id} style={{ color: 'brown' }}>
                                  <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                  <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                  <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                  <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                    {new Date(element.date * 1000).toLocaleDateString()}<br />
                                    {new Date(element.date * 1000).toLocaleTimeString()}
                                  </td>

                                  <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                </tr>
                                :
                                element.percent >= 25 && element.percent < 75
                                  ?
                                  <tr key={element.id}>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                    <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                      {new Date(element.date * 1000).toLocaleDateString()}<br />
                                      {new Date(element.date * 1000).toLocaleTimeString()}
                                    </td>

                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                  </tr>
                                  :
                                  <tr key={element.id} style={{ color: 'blue' }}>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                    <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                      {new Date(element.date * 1000).toLocaleDateString()}<br />
                                      {new Date(element.date * 1000).toLocaleTimeString()}
                                    </td>

                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                  </tr>
                              :
                              false
                          )
                          :

                          this.state.localFilter.ent
                            ?
                            this.props.techData.reportOperativeAll.map(element =>
                              element.ent === this.state.localFilter.ent
                                ?
                                element.percent < 25
                                  ?
                                  <tr key={element.id} style={{ color: 'brown' }}>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                    <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                      {new Date(element.date * 1000).toLocaleDateString()}<br />
                                      {new Date(element.date * 1000).toLocaleTimeString()}
                                    </td>

                                    <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                  </tr>
                                  :
                                  element.percent >= 25 && element.percent < 75
                                    ?
                                    <tr key={element.id}>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                      <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                        {new Date(element.date * 1000).toLocaleDateString()}<br />
                                        {new Date(element.date * 1000).toLocaleTimeString()}
                                      </td>

                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                    </tr>
                                    :
                                    <tr key={element.id} style={{ color: 'blue' }}>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                      <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                        {new Date(element.date * 1000).toLocaleDateString()}<br />
                                        {new Date(element.date * 1000).toLocaleTimeString()}
                                      </td>

                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                    </tr>
                                :
                                false
                            )
                            :

                            this.state.localFilter.types
                              ?
                              this.props.techData.reportOperativeAll.map(element =>
                                element.types === this.state.localFilter.types
                                  ?
                                  element.percent < 25
                                    ?
                                    <tr key={element.id} style={{ color: 'brown' }}>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                      <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                      <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                        {new Date(element.date * 1000).toLocaleDateString()}<br />
                                        {new Date(element.date * 1000).toLocaleTimeString()}
                                      </td>

                                      <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                    </tr>
                                    :
                                    element.percent >= 25 && element.percent < 75
                                      ?
                                      <tr key={element.id}>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                        <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                          {new Date(element.date * 1000).toLocaleDateString()}<br />
                                          {new Date(element.date * 1000).toLocaleTimeString()}
                                        </td>

                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                      </tr>
                                      :
                                      <tr key={element.id} style={{ color: 'blue' }}>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                        <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                          {new Date(element.date * 1000).toLocaleDateString()}<br />
                                          {new Date(element.date * 1000).toLocaleTimeString()}
                                        </td>

                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                      </tr>
                                  :
                                  false
                              )
                              :

                              this.state.localFilter.brand_model
                                ?
                                this.props.techData.reportOperativeAll.map(element =>
                                  element.brand_model === this.state.localFilter.brand_model
                                    ?
                                    element.percent < 25
                                      ?
                                      <tr key={element.id} style={{ color: 'brown' }}>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                        <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                        <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                          {new Date(element.date * 1000).toLocaleDateString()}<br />
                                          {new Date(element.date * 1000).toLocaleTimeString()}
                                        </td>

                                        <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                      </tr>
                                      :
                                      element.percent >= 25 && element.percent < 75
                                        ?
                                        <tr key={element.id}>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                          <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                            {new Date(element.date * 1000).toLocaleDateString()}<br />
                                            {new Date(element.date * 1000).toLocaleTimeString()}
                                          </td>

                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                        </tr>
                                        :
                                        <tr key={element.id} style={{ color: 'blue' }}>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                          <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                            {new Date(element.date * 1000).toLocaleDateString()}<br />
                                            {new Date(element.date * 1000).toLocaleTimeString()}
                                          </td>

                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                        </tr>
                                    :
                                    false
                                )
                                :

                                this.state.localFilter.percent
                                  ?
                                  this.props.techData.reportOperativeAll.map(element =>
                                    element.percent === this.state.localFilter.percent
                                      ?
                                      element.percent < 25
                                        ?
                                        <tr key={element.id} style={{ color: 'brown' }}>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                          <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                          <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                            {new Date(element.date * 1000).toLocaleDateString()}<br />
                                            {new Date(element.date * 1000).toLocaleTimeString()}
                                          </td>

                                          <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                        </tr>
                                        :
                                        element.percent >= 25 && element.percent < 75
                                          ?
                                          <tr key={element.id}>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                            <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                              {new Date(element.date * 1000).toLocaleDateString()}<br />
                                              {new Date(element.date * 1000).toLocaleTimeString()}
                                            </td>

                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                          </tr>
                                          :
                                          <tr key={element.id} style={{ color: 'blue' }}>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                            <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                              {new Date(element.date * 1000).toLocaleDateString()}<br />
                                              {new Date(element.date * 1000).toLocaleTimeString()}
                                            </td>

                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                          </tr>
                                      :



                                      false
                                  )
                                  :

                                  this.state.localFilter.curator
                                    ?
                                    this.props.techData.reportOperativeAll.map(element =>
                                      element.curator === this.state.localFilter.curator
                                        ?
                                        element.percent < 25
                                          ?
                                          <tr key={element.id} style={{ color: 'brown' }}>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                            <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                            <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                              {new Date(element.date * 1000).toLocaleDateString()}<br />
                                              {new Date(element.date * 1000).toLocaleTimeString()}
                                            </td>

                                            <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                          </tr>
                                          :
                                          element.percent >= 25 && element.percent < 75
                                            ?
                                            <tr key={element.id}>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                              <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                                {new Date(element.date * 1000).toLocaleDateString()}<br />
                                                {new Date(element.date * 1000).toLocaleTimeString()}
                                              </td>

                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                            </tr>
                                            :
                                            <tr key={element.id} style={{ color: 'blue' }}>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.park}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.types}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.user}</td>
                                              <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>

                                              <td className={css.displayNoneA + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                                {new Date(element.date * 1000).toLocaleDateString()}<br />
                                                {new Date(element.date * 1000).toLocaleTimeString()}
                                              </td>

                                              <td className={css.displayNoneA} style={{ border: '1px solid #17a2b8' }}>{element.curator}</td>
                                            </tr>
                                        :
                                        false
                                    )
                                    :

                                    false


                    }

                  </tbody>
                </Table>

              </div>
              :
              JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'mechanik'
                ?
                <div className="mechanikRights">

                  Mechanik: <b>{this.props.techData.reportOperativeAll[0].user}</b>
                  <Table className={css.tableText} style={{ display: this.state.displayTable, border: 'none' }} striped bordered hover size="sm">
                    <thead className="text-center">
                      <tr >
                        <th className={css.displayNone + " align-middle"} style={{ border: '1px solid #17a2b8' }}>Enterprise</th>
                        <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>Brand/Model</th>
                        <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>N gov</th>
                        <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>N inv</th>
                        <th className="align-middle" style={{ border: '1px solid #17a2b8' }}>%</th>
                        <th className="align-middle" style={{ color: 'brown', border: '1px solid #17a2b8' }} >2 <i className="fas fa-mouse"></i> (touch & move) to Comment</th>
                        <th className={css.displayNone + " align-middle"} style={{ border: '1px solid #17a2b8' }}>Date of change</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        this.props.techData.reportOperativeAll.map(element =>

                          element.percent < 25
                            ?
                            <tr key={element.id} style={{ color: 'brown' }}>
                              <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                              <td style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>

                              {
                                JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                  ?
                                  <td style={{ border: '1px solid #17a2b8' }}>
                                    <select id={element.id} onChange={(event) => this.setWhere(event, element.id, 'readiness')} defaultValue={element.percent}>
                                      <option >0</option>
                                      <option >15</option>
                                      <option >30</option>
                                      <option >50</option>
                                      <option >70</option>
                                      <option >80</option>
                                      <option >90</option>
                                      <option >95</option>
                                      <option >100</option>
                                    </select>
                                  </td>
                                  :
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                              }

                              {
                                JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                  ?
                                  <td

                                    onDoubleClick={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                    onTouchMove={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                    style={{ border: '1px solid #17a2b8' }}>
                                    {element.comment}

                                  </td>
                                  :
                                  <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>
                              }
                              <td className={css.displayNone + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                {new Date(element.date * 1000).toLocaleDateString()}<br />
                                {new Date(element.date * 1000).toLocaleTimeString()}
                              </td>
                            </tr>
                            :
                            element.percent >= 25 && element.percent < 75
                              ?
                              <tr key={element.id}>
                                <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>

                                {
                                  JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                    ?
                                    <td style={{ border: '1px solid #17a2b8' }}>
                                      <select id={element.id} onChange={(event) => this.setWhere(event, element.id, 'readiness')} defaultValue={element.percent}>
                                        <option >0</option>
                                        <option >15</option>
                                        <option >30</option>
                                        <option >50</option>
                                        <option >70</option>
                                        <option >80</option>
                                        <option >90</option>
                                        <option >95</option>
                                        <option >100</option>
                                      </select>
                                    </td>
                                    :
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                }

                                {
                                  JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                    ?
                                    <td

                                      onDoubleClick={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                      onTouchMove={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                      style={{ border: '1px solid #17a2b8' }}>
                                      {element.comment}

                                    </td>
                                    :
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>
                                }
                                <td className={css.displayNone + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                  {new Date(element.date * 1000).toLocaleDateString()}<br />
                                  {new Date(element.date * 1000).toLocaleTimeString()}
                                </td>

                              </tr>
                              :
                              <tr key={element.id} style={{ color: 'blue' }}>
                                <td className={css.displayNone} style={{ border: '1px solid #17a2b8' }}>{element.ent}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.brand_model}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ngov}</td>
                                <td style={{ border: '1px solid #17a2b8' }}>{element.Ninv}</td>

                                {
                                  JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                    ?
                                    <td style={{ border: '1px solid #17a2b8' }}>
                                      <select id={element.id} onChange={(event) => this.setWhere(event, element.id, 'readiness')} defaultValue={element.percent}>
                                        <option >0</option>
                                        <option >15</option>
                                        <option >30</option>
                                        <option >50</option>
                                        <option >70</option>
                                        <option >80</option>
                                        <option >90</option>
                                        <option >95</option>
                                        <option >100</option>
                                      </select>
                                    </td>
                                    :
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.percent}</td>
                                }

                                {
                                  JSON.parse(localStorage.getItem('reactUserLogin')).name === element.email
                                    ?
                                    <td

                                      onDoubleClick={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                      onTouchMove={() => this.activateEditMode(element.id, element.brand_model, element.Ngov, element.Ninv, element.comment)}

                                      style={{ border: '1px solid #17a2b8' }}>
                                      {element.comment}

                                    </td>
                                    :
                                    <td style={{ border: '1px solid #17a2b8' }}>{element.comment}</td>
                                }
                                <td className={css.displayNone + " text-center"} style={{ border: '1px solid #17a2b8' }}>
                                  {new Date(element.date * 1000).toLocaleDateString()}<br />
                                  {new Date(element.date * 1000).toLocaleTimeString()}
                                </td>

                              </tr>

                        )
                      }
                    </tbody>
                  </Table>

                  <Form onSubmit={(event) => this.setWhere(event, this.state.idModal, 'comment')}>
                    <Modal.Dialog style={{ display: this.state.displayModalWindow }}>
                      <Modal.Header>
                        <Modal.Title>Comment: <span className="text-primary">{this.state.brand_modelModal}</span> - {this.state.NgovModal} - inv_N{this.state.NinvModal}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <textarea id='textArea' defaultValue={this.state.textDefault} className="w-100" style={{ minHeight: '100px' }} />
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.deactivateEditMode}>Close</Button>
                        <Button variant="primary" type="submit" >Save changes</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Form>

                </div>
                :
                false
            :
            <h5 className="text-danger text-center">NO REPORTS</h5>
          }

        </div>
        :
        <div>
          <div className="text-center text-primary font-weight-bold">To USER AREA</div>
          <LogIn />
        </div>
    }
    </>
  }
}

let mapStateToProps = (state) => {

  return {
    commonData: state.common,
    techData: state.tech,
  }
}

export default compose(
  connect(mapStateToProps, {

    gdAuth,

    gdTecnicData,
    gdUpdateTecnicDataWhere

  }),

)(ReportsAgroTechnicConteiner);