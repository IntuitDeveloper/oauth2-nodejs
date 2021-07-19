import axios from "axios";

class AuthServices {
  static async signup(body) {
    const url = `/auth/signup`;
    const headers = {
        'Content-Type': 'application/json'
      }
    const response  = await axios.post(url,body,{headers: headers});
      // if(response.statusCode)
    return response.data;
      
  }


  static async loginWithEmailAndPassword(email,password) {
    const url = `/auth/login`;
    const body = {
      email: email,
      password: password
    };
    const headers = {
        'Content-Type': 'application/json'
      }
    try {
        const apiResponse = await axios.post(url,body,{headers: headers});
        console.log((apiResponse.data.success))
        // console.log("login response = ",JSON.stringify(apiResponse.data));
        if(apiResponse.data.success)
        {
        localStorage.setItem('user', JSON.stringify(apiResponse.data.user))
        localStorage.setItem('token', JSON.stringify(apiResponse.data.token))
        }
        return apiResponse.data;
      } catch (err) {
    }
  }
  static async getUserWithCookie() {
    const url = `/auth/user`;
    try {
      const Response = await axios.get(url, { withCredentials: true });
      if(Response && Response.data){
        return Response.data
      }
    } catch (err) {
      console.log("Not properly authenticated");
  }
}
static async sendResetLinkToEmail(email) {
  const url = `/auth/getResetPassLink`;
  const body = {email};
  try {
    const response = await axios.post(url,body);
      console.log(response)
      return response.data
  } catch (err) {
    console.log(err.message);
  }
}

static async resetPassword(password,confirmPassword,token) {
  const url = `/auth/reset-password`;
  const body = {
    password,
    confirmPassword,
    token
  };
  try {
    const response = await axios.post(url,body);
      console.log(response)
      return response.data
  } catch (err) {
    console.log(err.message);
  }
}

  static async updateUser(user) {


  }
}

export default AuthServices;
