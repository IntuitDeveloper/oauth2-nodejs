import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios'

const Profile = ({userState}) => {
    const history = useHistory();
    console.log(userState)

    useEffect(() => {
        if(userState.isLoggedIn ===false){
            history.push('/login')
        }
    },[])

    if(userState.user === null){
        return "Loading"
    }else{
    return (
        <div>
            Welcome  {userState.user.displayName}
            <br />
            {/* <button onClick={handleQuickBookConnect}>Connect To QuickBooks</button> */}
        </div>
    )
}
}

export default Profile
