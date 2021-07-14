import axios from "axios";

class AuthServices {
  static async loginWithEmailAndPassword(email,password) {
    const url = `/api/login`;
    const body = {email,password};
    const headers = {
        'Content-Type': 'application/json'
      }
    try {
        const apiResponse = await axios.post(url,body,{headers: headers});
        return apiResponse.data;
      } catch (err) {
    }
  }
  static async getUserWithCookie() {
    const url = `/api/user`;
    try {
      const Response = await axios.get(url, { withCredentials: true });
      if(Response && Response.data){
        return Response.data
      }
    } catch (err) {
      console.log("Not properly authenticated");
  }
}

  static async updateUser(user) {


  }
}

export default AuthServices;
