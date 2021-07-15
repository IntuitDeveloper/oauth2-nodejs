import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import Navbar from '../../common/Navbar';
import '../../../assets/css/common.css'
import {
  sendResetLinkToEmail,
} from "../../../store/actions/AuthActions";
import { connect } from "react-redux";



const Login = (props) => {
    const history = useHistory();
    const [forgotEmail,setForgotEmail] = useState('');
    const [errormsg , setErrormsg] = useState();
  

    const handleMailSend = async(e) => {
      e.preventDefault();
      if(forgotEmail != ''){
        //history.push("/profile")
        console.log(forgotEmail)
        props.sendResetLinkToEmail(forgotEmail);
      }
    }

    return (
      <>
      <Navbar/>
      <div className="container-main">
  <div className="container container-main col-xxl-8 px-4">
    <main className="form-signin">
  <form onSubmit={(e) => handleMailSend(e)}>
    <h1 className="h3 mb-3 fw-normal text-center mt-5">Forgot Password</h1>
    <div className="form-floating">
      <input 
        type="email" 
        className="form-control" 
        id="floatingInput" 
        placeholder="name@example.com"
        value={forgotEmail}
        onChange={e => setForgotEmail(e.target.value)}
        />
      <label for="floatingInput">Email address</label>
    </div>
    <label className="error_color">
    {errormsg}
      </label>	
	<div className="text-center">
    <button className="btn btn-primary btn-lg px-4 me-md-2 btn-custom-style" type="submit">Send Reset Link</button>  
	</div>
    <div className="checkbox mb-3">
      <label>
        <Link to="/login" className="small-text">Login Instead.</Link>
      </label>	    
    </div>
  </form>
</main>
  </div>
  </div>
 </>
    )
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  sendResetLinkToEmail
})(Login);

