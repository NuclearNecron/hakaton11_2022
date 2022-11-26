import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import React from "react";

function App() {
  return (
    <BrowserRouter basename={'/'}>

        <Switch>

            <Route exact path={'/'}>
                <div>Добро пожаловать!</div>
            </Route>

        </Switch>

    </BrowserRouter>
  );
}

export default App;
