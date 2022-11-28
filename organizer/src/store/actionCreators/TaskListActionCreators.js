import * as TaskListActions from "../actions/TaskListPageActions"

export const createAction_setLoadingStatus = (value) => {
    return {
        type: TaskListActions.setLoadingStatus,
        value: value
    }
}