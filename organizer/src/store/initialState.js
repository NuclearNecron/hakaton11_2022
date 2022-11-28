const initialState = {
    cached_data: {
        App: {
            userAuthorized: localStorage.getItem('userID') !== '',
            taskList: [],
            events: [],
            notes: [],
            bookmarks: [],
            statuses: [],
        }
    },
    ui: {
        App: {
            AppBarLinks: [],
        },
        HomePage: {
            loadingStatus: true,
            selectedDate: new Date(),
            selectedDateActions: [],
        },
        TaskListPage: {
            loadingStatus: true,
        }
    }
}

export default initialState