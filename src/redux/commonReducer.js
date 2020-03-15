import { agroBunnerAPI } from '../api/api';

let initialState = {

    preloaserStatus: false,

    geoCoordinats: {
        latitude: null,
        longitude: null
    },

    authLogin: false,

    agroBunner: null,

};

const commonReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_GEO_COORDINATS:
            return {
                ...state,
                geoCoordinats: JSON.parse(action.newData),
            };

        case SET_PRELOADER_STATUS:
            return {
                ...state,
                preloaserStatus: action.newData,
            };

        case SET_AUTH_LOGIN:
            return {
                ...state,
                authLogin: action.newData,
            };

        case SET_AGRO_BUNNER:
            return {
                ...state,
                agroBunner: action.newData,
            };

        default:
            return state;

    }

}

//Const to switch - ActionCreater

const SET_GEO_COORDINATS = 'SET_GEO_COORDINATS';
const SET_PRELOADER_STATUS = 'SET_PRELOADER_STATUS';
const SET_AUTH_LOGIN = 'SET_AUTH_LOGIN';
const SET_AGRO_BUNNER = 'SET_AGRO_BUNNER';

//ActionCreaters

let setGeoCoordinats = (GeoCoordinats) => ({ type: SET_GEO_COORDINATS, newData: GeoCoordinats });
let setPreloaserStatus = (PreloaserStatus) => ({ type: SET_PRELOADER_STATUS, newData: PreloaserStatus });
let setAuthLogin = (AuthLogin) => ({ type: SET_AUTH_LOGIN, newData: AuthLogin });
let setAgroBunner = (AgroBunner) => ({ type: SET_AGRO_BUNNER, newData: AgroBunner });


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

export const gdAuth = () => {

    return (dispatch) => {
        if (!localStorage.getItem('reactUserLogin')) {
            dispatch(setAuthLogin(false));
        } else {
            let lsReactUserLogin = JSON.parse(localStorage.getItem('reactUserLogin'));
            if (lsReactUserLogin.name !== null || lsReactUserLogin.name !== undefined) {
                let request = new XMLHttpRequest();
                let params = {
                    name: lsReactUserLogin.name,
                    hash: lsReactUserLogin.hash,
                    checkLogIn: 'true',
                };
                let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
                //request.open('POST', 'https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/auth.php', false);
                request.open('POST', 'https://react.ts.biz.ua/auth.php', false);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.send(queryString);
                if (request.status === 200) {
                    let res = request.responseText;
                    if (res !== 'false') {
                        localStorage.setItem('reactUserLogin', res);
                        dispatch(setAuthLogin(true));
                    } else {
                        window.location.href = "/";
                        localStorage.removeItem('reactUserLogin');
                        dispatch(setAuthLogin(false));
                        alert('Please, check NAME and PASSWORD');
                    }
                }
            }
        }
    }
}

export const gdLogin = (name, pass) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        let params = {
            'name': name,
            'pass': pass,
            logIn: 'true',
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        //request.open('POST', 'https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/auth.php', false);
        request.open('POST', 'https://react.ts.biz.ua/auth.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(queryString);
        if (request.status === 200) {
            //let res =JSON.parse(request.responseText)
            let res = request.responseText;
            //console.log(res);
            if (res !== 'false') {
                localStorage.setItem('reactUserLogin', res);
                dispatch(setAuthLogin(true));
            } else {
                window.location.href = "/";
                localStorage.removeItem('reactUserLogin');
                dispatch(setAuthLogin(false));
                alert('Please, check NAME and PASSWORD');
            }
        }
    }
}

export const gdLogOut = () => {
    localStorage.removeItem('reactUserLogin');
    return (dispatch) => {
        dispatch(setAuthLogin(false));
    }
}

export const gdAgroBunner = () => async (dispatch) => {

    let response = await agroBunnerAPI.getAgroBunnerImg();
    dispatch(setAgroBunner(response));
}






export default commonReducer;