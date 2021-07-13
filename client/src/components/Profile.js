import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios'

const Profile = ({userState}) => {
    const history = useHistory();

//     const fetchAuthUser = async () => {
//         const res = await axios.get("http://localhost:3000/auth/user", { withCredentials: true })
//         .catch((err) => {
//           console.log("Not properly authenticated");
//           setError({
//             show:true,
//             msg:'Not properly authenticated'
//           })
//           setUserState({
//             isLoggedIn:false,
//             user:null
//           })
//           // alert(error.msg)
//     }) 
//         if(res && res.data){
//           setUserState({
//             isLoggedIn:true,
//             user:res.data
//           })
//           console.log(res.data)
//           history.push('/profile')
//         }
       
//   };
  
    // const handleQuickBookConnect = async () => {
    //   let timer: NodeJS.Timeout | null = null;
    //   const URI = "http://localhost:3000/connect_handler";
    //   const newWindow = window.open(
    //     URI,
    //     "_blank",
    //     "width=800,height=600"
    //   );
  
    //   if (newWindow) {
    //     timer = setInterval(() => {
    //       if (newWindow.closed) {
    //         console.log("Yay we're authenticated");
    //         // fetchAuthUser();
    //         if (timer) clearInterval(timer);
    //       }
    //     }, 500);
    //   }
    // };

    console.log(userState)
    useEffect(()=>{
        if(userState.isLoggedIn === false){
          history.push('/login')
        }
    },[userState])
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
