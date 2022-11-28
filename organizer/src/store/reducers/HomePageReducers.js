import initialState from "../initialState";
import * as HomePageActions from "../actions/HomePageActions";
import {combineReducers} from "@reduxjs/toolkit";


function selectedDateReducer(state = initialState.ui.HomePage.selectedDate.toString(), action) {
    switch (action.type) {
        case HomePageActions.setSelectedDate:
            return action.value
        default: return state
    }
}

function selectedDateActionsReducer(state = initialState.ui.HomePage.selectedDateActions, action) {
    switch (action.type) {
        case HomePageActions.setSelectedDateActions:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state = initialState.ui.HomePage.loadingStatus, action) {
    switch (action.type) {
        case HomePageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

// dskds

export const uiHomePageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
    selectedDate: selectedDateReducer,
    selectedDateActions: selectedDateActionsReducer,
})