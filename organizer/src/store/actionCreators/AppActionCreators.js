import * as AppActions from "../actions/AppActions"


export const createAction_setStatuses = value => {
    return {
        type: AppActions.setStatuses,
        value: value
    }
}

export const createAction_setAppBarLinks = value => {
    return {
        type: AppActions.setAppBarLinks,
        value: value
    }
}

export const createAction_setUserStatus = (value) => {
    return {
        type: AppActions.setUserStatus,
        value: value
    }
}

export const createAction_addToAppBarLinks = (value) => {
    return {
        type: AppActions.addToAppBarLinks,
        value: value
    }
}

export const createAction_deleteFromAppBarLinks = (value) => {
    return {
        type: AppActions.deleteFromAppBarLinks,
        value: value
    }
}

export const createAction_setTaskList = (value) => {
    return {
        type: AppActions.setTaskList,
        value: value
    }
}

export const createAction_setEvents = (value) => {
    return {
        type: AppActions.setEvents,
        value: value
    }
}

export const createAction_setNotes = (value) => {
    return {
        type: AppActions.setNotes,
        value: value
    }
}

export const createAction_setBookmarks = (value) => {
    return {
        type: AppActions.setBookmarks,
        value: value
    }
}