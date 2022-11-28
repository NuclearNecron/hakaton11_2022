import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import React from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MainPage from "./pages/MainPage";
import TaskListPage from "./pages/TaskListPage";
import EventsPage from "./pages/EventsPage";
import NotesPage from "./pages/NotesPage";
import "bootstrap/dist/css/bootstrap.css";
import AuthPage from "./pages/AuthPage";
import SignIn from "./pages/AuthPage";
import SignUp from "./pages/RegPage";
import {useDispatch} from "react-redux";

function App() {

  return (
    <BrowserRouter basename={'/'}>

        <ResponsiveAppBar/>

        <Switch>

            <Route exact path={'/'} children={<MainPage/>}/>

            <Route exact path={'/tasks'} children={<TaskListPage/>}/>

            <Route exact path={'/events'} children={<EventsPage/>}/>

            <Route exact path={'/notes'} children={<NotesPage/>}/>

            <Route exact path={'/auth'} children={<SignIn/>}/>

            <Route exact path={'/reg'} children={<SignUp/>}/>

        </Switch>

    </BrowserRouter>
  );
}

export default App;
