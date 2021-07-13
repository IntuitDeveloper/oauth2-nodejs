import React, {useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Profile from "./components/pages/Profile";
import LoginSuccess from './components/pages/LoginSuccess'
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
// connect.sid
import PrivateRoute from "./PrivateRoute";

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
          {/* <PrivateRoute exact path="/profile">
            <Profile userState={userState} />
          </PrivateRoute> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;


// TEST