import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Store from "./components/Store";
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import Edit from "./components/Edit";


function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Store}/>
            <Route path='/Cart' component={Cart} exact/>
            <Route path='/Admin' component={Admin} exact/>
              <Route path='/Edit' component={Edit} exact/>

          </Switch>
        </Router>
      </div>
  );
}

export default App;
