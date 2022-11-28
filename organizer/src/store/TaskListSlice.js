import initialState from "./initialState";
import * as AppActionsCreators from "./actionCreators/AppActionCreators";
import * as fetches from "../modules";

const setLoadingStatus = "setLoadingStatus"

export const createAction_setLoadingStatus = (value) => {
    return {
        type: setLoadingStatus,
        value: value
    }
}

export function loadingStatusReducer(state = initialState.ui.TaskListPage.loadingStatus, action) {
    switch (action.type){
        case setLoadingStatus:
            return action.value
        default: return state
    }
}

export const fetchTaskListStatusesInfo = () => async dispatch => {
    const user_id = localStorage.getItem('userId')
    dispatch(createAction_setLoadingStatus(true))
    const tasks = await fetches.getTaskList(user_id)
    dispatch(AppActionsCreators.createAction_setTaskList(tasks))
    const statuses = await fetches.getStatuses()
    dispatch(AppActionsCreators.createAction_setStatuses(statuses))
    dispatch(createAction_setLoadingStatus(false))
}

