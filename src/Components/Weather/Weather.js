import React from 'react';
import css from './Weather.module.css';

let Weather = (props) => {
    let cw = props.currentWeatherData;
    let fd = props.forecastFiveDayData;

    let day01 = [];
    let day02 = [];
    let day03 = [];
    let day04 = [];
    let day05 = [];

    if (fd.list) {
        for (let i = 0; i < fd.list.length; i++) {
            if (fd.list[0].dt_txt.slice(0, -9) === fd.list[i].dt_txt.slice(0, -9)) day01.push(fd.list[i])
        }
        for (let i = day01.length; i < day01.length + 8; i++) {
            day02.push(fd.list[i])
        }
        for (let i = day01.length + 8; i < day01.length + 16; i++) {
            day03.push(fd.list[i])
        }
        for (let i = day01.length + 16; i < day01.length + 24; i++) {
            day04.push(fd.list[i])
        }
        for (let i = day01.length + 24; i < day01.length + 32; i++) {
            day05.push(fd.list[i])
        }
    }


    return <div>

        {JSON.stringify(cw) !== '{}' ? <div className='row'>
            <div className='col-lg-6 col-md-6 text-left '>
                <b>The Weather forecast - <span style={{ color: 'brown' }}>{cw.name}, {cw.sys.country} </span></b>

            </div>
            <div className='col-lg-6 col-md-6 text-right '>
                <b>GEODATA: </b>
                latitude <span className='font-weight-bold' style={{ color: 'brown' }}>{props.geoCoordinatsData['latitude']}</span>;
                longitude <span className='font-weight-bold' style={{ color: 'brown' }}>{props.geoCoordinatsData['longitude']}</span>
            </div>
        </div> : ''}

        <hr />

        {JSON.stringify(cw) !== '{}' ? <div>

            <div className='row'>
                <div className='col-lg-5 col-md-5 '>

                    <div className={"card mb-3 " + css.card} >
                        <div className="row no-gutters">
                            <div className="col-md-4 col-sm-6 col-6  text-center pt-2">

                                <span style={{ color: 'rgb(0,0,255)', fontWeight: 600, marginLeft: '4px' }}>
                                    {new Date(cw.dt * 1000).toLocaleDateString()}<br />                                    
                                    {new Date(cw.dt * 1000).toLocaleTimeString()}                                    
                                </span><br />

                                <img src={`https://openweathermap.org/img/wn/${cw.weather[0].icon}@2x.png`} className="card-img" alt="weatherIcon" style={{ maxWidth: '120px', marginBottom: '-15px' }} />
                                <br />

                                <span style={{ color: 'rgb(0,0,255)' }}>
                                    Clouds - {cw.clouds.all}%
                                </span>
                            </div>

                            <div className="col-md-8 col-sm-6 col-6">
                                <div className="card-body">
                                    <h5 className="card-title">Current Time</h5>

                                    <table className="card-text">
                                        <thead>
                                            <tr >
                                                <th scope="col">t</th>
                                                <th scope="col">&deg;C </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >Temp.</td>
                                                <td className="text-right">{Math.round(cw.main.temp - 273.15)}</td>
                                            </tr>
                                            <tr>
                                                <td >Feels like</td>
                                                <td className="text-right">{Math.round(cw.main.feels_like - 273.15)}</td>
                                            </tr>
                                            <tr>
                                                <td >Temp. min</td>
                                                <td className="text-right">{Math.round(cw.main.temp_min - 273.15)}</td>
                                            </tr>
                                            <tr>
                                                <td>Temp. max</td>
                                                <td className="text-right">{Math.round(cw.main.temp_max - 273.15)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <span className="text-center font-weight-bold">
                            {cw.weather[0].main} - {cw.weather[0].description}
                        </span>

                        <table className="card-text mx-3">
                            <tbody>
                                <tr>
                                    <td >Wind</td>
                                    <td className="text-right">{cw.wind.speed}</td>
                                    <td className="pl-2">m/s</td>
                                </tr>
                                <tr>
                                    <td >Humidity</td>
                                    <td className="text-right"> {cw.main.humidity}</td>
                                    <td className="pl-2">%</td>
                                </tr>
                                <tr>
                                    <td >Pressure</td>
                                    <td className="text-right">{cw.main.pressure.toLocaleString('ru')}</td>
                                    <td className="pl-2">hpa</td>
                                </tr>
                                <tr>
                                    <td >Visibility</td>
                                    <td className="text-right"> {cw.visibility.toLocaleString('ru')}</td>
                                    <td className="pl-2">m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className='col-lg-7 col-md-7'>

                    <div className={"card " + css.card} >
                        <div className="row no-gutters " >
                            <div className="col-md-4 col-sm-6 col-6  text-center mt-3">
                                <span style={{ color: 'rgb(0,0,255)', fontWeight: 600, marginLeft: '4px' }}>
                                    {fd.list[0].dt_txt.slice(0, -9)}
                                </span><br />
                            </div>
                            <div className="col-md-8 col-sm-6 col-6 " style={{ margin: ' -5px 0 -30px 0' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Current Day</h5>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <table className="card-text mx-3 text-center">
                            <thead>
                                <tr >
                                    <th scope="col">Time</th>
                                    <th scope="col"></th>
                                    <th scope="col">t &deg;C </th>
                                    <th scope="col">Wind</th>
                                    <th scope="col">Pressure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    day01.map(el => <tr key={el.dt_txt + '01'}>
                                        <td key={el.dt_txt}>{el.dt_txt.slice(11, -3)}</td>
                                        <td key={el.dt_txt + 'i'}>
                                            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weatherIcon" style={{ maxWidth: '60%', margin: '-16px 0' }} />
                                        </td>
                                        <td key={el.dt_txt + 't'}>{Math.round(el.main.temp - 273.15)}</td>
                                        <td key={el.dt_txt + 'w'}>{el.wind.speed}</td>
                                        <td key={el.dt_txt + 'p'}>{el.main.pressure.toLocaleString('ru')}</td>

                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <hr />

            <div className='row'>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className={"card mb-3 " + css.card}>

                        <div className='text-center mt-3'>
                            <span style={{ color: 'rgb(0,0,255)', fontWeight: 600 }}>
                                {day02[0].dt_txt.slice(0, -9)}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                                <b>2nd day</b>
                        </div>

                        <hr />
                        <table className="card-text mx-3 text-center">
                            <thead>
                                <tr >
                                    <th scope="col">Time</th>
                                    <th scope="col"></th>
                                    <th scope="col">t &deg;C </th>
                                    <th scope="col">Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    day02.map(el => <tr key={el.dt_txt + '02'}>
                                        <td key={el.dt_txt}>{el.dt_txt.slice(11, -3)}</td>
                                        <td key={el.dt_txt + 'i'}>
                                            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weatherIcon" style={{ maxWidth: '60%', margin: '-12px 0' }} />
                                        </td>
                                        <td key={el.dt_txt + 't'}>{Math.round(el.main.temp - 273.15)}</td>
                                        <td key={el.dt_txt + 'w'}>{el.wind.speed}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className={"card mb-3 " + css.card}>
                        <div className='text-center mt-3'>
                            <span style={{ color: 'rgb(0,0,255)', fontWeight: 600 }}>
                                {day03[0].dt_txt.slice(0, -9)}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                                <b>3rd day</b>
                        </div>
                        <hr />
                        <table className="card-text mx-3 text-center">
                            <thead>
                                <tr >
                                    <th scope="col">Time</th>
                                    <th scope="col"></th>
                                    <th scope="col">t &deg;C </th>
                                    <th scope="col">Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    day03.map(el => <tr key={el.dt_txt + '03'}>
                                        <td key={el.dt_txt}>{el.dt_txt.slice(11, -3)}</td>
                                        <td key={el.dt_txt + 'i'}>
                                            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weatherIcon" style={{ maxWidth: '60%', margin: '-12px 0' }} />
                                        </td>
                                        <td key={el.dt_txt + 't'}>{Math.round(el.main.temp - 273.15)}</td>
                                        <td key={el.dt_txt + 'w'}>{el.wind.speed}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className={"card mb-3 " + css.card}>
                        <div className='text-center mt-3'>
                            <span style={{ color: 'rgb(0,0,255)', fontWeight: 600 }}>
                                {day04[0].dt_txt.slice(0, -9)}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                                <b>4th day</b>
                        </div>
                        <hr />
                        <table className="card-text mx-3 text-center">
                            <thead>
                                <tr >
                                    <th scope="col">Time</th>
                                    <th scope="col"></th>
                                    <th scope="col">t &deg;C </th>
                                    <th scope="col">Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    day04.map(el => <tr key={el.dt_txt + '04'}>
                                        <td key={el.dt_txt}>{el.dt_txt.slice(11, -3)}</td>
                                        <td key={el.dt_txt + 'i'}>
                                            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weatherIcon" style={{ maxWidth: '60%', margin: '-12px 0' }} />
                                        </td>
                                        <td key={el.dt_txt + 't'}>{Math.round(el.main.temp - 273.15)}</td>
                                        <td key={el.dt_txt + 'w'}>{el.wind.speed}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className={"card mb-3 " + css.card}>
                        <div className='text-center mt-3'>
                            <span style={{ color: 'rgb(0,0,255)', fontWeight: 600 }}>
                                {day05[0].dt_txt.slice(0, -9)}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                                <b>5th day</b>
                        </div>
                        <hr />
                        <table className="card-text mx-3 text-center">
                            <thead>
                                <tr >
                                    <th scope="col">Time</th>
                                    <th scope="col"></th>
                                    <th scope="col">t &deg;C </th>
                                    <th scope="col">Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    day05.map(el => <tr key={el.dt_txt + '05'}>
                                        <td key={el.dt_txt}>{el.dt_txt.slice(11, -3)}</td>
                                        <td key={el.dt_txt + 'i'}>
                                            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weatherIcon" style={{ maxWidth: '60%', margin: '-12px 0' }} />
                                        </td>
                                        <td key={el.dt_txt + 't'}>{Math.round(el.main.temp - 273.15)}</td>
                                        <td key={el.dt_txt + 'w'}>{el.wind.speed}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
            : ''}
    </div >
}

export default Weather;
