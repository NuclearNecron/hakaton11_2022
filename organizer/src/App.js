import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import React from "react";
import StaticDatePickerLandscape from "./components/MyCalendar";

function App() {
  return (
    <BrowserRouter basename={'/'}>

        <Switch>

            <Route exact path={'/'}>
                <div>Добро пожаловать!</div>
                <StaticDatePickerLandscape />
            </Route>

        </Switch>

    </BrowserRouter>
  );
}

export default App;
