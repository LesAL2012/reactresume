import React from 'react';

import LogIn from '../LogInOut/LogIn';
import { gdAuth, } from '../../redux/commonReducer';
import { gdTecnicData } from '../../redux/techReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';

import Chart from "react-google-charts";


class AgroData extends React.Component {

    componentDidMount() {
        this.props.gdAuth();
    }

    componentDidUpdate() {

        // if (this.props.techData.reportCharts !== prevProps.techData.reportCharts && localStorage.getItem('reactUserLogin')) {
        //     this.getReportGharts();
        // }

        if (this.props.techData.reportCharts === null && localStorage.getItem('reactUserLogin')) {
            this.getReportGharts();
        }
    }

    getReportGharts = () => {
        let ls = JSON.parse(localStorage.getItem('reactUserLogin'));
        let name = ls.name;
        let hash = ls.hash;
        let rights = ls.rights;
        this.props.gdTecnicData(name, hash, rights, 'getReporCharts');
    }

    render() {
        //console.log(this.props.techData)
        return <div>
            {
                localStorage.getItem('reactUserLogin')
                    ?
                    JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'admin' ||
                        JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'user' ||
                        JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'mechanik' ||
                        JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'curator'
                        ?
                        <div>
                            {
                                this.props.techData.reportCharts !== null && JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'admin'
                                    ?
                                    <div className="Admin">
                                        <h4 className="text-center">Readiness of machinery and equipment, %</h4>
                                        <div className="row">

                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="mx-auto" style={{ width: "240px" }}>
                                                    <Chart style={{ width: "240px", height: "240px" }}
                                                        chartType="Gauge"
                                                        loader={<div>Loading Chart</div>}
                                                        data={[
                                                            ['Label', 'Value'],
                                                            ['AVG', Number(Math.round((this.props.techData.reportCharts.AVG) * 10) / 10)],
                                                        ]}
                                                        options={{
                                                            redFrom: 0,
                                                            redTo: 25,
                                                            yellowFrom: 25,
                                                            yellowTo: 75,
                                                            minorTicks: 10,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-12">

                                                <Chart className="w-100"
                                                    height={240}
                                                    chartType="BarChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={this.props.techData.reportChartsCuratorAVG}
                                                    options={{
                                                        title: 'Curators',
                                                        chartArea: { width: '50%' },
                                                        colors: ['green'],
                                                        hAxis: {
                                                            title: 'AVG',
                                                            minValue: 0,
                                                            maxValue: 100,
                                                        },
                                                        legend: 'none'
                                                    }}
                                                />
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <Chart className="w-100"
                                                    height={240}
                                                    chartType="BarChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={this.props.techData.reportChartsCuratorMaxMin}
                                                    options={{
                                                        title: 'Curators',
                                                        chartArea: { width: '35%' },
                                                        colors: ['blue', '#b0120a'],
                                                        hAxis: {
                                                            title: 'Max & Min data in report',
                                                            minValue: 0,
                                                        },
                                                    }}
                                                />
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-12">

                                                <Chart className="w-100"
                                                    height={240}
                                                    chartType="BarChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={this.props.techData.reportChartsTypes}
                                                    options={{
                                                        title: 'Types of machinery and equipment',
                                                        chartArea: { width: '50%' },
                                                        colors: ['#ff9900'],
                                                        hAxis: {
                                                            title: 'AVG',
                                                            minValue: 0,
                                                            maxValue: 100,
                                                        },
                                                        legend: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-5">

                                                <Chart className="w-100"
                                                    height={520}
                                                    chartType="BarChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={this.props.techData.reportChartsPark}
                                                    options={{
                                                        title: 'Parks of machinery and equipment',
                                                        chartArea: { width: '50%', height: '85%' },
                                                        colors: ['DarkCyan'],
                                                        hAxis: {
                                                            title: 'AVG',
                                                            minValue: 0,
                                                        },
                                                        legend: 'none',
                                                    }}
                                                    controls={[
                                                        {
                                                            controlType: 'NumberRangeFilter',
                                                            options: {
                                                                filterColumnIndex: 1,
                                                                minValue: 0,

                                                            },
                                                        },
                                                    ]}
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                                                <div className="mx-auto" style={{ width: '360px' }}>
                                                    <Chart
                                                        height={520}
                                                        chartType="Table"
                                                        loader={<div>Loading Chart</div>}
                                                        data={this.props.techData.reportChartsEnt}
                                                        chartPackages={['controls']}
                                                        controls={[
                                                            {
                                                                controlType: 'NumberRangeFilter',
                                                                options: {
                                                                    filterColumnIndex: 2,
                                                                    minValue: 0,

                                                                },
                                                            },
                                                        ]}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    :
                                    this.props.techData.reportCharts !== null && JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'mechanik'
                                        ?
                                        <div className="Mechanick">
                                            <h4 className="text-center">Readiness of machinery and equipment, %
                                            <br />
                                                <span style={{ color: 'brown' }}>
                                                    {this.props.techData.reportChartsEnt[1][1]}
                                                </span>
                                            </h4>
                                            <div className="row">

                                                <div className="col-lg-4 col-md-12 col-sm-12">
                                                    <div className="mx-auto" style={{ width: "240px" }}>
                                                        <Chart style={{ width: "240px", height: "240px" }}
                                                            chartType="Gauge"
                                                            loader={<div>Loading Chart</div>}
                                                            data={[
                                                                ['Label', 'Value'],
                                                                ['AVG', Number(Math.round((this.props.techData.reportCharts.AVG) * 10) / 10)],
                                                            ]}
                                                            options={{
                                                                redFrom: 0,
                                                                redTo: 25,
                                                                yellowFrom: 25,
                                                                yellowTo: 75,
                                                                minorTicks: 5,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                                                    <div className="mx-auto" style={{ width: '300px' }}>
                                                        <Chart
                                                            width={300}
                                                            chartType="Table"
                                                            loader={<div>Loading Chart</div>}
                                                            data={this.props.techData.reportChartsEnt}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 col-sm-12 ">
                                                    <Chart className="w-100"
                                                        height={240}
                                                        chartType="BarChart"
                                                        loader={<div>Loading Chart</div>}
                                                        data={this.props.techData.reportChartsTypes}
                                                        options={{
                                                            title: 'Types of machinery and equipment',
                                                            chartArea: { width: '50%' },
                                                            colors: ['#ff9900'],
                                                            hAxis: {
                                                                title: 'AVG',
                                                                minValue: 0,
                                                                maxValue: 100,
                                                            },
                                                            legend: 'none'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div >
                                        :
                                        false
                            }
                        </div>
                        :
                        <LogIn />

                    :
                    <LogIn />

            }
        </div>
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

    }),


)(AgroData);





