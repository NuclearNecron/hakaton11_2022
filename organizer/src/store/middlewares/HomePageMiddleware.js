import * as HomePageActionCreators from "../actionCreators/HomePageActionCreators"
import * as AppActionsCreators from "../actionCreators/AppActionCreators";
import * as fetches from "../../modules";

export const fetchAllInfo = () => async dispatch => {
    const user_id = localStorage.getItem('userId')
    dispatch(HomePageActionCreators.createAction_setLoadingStatus(true))
    const tasks = await fetches.getTaskList(user_id)
    dispatch(AppActionsCreators.createAction_setTaskList(tasks))
    const events = await fetches.getEvents(user_id)
    dispatch(AppActionsCreators.createAction_setEvents(events))
    const notes = await fetches.getNotes(user_id)
    dispatch(AppActionsCreators.createAction_setNotes(notes))
    const bookmarks = await fetches.getBookmarks(user_id)
    dispatch(AppActionsCreators.createAction_setBookmarks(bookmarks))
    dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
}