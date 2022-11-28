import initialState from '../initialState';
import { combineReducers } from "@reduxjs/toolkit";
import * as AppActions from "../actions/AppActions";


function userAuthorizedReducer(state = initialState.cached_data.App.userAuthorized, action) {
    switch (action.type) {
        case AppActions.setUserStatus:
            return action.value
        default: return state
    }
}

function AppBarLinksReducer(state = initialState.ui.App.AppBarLinks, action) {
    switch (action.type) {
        case AppActions.setAppBarLinks:
            return action.value
        case AppActions.addToAppBarLinks:
            let new_state = state;
            action.value.forEach(elem => {
                new_state.push(elem)
            })
            return new_state
        case AppActions.deleteFromAppBarLinks:
            return state.filter(elem => !action.value.includes(elem))
        default: return state
    }
}

function TaskListReducer(state = initialState.cached_data.App.taskList, action) {
    switch (action.type) {
        case AppActions.setTaskList:
            return action.value
        default: return state
    }
}

function EventsReducer(state = initialState.cached_data.App.events, action) {
    switch (action.type) {
        case AppActions.setEvents:
            return action.value
        default: return state
    }
}

function StatusesReducer(state = initialState.cached_data.App.statuses, action) {
    switch (action.type) {
        case AppActions.setStatuses:
            return action.value
        default: return state
    }
}

function NotesReducer(state = initialState.cached_data.App.notes, action) {
    switch (action.type) {
        case AppActions.setNotes:
            return action.value
        default: return state
    }
}

function BookmarksReducer(state = initialState.cached_data.App.bookmarks, action) {
    switch (action.type) {
        case AppActions.setBookmarks:
            return action.value
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
    taskList: TaskListReducer,
    events: EventsReducer,
    notes: NotesReducer,
    bookmarks: BookmarksReducer,
    statuses: StatusesReducer
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})