import {
  ADD_BOOK_FAILED,
  ADD_BOOK_SUCCESS,
  AUTHENTICATED,
  GET_BOOKS,
  GET_FIXED_VALUES,
  GET_SINGLE_BOOK,
  LOADING_END,
  LOADING_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  UPDATE_BOOK_FAILED,
  UPDATE_BOOK_SUCCESS,
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // ✅ Fixed
        credentials: "include",
      }
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/register`,
      {
        method: "POST",
        body: data, // Assuming 'data' is FormData, no need to set headers
      }
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/add-book`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

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

export const updateBook = (bookId, data) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/update-book/${bookId}`,
      {
        method: "POST", // or use PUT/PATCH if your backend expects that
        body: data, // Assuming data is a FormData object
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      const savedFilters = localStorage.getItem("bookFilters");
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        dispatch(getBooks(parsedFilters)); // Re-fetch with saved filters
      } else {
        dispatch(getBooks()); // Fetch default if no filters
      }
      dispatch({
        type: UPDATE_BOOK_SUCCESS,
        payload: result.message,
      });
    } else {
      dispatch({
        type: UPDATE_BOOK_FAILED,
        payload: result.error || "Update failed",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_BOOK_FAILED,
      payload: error.message || "Something went wrong",
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

export const getBooks =
  (filters = {}) =>
  async (dispatch) => {
    dispatch({ type: LOADING_START });

    try {
      // Convert filters object to query string
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      // You can set page/limit dynamically if needed
      params.set("page", filters.page || 1);
      params.set("limit", filters.limit || 10);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/book/all-books?${params.toString()}`,
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
      console.error("Error fetching books:", error);
    } finally {
      dispatch({ type: LOADING_END });
    }
  };

export const getBookBySlug = (slug) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/get-book/${slug}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_SINGLE_BOOK, // Make sure this action type is defined in your reducers
        payload: result.data[0], // or result.data based on your API response shape
      });
    }
  } catch (error) {
    console.error("Failed to fetch book by slug:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};
