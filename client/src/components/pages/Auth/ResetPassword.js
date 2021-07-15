import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import Navbar from '../../common/Navbar';
import '../../../assets/css/common.css'
import {
  resetPassword,
} from "../../../store/actions/AuthActions";
import { connect } from "react-redux";



const Login = (props) => {
    const history = useHistory();
    const {token} = props.match.params;
    console.log(token)
    const [resetDetails,setResetDetails] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errormsg , setErrormsg] = useState();
  

    const handleReset = async(e) => {
      e.preventDefault();
      if(resetDetails.password != '' && resetDetails.confirmPassword != ''){
        //history.push("/profile")
        console.log(resetDetails)
        props.resetPassword(resetDetails.password,resetDetails.confirmPassword,token)
      }
    }

    return (
      <>
      <Navbar/>
      <div className="container-main">
  <div className="container container-main col-xxl-8 px-4">
    <main className="form-signin">
  <form onSubmit={(e) => handleReset(e)}>
    <h1 className="h3 mb-3 fw-normal text-center mt-5">Reset Password</h1>
    <div className="form-floating">
      <input 
        type="password" 
        className="form-control" 
        id="floatingPassword" 
        placeholder="Password"
        value={resetDetails.password}
        onChange={e => setResetDetails({...resetDetails,password:e.target.value})}
        />
      <label for="floatingPassword">Password</label>
    </div>
    <div className="form-floating">
      <input 
        type="password" 
        className="form-control" 
        id="floatingPassword" 
        placeholder="Confirm Password"
        value={resetDetails.confirmPassword}
        onChange={e => setResetDetails({...resetDetails,confirmPassword:e.target.value})}
        />
      <label for="floatingPassword">Confirm Password</label>
    </div>
    <label className="error_color">
    {errormsg}
      </label>	
	<div className="text-center">
    <button className="btn btn-primary btn-lg px-4 me-md-2 btn-custom-style" type="submit">Change Password</button>  
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
  resetPassword,
})(Login);

