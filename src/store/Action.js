import {
  ADD_BOOK_FAILED,
  ADD_BOOK_SUCCESS,
  AUTHENTICATED,
  GET_BOOKS,
  GET_FIXED_VALUES,
  LOADING_END,
  LOADING_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from "./Constant";

export const authenticated = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/authenticated`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const json = await response.json();

    if (json.success) {
      dispatch({
        type: AUTHENTICATED,
        payload: true,
      });
    } else {
      dispatch({
        type: AUTHENTICATED,
        payload: false,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTHENTICATED,
      payload: false,
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(authenticated());
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // ✅ Fixed
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(authenticated()); // This is fine.
    } else {
      dispatch({
        type: LOGIN_FAILED,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.message || "Something went wrong",
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const signup = (email) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          message: result.message,
          email: email,
        },
      });
    } else {
      dispatch({
        type: SIGNUP_FAILED,
        payload: result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: error.message || "Something went wrong", // Fixed this line
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const register = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/register`, {
      method: "POST",
      body: data, // Assuming 'data' is FormData, no need to set headers
    });

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: result.message,
      });
    } else {
      dispatch({
        type: REGISTER_FAILED,
        payload: result.error || "Registration failed",
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.message || "Something went wrong", // Fixed this
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/add-book`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: ADD_BOOK_SUCCESS,
        payload: result.message,
      });
    } else {
      dispatch({
        type: ADD_BOOK_FAILED,
        payload: result.error || "Registration failed",
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_BOOK_FAILED,
      payload: error.message || "Something went wrong", // Fixed this
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const fixdeValues = () => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fixed-values/all-values`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_FIXED_VALUES,
        payload: result,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const getBooks = () => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/all-books?page=1&limit=10`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_BOOKS,
        payload: result,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};
