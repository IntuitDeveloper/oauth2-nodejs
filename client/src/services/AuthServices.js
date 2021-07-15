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
        console.log("login response = ",JSON.stringify(apiResponse.data));
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
static async sendResetLinkToEmail(email) {
  const url = `/api/generateResetLink`;
  const body = {email};
  try {
    console.log(body)
    return body;
    // const response = await axios.post(url,body);
    //   console.log(response)
    //   return response
  } catch (err) {
    console.log("Error Sending Link!");
  }
}

static async resetPassword(password,confirmPassword) {
  const url = `/api/reset-password`;
  const body = {password,confirmPassword};
  try {
    console.log(body)
    return body;
    // const response = await axios.post(url,body);
    //   console.log(response)
    //   return response
  } catch (err) {
    console.log("Error Sending Link!");
  }
}

  static async updateUser(user) {


  }
}

export default AuthServices;
