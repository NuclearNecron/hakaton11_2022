import * as HomePageActions from "../actions/HomePageActions"

export const createAction_setLoadingStatus = (value) => {
    return {
        type: HomePageActions.setLoadingStatus,
        value: value
    }
}

export const createAction_setSelectedDate = value => {
    return {
        type: HomePageActions.setSelectedDate,
        value: value
    }
}

export const createAction_setSelectedDateActions = value => {
    return {
        type: HomePageActions.setSelectedDateActions,
        value: value
    }
}
