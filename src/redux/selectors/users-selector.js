import {createSelector} from "reselect";

export const getUsers = (state) => state.usersPage.users;
export const getUsersAmount = (state) => state.usersPage.usersAmount;
export const getPageSize = (state) => state.usersPage.pageSize;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getIsFetching = (state) => state.usersPage.isFetching;
export const getIsFollowInProcess = (state) => state.usersPage.isFollowInProcess;
export const getIsAuth = (state) => state.auth.isAuth;
export const getCurrentFraction = (state) => state.usersPage.currentFraction;
export const getFractionSize = (state) => state.usersPage.fractionSize;

export const getUsersSelector = createSelector(getUsers, users => users.map(u => u)); //for test