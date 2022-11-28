import * as AppActionsCreators from "../actionCreators/AppActionCreators";
import { createAction_setLoadingStatus } from "../TaskListSlice"
import * as fetches from "../../modules";

export const fetchStatusesInfo = () => async dispatch => {
    dispatch(createAction_setLoadingStatus(true))
    const statuses = await fetches.getStatuses()
    dispatch(AppActionsCreators.createAction_setStatuses(statuses))
    dispatch(createAction_setLoadingStatus(false))
}