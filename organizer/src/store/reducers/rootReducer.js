import { cached_dataAppReducers, uiAppReducers } from "./AppReducers"
import { uiHomePageReducers } from "./HomePageReducers"
import { combineReducers } from "@reduxjs/toolkit";
import { loadingStatusReducer } from "../TaskListSlice";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        App: cached_dataAppReducers
    }),
    ui: combineReducers({
        App: uiAppReducers,
        HomePage: uiHomePageReducers,
        TaskListPage: combineReducers({
            loadingStatus: loadingStatusReducer
        })
    })
})


export default rootReducer