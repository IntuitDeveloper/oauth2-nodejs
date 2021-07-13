import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './common/Navbar';
import '../assets/css/common.css'
import Google from '../assets/icons/google.png'
import Facebook from '../assets/icons/facebook.png'
const Login = ({setUserState,setError}) => {
    const history = useHistory();
    const [inputDetails,setInputDetails] = useState({
      email:'',
      password:''
    })

    const fetchAuthUser = async () => {
        const res = await axios.get("http://localhost:3000/auth/user", { withCredentials: true })
        .catch((err) => {
          console.log("Not properly authenticated");
          setError({
            show:true,
            msg:'Not properly authenticated'
          })
          setUserState({
            isLoggedIn:false,
            user:null
          })
          // alert(error.msg)
    }) 
        if(res && res.data){
          setUserState({
            isLoggedIn:true,
            user:res.data
          })
          console.log(res.data)
          history.push('/profile')
        }
       
  };
  
    const socialLogin = async (str) => {
      let timer: NodeJS.Timeout | null = null;
      const googleLoginURL = `http://localhost:3000/auth/${str}`;
      const newWindow = window.open(
        googleLoginURL,
        "_blank",
        "width=500,height=600"
      );
  
      if (newWindow) {
        timer = setInterval(() => {
          if (newWindow.closed) {
            console.log("Yay we're authenticated");
            fetchAuthUser();
            if (timer) clearInterval(timer);
          }
        }, 500);
      }
    };

    const handleLoginSubmit = (e) => {
      e.preventDefault();
      if(inputDetails.email != '' && inputDetails.password != ''){
        // alert(inputDetails.email)
        axios.post('http://localhost:3000/login',inputDetails)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
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
      <img onClick={(e) => socialLogin('google')} src={Google} alt="google-login" className="socialIcon" />
      <img onClick={(e) => socialLogin('facebook')} src={Facebook} alt="facebook-login" className="socialIcon" />
    </div>
  </div>
  </form>
</main>
  </div>
  </div>
        
        </>
    )
}

export default Login
