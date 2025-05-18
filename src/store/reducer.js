import { ADD_BOOK_FAILED, ADD_BOOK_SUCCESS, AUTHENTICATED, CLEAR_MESSAGE, GET_BOOKS, GET_FIXED_VALUES, GET_SINGLE_BOOK, LOADING_END, LOADING_START, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS, UPDATE_BOOK_FAILED, UPDATE_BOOK_SUCCESS } from "./Constant";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  loaded: false,
  message: {},
  signupEmail: "",
  registerSuccess: "",
  fixedValues: {},
  bookAdded: false,
  books: {},
  singleBook: {},
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
        bookAdded: false,
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
    case GET_FIXED_VALUES:
      return {
        ...state,
        fixedValues: action.payload,
      };   
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        message: {message: action.payload, status: "success"},
        bookAdded: true,
      };   
    case ADD_BOOK_FAILED:
      return {
        ...state,
        message: {message: action.payload, status: "error"},
      };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        message: {message: action.payload, status: "success"},
        bookAdded: true,
      };   
    case UPDATE_BOOK_FAILED:
      return {
        ...state,
        message: {message: action.payload, status: "error"},
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case GET_SINGLE_BOOK:
      return {
        ...state,
        singleBook: action.payload
      };
    default:
      return state;
  }
};
