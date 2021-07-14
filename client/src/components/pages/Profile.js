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

    if(props.auth.loading === true){
        return "Loading"
    }else{
    return (        
        <div>            
            Welcome {location.state.username}
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
  