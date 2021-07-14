import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    SET_USER_DATA,
    USER_LOGGED_OUT,
    UPDATE_USER_DATA,
  } from "../actionTypes/AuthActionTypes";
  
  const initialState = {
    success: false,
    loading: false,
    error: null,
    user:null
  };
  
  const AuthReducer = function(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                error: null,
                user:action.payload,
                loading: false,
                success: true
            };
            }
            case UPDATE_USER_DATA: {
            return {
                ...state,
                error: null,
                user:action.payload,
                loading: false,
                success: true
            };
            }
            case USER_LOGGED_OUT: {
            return initialState;
            }
        case LOGIN_LOADING: {
            return {
            ...state,
            loading: true
            };
        }
        case LOGIN_SUCCESS: {
            return {
            ...state,
            success: true,
            loading: false
            };
        }
        case LOGIN_ERROR: {
            return {
            ...state,
            success:false,
            loading:false,
            error: action.payload
            };
        }
        default: {
            return state;
        }
    }
  };
  
  export default AuthReducer;
  