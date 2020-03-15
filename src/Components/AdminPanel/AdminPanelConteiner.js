import React from 'react';
import { Redirect } from 'react-router-dom';
import LogIn from '../LogInOut/LogIn';
import { apiPostLoadFile } from '../../api/apiPost';

import { gdAuth } from '../../redux/commonReducer';
import { gdTecnicData, gdUpdateTecnicData } from '../../redux/techReducer';


import { Button, Table } from 'react-bootstrap';

import { compose } from 'redux';
import { connect } from 'react-redux';

class AdminPanelConteiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsersBtn: false,
      showParkBtn: false,
      showEntBtn: false,
      showAvtoBtn: false,

      displayDataBase: 'd-none',
      btnDataBase: 'info',

      displayTechReport: 'd-none',
      btnTechReport: 'info',
      groupTechicks: null,
      groupTechicksItems: null,

    };
  }

  componentDidMount = () => {
    this.props.gdAuth();
  }

  showBtn = (button) => {
    if (button === 'Users') {
      this.setState({ showUsersBtn: true });
    } else if (button === 'Park') {
      this.setState({ showParkBtn: true });
    } else if (button === 'Ent') {
      this.setState({ showEntBtn: true });
    } else if (button === 'Avto') {
      this.setState({ showAvtoBtn: true });
    }
  }

  showBlock = (block) => {
    if (block === 'DataBase') {
      if (this.state.displayDataBase === 'd-none') {
        this.setState({ displayDataBase: 'd-block' });
        this.setState({ btnDataBase: 'warning' });
      } else {
        this.setState({ displayDataBase: 'd-none' });
        this.setState({ btnDataBase: 'info' });
      }
    } else if (block === 'TechReport') {
      if (this.state.displayTechReport === 'd-none') {
        this.setState({ displayTechReport: 'd-block' });
        this.setState({ btnTechReport: 'warning' });

        let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
        let name = ls.name;
        let hash = ls.hash;
        let rights = ls.rights;

        this.props.gdTecnicData(name, hash, rights, 'getGroups');
        this.props.gdTecnicData(name, hash, rights, 'getBrandModel');
        this.props.gdTecnicData(name, hash, rights, 'getReport');

      } else {
        this.setState({ displayTechReport: 'd-none' });
        this.setState({ btnTechReport: 'info' });
      }
    }
  }

  showBrandModel = (Group) => {
    this.setState({ groupTechicks: Group });
    let items = [];
    this.props.techData.brandModel.forEach(element => {
      if (element.groups === Group) {
        items.push(element);
      }
    });
    this.setState({ groupTechicksItems: items });
  }

  addToReport(data) {
    let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
    let name = ls.name;
    let hash = ls.hash;
    let rights = ls.rights;

    this.props.gdUpdateTecnicData(
      name, hash, rights,
      'insertToReport', 'react_report_operative_tech', data, 'brand_model');
  }

  removeFromReport(data) {
    let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
    let name = ls.name;
    let hash = ls.hash;
    let rights = ls.rights;

    this.props.gdUpdateTecnicData(
      name, hash, rights,
      'deleteFromReport', 'react_report_operative_tech', data, 'brand_model');
  }

  removeAllFromReport = () => {
    let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
    let name = ls.name;
    let hash = ls.hash;
    let rights = ls.rights;

    this.props.gdUpdateTecnicData(
      name, hash, rights,
      'deleteAllFromReport', 'react_report_operative_tech', 'deleteAllTwoTables', 'ALL');
  }


  funcHandler = (event, fileNameBtn, csvBtn) => {
    event.preventDefault();

    //console.log(event.target['database'].attributes['data-id-user'].value);
    let sendFile = event.target[fileNameBtn].files[0];
    let fileName = sendFile.name.split('.')[0];
    let fileExtension = sendFile.name.split('.')[1];

    if (fileName === fileNameBtn && fileExtension === csvBtn) {
      apiPostLoadFile(sendFile)
        .then(data => {
          alert('File [_ ' + data.name + ' _] is loaded');
        });

    } else {
      alert('Check File, Name & Database');
    }
  }


  render() {

    console.log(this.props.techData)

    return <>
      {
        this.props.commonData.authLogin === true
          &&
          JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'admin'
          ?
          <div className="px-4">
            <div className="row">
              <Button onClick={() => this.showBlock('DataBase')} variant={this.state.btnDataBase} className="w-100">DOWNLOAD TO UPDATE DATA BASE</Button>
            </div>
            <div className={this.state.displayDataBase} >
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <form onSubmit={(event) => this.funcHandler(event, 'users', 'csv')}>
                    <label htmlFor="users"><b>Update user database:</b> users . csv - <i className="fas fa-users"></i></label>
                    <div className="row">
                      <div className="col-12 ">
                        <input onChange={() => this.showBtn('Users')} type='file' className="btn btn-secondary" id="users"

                        //data-id-user="users" 
                        // console.log(event.target['users'].attributes['data-id-user'].value);

                        />
                      </div>
                      <div className="col-12 text-right">
                        {
                          this.state.showUsersBtn === true
                            ?
                            <input type="submit" className="btn btn-danger" style={{ marginTop: '4px', }} value="User database -> Log in" />
                            :
                            ''
                        }
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <form onSubmit={(event) => this.funcHandler(event, 'park', 'csv')}>
                    <label htmlFor="park"><b>Update park database:</b> park . csv - <i className="fas fa-parking"></i></label>
                    <div className="row">
                      <div className="col-12 ">
                        <input onChange={() => this.showBtn('Park')} type='file' className="btn btn-secondary" id="park" />
                      </div>
                      <div className="col-12 text-right">
                        {
                          this.state.showParkBtn === true
                            ?
                            <input type="submit" className="btn btn-primary" style={{ marginTop: '4px', }} value="Park database" />
                            :
                            ''
                        }
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <form onSubmit={(event) => this.funcHandler(event, 'ent', 'csv')}>
                    <label htmlFor="ent"><b>Update enterprise database:</b> ent . csv - <i className="fas fa-code-branch"></i></label>
                    <div className="row">
                      <div className="col-12 ">
                        <input onChange={() => this.showBtn('Ent')} type='file' className="btn btn-secondary" id="ent" />
                      </div>
                      <div className="col-12 text-right">
                        {
                          this.state.showEntBtn === true
                            ?
                            <input type="submit" className="btn btn-primary" style={{ marginTop: '4px', }} value="Enterprise database" />
                            :
                            ''
                        }
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <form onSubmit={(event) => this.funcHandler(event, 'avto', 'csv')}>
                    <label htmlFor="avto"><b>Update avto database:</b> avto . csv - <i className="fas fa-tractor"></i></label>
                    <div className="row">
                      <div className="col-12 ">
                        <input onChange={() => this.showBtn('Avto')} type='file' className="btn btn-secondary" id="avto" />
                      </div>
                      <div className="col-12 text-right">
                        {
                          this.state.showAvtoBtn === true
                            ?
                            <input type="submit" className="btn btn-primary" style={{ marginTop: '4px', }} value="Avto database" />
                            :
                            ''
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <hr />
            <div className="row">
              <Button onClick={() => this.showBlock('TechReport')} variant={this.state.btnTechReport} className="w-100">SET technical REPORTS</Button>
            </div>
            <div className={this.state.displayTechReport} >
              <div className="row">

                <div className="row">
                  {this.props.techData.groups !== null
                    ?
                    this.props.techData.groups.map(element =>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-6 " key={element.groups}>
                        <Button onClick={() => this.showBrandModel(element.groups)} variant="primary" className="mt-1 w-100">{element.groups}</Button>
                      </div>
                    )

                    : ''}
                </div>

                <div className="row">
                  {this.state.groupTechicks !== null && this.state.groupTechicksItems !== null
                    ?
                    <div className="row px-5">

                      <h5 className="mt-2 ml-5" style={{ color: 'brown' }}>Group: {this.state.groupTechicks}</h5>

                      <Table striped bordered hover size="sm" >
                        <thead>
                          <tr>
                            <th>Types</th>
                            <th>Brand/model</th>
                            <th>Add</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>

                          {this.state.groupTechicksItems.map(element => {
                            return (
                              this.props.techData.reportOperative.includes(element.brand_model)
                                ?
                                <tr key={element.brand_model}>
                                  <td>{element.types}</td>
                                  <td>{element.brand_model}</td>
                                  <td className="text-center">-</td>
                                  <td onClick={() => this.removeFromReport(element.brand_model)} className="btn btn-danger w-100">Delete</td>
                                </tr>
                                :
                                <tr key={element.brand_model + 1}>
                                  <td>{element.types}</td>
                                  <td>{element.brand_model}</td>
                                  <td onClick={() => this.addToReport(element.brand_model)} className="btn btn-primary w-100">To Report</td>
                                  <td className="text-center">-</td>
                                </tr>
                            )
                          }
                          )}
                        </tbody>
                      </Table>
                    </div>
                    : ''}
                </div>
              </div>
              {this.props.techData.brandModel !== null && JSON.stringify(this.props.techData.reportOperative) !== '[]'
                ?
                <div className="row">
                  <h5 className="mt-2 ml-5 " style={{ color: 'brown' }}>Total items in technical REPORTS</h5>

                  <Table striped bordered hover size="sm" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr className="text-center">
                        <th style={{ border: '1px solid black' }}>Group</th>
                        <th style={{ border: '1px solid black' }}>Types</th>
                        <th style={{ border: '1px solid black' }}>Brand/model</th>
                        <th style={{ border: '1px solid black' }} className="btn btn-secondary w-100" onClick={this.removeAllFromReport}>Remove ALL</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.props.techData.brandModel.map(element => {
                        return (
                          this.props.techData.reportOperative.includes(element.brand_model)
                            ?
                            <tr key={element.brand_model}>
                              <td style={{ border: '1px solid black' }}>{element.groups}</td>
                              <td style={{ border: '1px solid black' }}>{element.types}</td>
                              <td style={{ border: '1px solid black' }}>{element.brand_model}</td>
                              <td onClick={() => this.removeFromReport(element.brand_model)} className="btn btn-danger w-100" style={{ border: '1px solid black' }}>Delete</td>
                            </tr>
                            :
                            false
                        )
                      }
                      )}
                    </tbody>
                  </Table>
                </div>
                :
                ''}
            </div>
            <hr />
          </div>
          :
          this.props.commonData.authLogin === true
            &&
            JSON.parse(localStorage.getItem('reactUserLogin')).rights !== 'admin'
            ?
            <Redirect to="/" />
            :
            <div>
              <div className="text-center text-danger font-weight-bold">To ADMIN PANEL</div>
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
    gdUpdateTecnicData
  }),

)(AdminPanelConteiner);