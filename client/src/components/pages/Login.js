import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../common/Navbar';
import '../../assets/css/common.css'
import Google from '../../assets/icons/google.png'
import Facebook from '../../assets/icons/facebook.png'

import {
  LoginWithEmailAndPassword,
  getUserWithCookie,
} from "../../store/actions/AuthActions";
import { connect } from "react-redux";
import Cookies from "js-cookie";



const Login = (props) => {
    const history = useHistory();
    const {setUserState,setError} = props;
    const [inputDetails,setInputDetails] = useState({
      email:'',
      password:''
    })
  

    const handleLoginSubmit = (e) => {
      e.preventDefault();
      Cookies.remove("connect.sid");
      if(inputDetails.email != '' && inputDetails.password != ''){
        props.LoginWithEmailAndPassword(inputDetails.email, inputDetails.password);
      }
    }
    const loginWithGoogle = (service) => {
      Cookies.remove("connect.sid");
      try{
        let timer: NodeJS.Timeout | null = null;
        const AuthUrl = `${process.env.REACT_APP_BACKENDAPI}/auth/${service}`;
        const newWindow = window.open(
          AuthUrl,
          "_blank",
          "width=500,height=600"
        );
        if (newWindow) {  
          timer = setInterval( async() => {
            if (newWindow.closed) {
              console.log("Yay we're authenticated");
              props.getUserWithCookie()
              if (timer) clearInterval(timer);
              console.log("finish")
            }
          }, 500);
        }
        
      }catch(err){
        console.log(err.message)
      }
     
    }

    return (
      <>
      <Navbar/>
      <div className="container-main">
  <div className="container container-main col-xxl-8 px-4">
    <main className="form-signin">
  
  <form onSubmit={(e) => {handleLoginSubmit(e)}}>
    <h1 className="h3 mb-3 fw-normal text-center mt-5">Welcome Back</h1>
    <div className="form-floating">
      <input 
        type="email" 
        className="form-control" 
        id="floatingInput" 
        placeholder="name@example.com"
        value={inputDetails.email}
        onChange={e => setInputDetails({...inputDetails,email:e.target.value})}
        />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input 
        type="password" 
        className="form-control" 
        id="floatingPassword" 
        placeholder="Password"
        value={inputDetails.password}
        onChange={e => setInputDetails({...inputDetails,password:e.target.value})}
        />
      <label for="floatingPassword">Password</label>
    </div>
    <div className="checkbox mb-3">
      <label>
        <Link to="#" className="small-text">Forgot Password?</Link>
      </label>	    
    </div>
	<div className="text-center">
    <button className="btn btn-primary btn-lg px-4 me-md-2 btn-custom-style" type="submit">Sign in</button>  
	</div>
  <div className="social-container">
    <span>Or sign-in with:-</span><br />
    <div className="socialIconsDiv">
      <img onClick={(e) => loginWithGoogle('google')} src={Google} alt="google-login" className="socialIcon" />
      <img onClick={(e) => loginWithGoogle('facebook')} src={Facebook} alt="facebook-login" className="socialIcon" />
    </div>
  </div>
  </form>
</main>
  </div>
  </div>
        
        </>
    )
}
const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
});
export default connect(mapStateToProps, {
  LoginWithEmailAndPassword,
  getUserWithCookie,
})(Login);

