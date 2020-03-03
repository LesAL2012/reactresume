let initialState = {

    preloaserStatus: false,

    geoCoordinats: {
        latitude: null,
        longitude: null
    },

};

const commonReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_GEO_COORDINATS:
            return {
                ...state,
                geoCoordinats: JSON.parse(action.newData),
            };

        case SET_PRELOADER_STSTUS:
            return {
                ...state,
                preloaserStatus: action.newData,
            };

        default:
            return state;

    }
}

//Const to switch - ActionCreater

const SET_GEO_COORDINATS = 'SET_GEO_COORDINATS';
const SET_PRELOADER_STSTUS = 'SET_PRELOADER_STSTUS';


//ActionCreaters

let setGeoCoordinats = (GeoCoordinats) => ({ type: SET_GEO_COORDINATS, newData: GeoCoordinats });
let setPreloaserStatus = (PreloaserStatus) => ({ type: SET_PRELOADER_STSTUS, newData: PreloaserStatus });


export const gdGeoCoordinats = (Geo) => {
    return (dispatch) => {
        dispatch(setGeoCoordinats(Geo));
    }
}

export const gdPreloaserStatus = (Preloader) => {
    return (dispatch) => {
        dispatch(setPreloaserStatus(Preloader));
    }
}


export default commonReducer;