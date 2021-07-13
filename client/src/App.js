import React, {useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Profile from "./components/Profile";
import LoginSuccess from './components/LoginSuccess'
import Login from './components/Login'
import Landing from './components/Landing'


const App = ()=> {
  const [userState,setUserState] = useState({
    isLoggedIn: false,
    user: null
  })
  const [error,setError] = useState({
    show: false,
    msg: ''
  })
  


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login"><Login setUserState={setUserState} setError={setError} /></Route>
          <Route exact path="/login/error">Error logging in!</Route>
          <Route exact path="/login/success" component={LoginSuccess}/>
          <Route exact path="/profile">
            <Profile userState={userState} />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;


// TEST