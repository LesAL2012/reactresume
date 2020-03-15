let initialState = {

    brandModel: null,
    groups: null,
    reportOperative: null,
    reportOperativeAll: null,
    reportOperativeAllFilter: null,

    reportCharts: null,
    reportChartsCuratorAVG: null,
    reportChartsCuratorMaxMin: null,
    reportChartsTypes: null,
    reportChartsPark: null,
    reportChartsEnt: null,



};

const techReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_BRAND_MODEL:
            return {
                ...state,
                brandModel: JSON.parse(action.newData),
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: JSON.parse(action.newData),
            };
        case SET_REPORT_OPERATIVE:
            return {
                ...state,
                reportOperative: action.newData,
            };
        case SET_REPORT_OPERATIVE_ALL:
            return {
                ...state,
                reportOperativeAll: JSON.parse(action.newData),
            };
        case SET_REPORT_OPERATIVE_ALL_FILTER:
            return {
                ...state,
                reportOperativeAllFilter: action.newData,
            };

        case SET_REPORT_CHARTS:
            return {
                ...state,
                reportCharts: JSON.parse(action.newData),
            };

        case SET_REPORT_CHARTS_CURATOR_AVG:
            return {
                ...state,
                reportChartsCuratorAVG: action.newData,
            };

        case SET_REPORT_CHARTS_CURATOR_MAX_MIN:
            return {
                ...state,
                reportChartsCuratorMaxMin: action.newData,
            };
        case SET_REPORT_CHARTS_TYPES:
            return {
                ...state,
                reportChartsTypes: action.newData,
            };
        case SET_REPORT_CHARTS_PARK:
            return {
                ...state,
                reportChartsPark: action.newData,
            };
        case SET_REPORT_CHARTS_ENT:
            return {
                ...state,
                reportChartsEnt: action.newData,
            };



        default:
            return state;

    }

}

//Const to switch - ActionCreater

const SET_BRAND_MODEL = 'SET_BRAND_MODEL';
const SET_GROUPS = 'SET_GROUPS';
const SET_REPORT_OPERATIVE = 'SET_REPORT_OPERATIVE';
const SET_REPORT_OPERATIVE_ALL = 'SET_REPORT_OPERATIVE_ALL';
const SET_REPORT_OPERATIVE_ALL_FILTER = 'SET_REPORT_OPERATIVE_ALL_FILTER';
const SET_REPORT_CHARTS = 'SET_REPORT_CHARTS';
const SET_REPORT_CHARTS_CURATOR_MAX_MIN = 'SET_REPORT_CHARTS_CURATOR_MAX_MIN';
const SET_REPORT_CHARTS_CURATOR_AVG = 'SET_REPORT_CHARTS_CURATOR_AVG';
const SET_REPORT_CHARTS_TYPES = 'SET_REPORT_CHARTS_TYPES';
const SET_REPORT_CHARTS_PARK = 'SET_REPORT_CHARTS_PARK';
const SET_REPORT_CHARTS_ENT = 'SET_REPORT_CHARTS_ENT';


//ActionCreaters

let setBrandModel = (BrandModel) => ({ type: SET_BRAND_MODEL, newData: BrandModel });
let setGroups = (Groups) => ({ type: SET_GROUPS, newData: Groups });
let setReport = (Report) => ({ type: SET_REPORT_OPERATIVE, newData: Report });
let setReportAll = (ReportAll) => ({ type: SET_REPORT_OPERATIVE_ALL, newData: ReportAll });
let setReportAllFilter = (ReportAllFilter) => ({ type: SET_REPORT_OPERATIVE_ALL_FILTER, newData: ReportAllFilter });
let setReporCharts = (ReporCharts) => ({ type: SET_REPORT_CHARTS, newData: ReporCharts });
let setReporChartsCuratorMaxMin = (CuratorMaxMin) => ({ type: SET_REPORT_CHARTS_CURATOR_MAX_MIN, newData: CuratorMaxMin });
let setReporChartsCuratorAVG = (CuratorAVG) => ({ type: SET_REPORT_CHARTS_CURATOR_AVG, newData: CuratorAVG });
let setReporChartsTypes = (TypesAVG) => ({ type: SET_REPORT_CHARTS_TYPES, newData: TypesAVG });
let setReporChartsPark = (ParkAVG) => ({ type: SET_REPORT_CHARTS_PARK, newData: ParkAVG });
let setReporChartsEnt = (EntAVG) => ({ type: SET_REPORT_CHARTS_ENT, newData: EntAVG });


export const gdTecnicData = (name, hash, rights, action) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        let params = {
            'name': name,
            'hash': hash,
            'rights': rights,
            'action': action
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        //request.open('POST', 'https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/qTechData.php', false);
        request.open('POST', 'https://react.ts.biz.ua/qTechData.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(queryString);
        if (request.status === 200) {
            //let res =JSON.parse(request.responseText)
            let res = request.responseText;
            //console.log(res);
            if (res !== 'false' && action === 'getBrandModel') {
                dispatch(setBrandModel(res));
            }
            else if (res !== 'false' && action === 'getGroups') {
                dispatch(setGroups(res));
            }
            else if (res !== 'false' && action === 'getReport') {
                let arr = [];
                JSON.parse(res).forEach(element => {
                    arr.push(element.brand_model)
                });
                dispatch(setReport(arr));
            }
            else if (res !== 'false' && action === 'getReportAll') {
                dispatch(setReportAll(res));
                let filterArr = [];
                let resFilter = JSON.parse(request.responseText)
                let arrPark = [];
                let arrEnt = [];
                let arrTypes = [];
                let arrBrandModel = [];
                let arrPercent = [];
                let arrCurator = [];
                resFilter.forEach(element => {
                    arrPark.push(element.park);
                    arrEnt.push(element.ent);
                    arrTypes.push(element.types);
                    arrBrandModel.push(element.brand_model);
                    arrPercent.push(element.percent);
                    arrCurator.push(element.curator);
                });
                let setPark = new Set(arrPark);
                filterArr['park'] = Array.from(setPark).sort();
                let setEnt = new Set(arrEnt);
                filterArr['ent'] = Array.from(setEnt).sort();
                let setTypes = new Set(arrTypes);
                filterArr['types'] = Array.from(setTypes).sort();
                let setBrandModel = new Set(arrBrandModel);
                filterArr['brand_model'] = Array.from(setBrandModel).sort();
                let setPercent = new Set(arrPercent);
                const compareNumbers = (a, b) => {
                    return a - b;
                }
                filterArr['percent'] = Array.from(setPercent).sort(compareNumbers);
                dispatch(setReportAllFilter(filterArr));
                let setCurator = new Set(arrCurator);
                filterArr['curator'] = Array.from(setCurator).sort();
            }
            else if (res !== 'false' && action === 'getReporCharts') {
                dispatch(setReporCharts(res));

                res = JSON.parse(res);
                //console.log(res);

                let CuratorAVG = [['Curator', 'AVG'],];
                Object.keys(res.Curator).map(key => CuratorAVG.push([key, parseInt(res.Curator[key].AVG)]));
                dispatch(setReporChartsCuratorAVG(CuratorAVG));


                let CuratorMaxMin = [['Curator', 'MAX', 'MIN'],];
                Object.keys(res.Curator).map(key => CuratorMaxMin.push([key, parseInt(res.Curator[key].MAX), parseInt(res.Curator[key].MIN)]));
                dispatch(setReporChartsCuratorMaxMin(CuratorMaxMin));


                let TypesAVG = [['Types', 'AVG'],];
                Object.keys(res.AVG_Types).map(key => TypesAVG.push([key, parseInt(res.AVG_Types[key])]));
                dispatch(setReporChartsTypes(TypesAVG));

                let ParkAVG = [['Park', 'AVG-Park, %'],];
                Object.keys(res.AVG_Park).map(key => ParkAVG.push([key, parseInt(res.AVG_Park[key])]));
                dispatch(setReporChartsPark(ParkAVG));

                let EntAVG = [['Enterprises', 'Mechanic', 'AVG-Ent., %'],];
                Object.keys(res.AVG_Ent).map(key => EntAVG.push([key, res.AVG_Ent[key].mechanik, parseInt(res.AVG_Ent[key].AVG)]));
                dispatch(setReporChartsEnt(EntAVG));
            }
            else if (res === 'false') {
                window.location.href = "/";
            }
            else {
                dispatch(setBrandModel('Server WRONG SERVER DATA'));
                alert('Some trouble with server or network - try to connect again');
            }
        }

        else if (request.status === 304) {
            window.location.href = "/";
        }

        else {
            dispatch(setBrandModel('Server ERROR'));
            alert('Some trouble with server or network - try to connect again');
        }
    }
}

export const gdUpdateTecnicData = (
    name, hash, rights,
    action, table, data, column) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        let params = {
            'name': name,
            'hash': hash,
            'rights': rights,
            'action': action,
            'table': table,
            'data': data,
            'column': column
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        //request.open('POST', 'https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/updateTechData.php', false);
        request.open('POST', 'https://react.ts.biz.ua/updateTechData.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(queryString);
        if (request.status === 200) {
            let res = request.responseText;
            if (res !== 'false' && action === 'insertToReport') {
                dispatch(gdTecnicData(name, hash, rights, 'getReport'));
            }
            else if (res !== 'false' && action === 'deleteFromReport') {
                dispatch(gdTecnicData(name, hash, rights, 'getReport'));
            }
            else if (res !== 'false' && action === 'deleteAllFromReport') {
                dispatch(gdTecnicData(name, hash, rights, 'getReport'));
            }


            else {
                alert('Some trouble with server or network - try to connect again');
            }
        } else {
            alert('Some trouble with server or network - try to connect again');
        }
    }
}

export const gdUpdateTecnicDataWhere = (
    name, hash, rights,
    action, table, data, column, where_id) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        let params = {
            'name': name,
            'hash': hash,
            'rights': rights,
            'action': action,
            'table': table,
            'data': data,
            'column': column,
            'where_id': where_id,
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        //request.open('POST', 'https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/updateTechData.php', false);
        request.open('POST', 'https://react.ts.biz.ua/updateTechData.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(queryString);
        if (request.status === 200) {
            let res = request.responseText;
            if (res !== 'false' && action === 'insertToReportWhere') {
                dispatch(gdTecnicData(name, hash, rights, 'getReportAll'));
                //console.log(res)
            }
            else {
                alert('Some trouble with server or network - try to connect again');
            }
        } else {
            alert('Some trouble with server or network - try to connect again');
        }
    }
}

export default techReducer;
