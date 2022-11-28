import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { fetchAllInfo } from "./middlewares/HomePageMiddleware";
import { fetchTaskListStatusesInfo } from "./TaskListSlice";
import { fetchStatusesInfo } from "./middlewares/AppMeddlewares";

const myMiddlewares = [fetchAllInfo, fetchTaskListStatusesInfo, fetchStatusesInfo]

const store = configureStore({
    reducer: rootReducer,
    myMiddlewares
})

export default store