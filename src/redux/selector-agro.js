import { createSelector } from "reselect";

const getAgroBunner = (state) => {
    return state.common.agroBunner;
}

export const getAgroBunnerImg = createSelector(getAgroBunner,
    (agroBunner) => {
        return agroBunner;
    })

// export const getPageSize = (state) => {
//     return state.usersPage.pageSize;
// }
