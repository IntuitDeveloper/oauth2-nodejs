import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import Navbar from '../../common/Navbar';
import '../../../assets/css/common.css'
import Footer from "../../common/Footer"
import {
  getUserWithCookie,
} from "../../../store/actions/AuthActions";
import { connect } from "react-redux";



const Signup = (props) => {
    const history = useHistory();
    const [inputDetails,setInputDetails] = useState({
        fName:'',
        lName:'',
        email:'',
        password:'',
        company:'',
        mNumber:''
    });
    const [errormsg , setErrormsg] = useState();
  

    const handleSignupSubmit = async(e) => {
      e.preventDefault();
      const validInput = (
          inputDetails.fName === '' ||
          inputDetails.lName === '' ||
          inputDetails.email === '' ||
          inputDetails.password === '' ||
          inputDetails.company === '' ||
          inputDetails.mNumber === ''
        )



      if(!validInput){
    //   await props.LoginWithEmailAndPassword(inputDetails.email, inputDetails.password);
    //   var log_user = JSON.parse(localStorage.getItem("user"));        
    //     if(log_user != null && log_user.email != null && log_user.email != "")
    //     {
    //       setErrormsg("");
    //     history.push({ 
    //       pathname: '/profile',
    //       state: {"username" : log_user.email}
    //      });
    //     }
    //     else
    //     {
    //       setErrormsg("Login Failed");
    //     }
      }else{
        setErrormsg("Some fields are missing");
      }
    }
  
    return (
      <>
      <Navbar/>
      <div className="container px-5 py-5">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-12 p-3 p-lg-5 pt-lg-3">
        <h3 className="display-4 fw-bold lh-1 mb-3 text-center pb-3">Sign up with a free account</h3>
       <form onSubmit={(e) => handleSignupSubmit(e)}>
	
    <div className="row">
    <div className="col-6">
    <div className="form-floating">
      <input
       type="text" 
       className="form-control" 
       id="floatingInput" 
       placeholder="Ankit"
       value={inputDetails.fName}
       onChange={e => setInputDetails({...inputDetails, fName: e.target.value})}
    />
      <label for="floatingInput">First name</label>
    </div>
    </div>
	<div className="col-6">
    <div className="form-floating">
      <input 
      type="text" 
      className="form-control" 
      id="floatingInput" 
      placeholder="Jaiswal" 
      value={inputDetails.lName}
      onChange={e => setInputDetails({...inputDetails, lName: e.target.value})}
    />
      <label for="floatingInput">Last name</label>
    </div>
    </div>
	<div className="col-12">
    <div className="form-floating">
      <input 
      type="email" 
      className="form-control" 
      id="floatingInput" 
      placeholder="name@example.com"
      value={inputDetails.email}
      onChange={e => setInputDetails({...inputDetails, email: e.target.value})}
    />
      <label for="floatingInput">Email address</label>
    </div>
    </div>
    <div className="col-12">
    <div className="form-floating">
      <input 
      type="password" 
      placeholder="Password"
      className="form-control" 
      id="floatingInput" 
      value={inputDetails.password}
      onChange={e => setInputDetails({...inputDetails, password: e.target.value})}
    />
      <label for="floatingInput">Password</label>
    </div>
    </div>
	<div className="col-12">
    <div className="form-floating">
      <input 
      type="text" 
      className="form-control" 
      id="floatingInput" 
      placeholder="76East"
      value={inputDetails.company}
      onChange={e => setInputDetails({...inputDetails, company: e.target.value})}
    />
      <label for="floatingInput">Company</label>
    </div>
    </div>
	<div className="col-12">
    <div className="form-floating">
      <input 
      type="tel" 
      className="form-control" 
      id="floatingInput" 
      placeholder="6332943251" 
      value={inputDetails.mNumber}
      onChange={e => setInputDetails({...inputDetails, mNumber: e.target.value})}
    />
      <label for="floatingInput">Mobile number</label>
    </div>
    </div>
	<div className="text-center mb-3 mt-3">
    <button className="btn btn-primary btn-lg px-4 me-md-2" type="submit">Create Account</button>  
	</div>
	<div className="text-center">
      <label>Have an account? 
        <Link to="/login" className="small-text">Sign In</Link>
      </label>	    
    </div>
	</div>
  </form>
      </div>
    </div>
  </div>
  <Footer />
    </>
    )
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserWithCookie,
})(Signup);

