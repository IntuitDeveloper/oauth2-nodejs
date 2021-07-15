import React,{useEffect} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import { connect } from "react-redux";

const Profile = (props) => {
    const history = useHistory();
    const location = useLocation();

    // useEffect(() => {
    //     if(props.auth.success === false || props.auth.user == null){
    //         history.push('/login')
    //     }
    // },[])

    const handleLogout = () =>{
        if(props.auth.user != null)
        {

        }
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        history.push('/login');
    }

    if(props.auth.loading === true){
        return "Loading"
    }else{
    return (        
        <div>            
            Welcome { props.auth.user != null && props.auth.user.displayName?props.auth.user.displayName: location.state.username}         
        <button onClick={handleLogout}>Logout</button> 

           
            {/* { props.auth.user != null && props.auth.user.displayName?props.auth.user.displayName:"User"} */}
              
            <br />
            {/* <button onClick={handleQuickBookConnect}>Connect To QuickBooks</button> */}
        </div>     
    )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
  export default connect(mapStateToProps)(Profile);
  