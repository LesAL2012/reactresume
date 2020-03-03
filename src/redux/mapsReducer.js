let initialState = {
    map: 'Leaflet',
};


const mapsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENT_MAP:
            return {
                ...state,
                map: action.newData,
            };

        default:
            return state;

    }
}

//Const to switch - ActionCreater
const SET_CURRENT_MAP = 'SET_CURRENT_MAP';

//ActionCreaters
let setCurrentMap = (CurrentMap) => ({ type: SET_CURRENT_MAP, newData: CurrentMap });

export const gdCurrentMap = (Map) => {
    return (dispatch) => {
        dispatch(setCurrentMap(Map));
    }
}

export default mapsReducer;