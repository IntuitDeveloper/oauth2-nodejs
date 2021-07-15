import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    SET_USER_DATA,
    USER_LOGGED_OUT,
    UPDATE_USER_DATA,
    RESET_PASSWORD
  } from "../actionTypes/AuthActionTypes";
  
  import AuthServices from "../../services/AuthServices";
  
  
  export function LoginWithEmailAndPassword(email, password) {
    return async (dispatch) => {
      dispatch({
      type: LOGIN_LOADING,
    });
    const response = await AuthServices.loginWithEmailAndPassword(email, password);
    dispatch({
      type: SET_USER_DATA,
      payload: response,
    });
    dispatch({
      type: LOGIN_SUCCESS,
    });
    }
}
  export function getUserWithCookie() {
    return async (dispatch) => {
      dispatch({
        type: LOGIN_LOADING,
      });
      const response = await AuthServices.getUserWithCookie();
      dispatch({
        type: SET_USER_DATA,
        payload: response,
      });
      dispatch({
        type: LOGIN_SUCCESS,
      });
    };
  }
  
  export function sendResetLinkToEmail(email) {
    return async (dispatch) => {
      const response = await AuthServices.sendResetLinkToEmail(email);
      // dispatch({
      //   type: RESET_PASSWORD,
      //   payload: email
      // });
    };
  }
  export function resetPassword(password,confirmPassword,token) {
    return async (dispatch) => {
      const response = await AuthServices.resetPassword(password,confirmPassword,token);
      // dispatch({
      //   type: RESET_PASSWORD,
      //   payload: email
      // });
    };
  }
