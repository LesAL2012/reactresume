let initialState = {
    ratesECB: [],
    bankData: ['ECB', 'European Central Bank'],
    //bankData: ["UAH", "Ukrainian banks"],

    filterBankBranch: [1],

    filterCurrencies: ['EUR', 'USD', 'RUB'],
    filterBankNames: ["Альтбанк", "Альфа-Банк", "Аркада", "Глобус", "Грант", "Кристалбанк", "Мегабанк", "Ощадбанк", "ПУМБ", "Портал", "ПриватБанк", "Сбербанк", "Таскомбанк", "Укргазбанк", "Укрсиббанк", "Форвард"],
    filterCities: [],

    banksOfUkraine: [],
    banksOfUkraineTable: [],
};

const currencyExchangeReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_RATE_ECB:
            return {
                ...state,
                ratesECB: action.newData,
            };

        case SET_BANK_DATA:
            return {
                ...state,
                bankData: action.newData,
            };

        case SET_FILTER_CURRENCIES:
            return {
                ...state,
                filterCurrencies: action.newData,
            };

        case SET_FILTER_BANKBRANCH:
            return {
                ...state,
                filterBankBranch: action.newData,
            };
        case SET_FILTER_BANKNAMES:
            return {
                ...state,
                filterBankNames: action.newData,
            };

        case SET_FILTER_CITY:
            return {
                ...state,
                filterCities: action.newData,
            };

        case SET_BANKS_OF_UKRAINE:
            return {
                ...state,
                banksOfUkraine: action.newData,
            };

        case SET_BANKS_OF_UKRAINE_TABLE:
            return {
                ...state,
                banksOfUkraineTable: action.newData,
            };

        default:
            return state;

    }
}

//Const to switch - ActionCreater
const SET_RATE_ECB = 'SET_RATE_ECB';
const SET_BANK_DATA = 'SET_BANK_DATA';
const SET_FILTER_CURRENCIES = 'SET_FILTER_CURRENCIES';
const SET_FILTER_BANKBRANCH = 'SET_FILTER_BANKBRANCH';
const SET_FILTER_BANKNAMES = 'SET_FILTER_BANKNAMES';
const SET_FILTER_CITY = 'SET_FILTER_CITY';
const SET_BANKS_OF_UKRAINE = 'SET_BANKS_OF_UKRAINE';
const SET_BANKS_OF_UKRAINE_TABLE = 'SET_BANKS_OF_UKRAINE_TABLE';

//ActionCreaters

let setRateECB = (RateECB) => ({ type: SET_RATE_ECB, newData: RateECB });
let setBankData = (BankData) => ({ type: SET_BANK_DATA, newData: BankData });
let setFilterCurrencies = (FilterCurrencies) => ({ type: SET_FILTER_CURRENCIES, newData: FilterCurrencies });
let setFilterBankBranch = (FilterBankBranch) => ({ type: SET_FILTER_BANKBRANCH, newData: FilterBankBranch });
let setFilterBankNames = (FilterBankNames) => ({ type: SET_FILTER_BANKNAMES, newData: FilterBankNames });
let setFilterCity = (FilterCity) => ({ type: SET_FILTER_CITY, newData: FilterCity });
let setBanksOfUkraine = (BanksOfUkraine) => ({ type: SET_BANKS_OF_UKRAINE, newData: BanksOfUkraine });
let setBanksOfUkraineTable = (BanksOfUkraineTable) => ({ type: SET_BANKS_OF_UKRAINE_TABLE, newData: BanksOfUkraineTable });

export const gdRateECB = (ECB, checkedECB) => {
    return (dispatch) => {
        let arrECB = {};
        Object.keys(ECB).map(keyName => arrECB[keyName] = {
            rate: ECB[keyName], 'checked':
                checkedECB.includes(keyName) === true ? "checked" : ''
        });
        dispatch(setRateECB(arrECB));
    }
}

export const gdBankData = (Bank) => {
    return (dispatch) => {
        dispatch(setBankData(Bank));
    }
}

export const gdFilterCurrencies = (FCurrencies) => {
    return (dispatch) => {
        dispatch(setFilterCurrencies(FCurrencies));
    }
}

export const gdFilterBankBranch = (FBankBranchs) => {
    return (dispatch) => {
        dispatch(setFilterBankBranch(FBankBranchs));
    }
}

export const gdFilterBankNames = (FBankNames) => {
    return (dispatch) => {
        dispatch(setFilterBankNames(FBankNames));
    }
}

export const gdFilterCity = (FCity) => {
    return (dispatch) => {
        dispatch(setFilterCity(FCity));
    }
}

export const gdBanksOfUkraine = (OfUkraine) => {
    return (dispatch) => {
        dispatch(setBanksOfUkraine(OfUkraine));
    }
}

export const gdBanksOfUkraineTable = (OfUkraineTable) => {
    return (dispatch) => {
        dispatch(setBanksOfUkraineTable(OfUkraineTable));
    }
}

export default currencyExchangeReducer;