import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./Game/Board";
import { Button, Col, Container, Row} from 'reactstrap';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import GameController from './Game/GameController';
import Register from './Account/Register';
import Login from './Account/Login';
import Highscore from "./Highscore/Highscore";
import Homepage from './Home/Homepage';
import Header from './Home/Header';
import { useEffect, useState } from 'react';

function App() {
  
  const [header, setHeader] = useState({isLoggedIn: false, username: ""});

  useEffect(() => {
    // let header = getUser();
    setHeader(getUser);
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={header.isLoggedIn} username={header.username} />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/dualnback" component={GameController} />
          <Route path="/highscore" component={Highscore} />
          <Route path="/login" component={Login}/>
          <Route path="/" component={Homepage}/>
        </Switch>
    </div>
  );
}

function getUser() {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('jwt');
  let isLoggedin = true;

  if(token === null){
    isLoggedin = false
  }

  return {isLoggedIn: isLoggedin, username: user};
}

export default App;
