import { AUTHENTICATED, CLEAR_MESSAGE, LOADING_END, LOADING_START, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS } from "./Constant";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  loaded: false,
  message: {},
  signupEmail: "",
  registerSuccess: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };    
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
        loaded: false,
      };    
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
        loaded: true,
      };  
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: {},
        registerSuccess: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: {message: "Login Successfull", status: "success"},
      };    
    case LOGIN_FAILED:
      return {
        ...state,
        message: {message: action.payload, status: "error"},
      };    
    case SIGNUP_FAILED:
      return {
        ...state,
        message: {message: action.payload, status: "error"},
      };    
    case REGISTER_FAILED:
      return {
        ...state,
        message: {message: action.payload, status: "error"},
      };    
    case SIGNUP_SUCCESS:
      return {
        ...state,
        message: {message: action.payload.message, status: "success"},
        signupEmail: action.payload.email
      };   
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: {message: action.payload, status: "success"},
        registerSuccess: true,
        signupEmail: ""
      };   
    default:
      return state;
  }
};
