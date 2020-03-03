let initialState = {
    currentWeather: {},
    fiveDayForecast: {},

};


const weatherReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENT_WEATHER:
            return {
                ...state,
                currentWeather: JSON.parse(action.newData),
            };

        case SET_FIVE_DAY_FORECAST:
            return {
                ...state,
                fiveDayForecast: JSON.parse(action.newData),
            };




        default:
            return state;

    }
}

//Const to switch - ActionCreater

const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';
const SET_FIVE_DAY_FORECAST = 'SET_FIVE_DAY_FORECAST';

//ActionCreaters

let setCurrentWeather = (CurrentWeather) => ({ type: SET_CURRENT_WEATHER, newData: CurrentWeather });
let setForecastFiveDays = (ForecastFiveDays) => ({ type: SET_FIVE_DAY_FORECAST, newData: ForecastFiveDays });

export const gdCurrentWeather = (Current) => {
    return (dispatch) => {
        dispatch(setCurrentWeather(Current));
    }
}

export const gdForecastFiveDay = (FiveDays) => {
    return (dispatch) => {
        dispatch(setForecastFiveDays(FiveDays));
    }
}


export default weatherReducer;