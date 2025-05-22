import {
  AUTHENTICATED,
  GET_BOOKS,
  GET_FIXED_VALUES,
  GET_SINGLE_BOOK,
  GET_SINGLE_TEACHER,
  GET_TEACHERS,
  LOADING_END,
  LOADING_START,
  REGISTER_SUCCESS,
  SIGNUP_SUCCESS,
  GET_STUDENTS,
  GET_SINGLE_STUDENT,
  GET_ADMINS,
  GET_SINGLE_ADMIN,
  MESSAGE,
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
      dispatch(getProfile());
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
      dispatch({
        type: MESSAGE,
        paylaod: {
          message: "Logout Success",
          status: "success",
          path: "/auth/login",
        },
      });
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
        type: MESSAGE,
        payload: {
          message: "Login Successfull!",
          status: "success",
          path: "/dashboard",
        },
      });
      dispatch(authenticated()); // This is fine.
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: data.error || "Login failed!",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
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
        type: MESSAGE,
        payload: {
          message: result.error || "Unable to signup",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
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
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
    MESSAGE;
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-profile`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch(getProfile());
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Profile Updated Successfully!",
          status: "success",
          path: "/dashboard/profile",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};
export const updateProfilePassword = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-password`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Password Updated Successfully!",
          status: "success",
          path: "/dashboard/profile",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update password",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
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
        type: MESSAGE,
        payload: {
          message: result.message || "Book Added!",
          status: "success",
          path: "/dashboard/books",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
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
        type: MESSAGE,
        payload: {
          message: result.message,
          status: "success",
          path: "/dashboard/books",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Update failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
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

    if (result) {
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

export const getTeachers =
  (filters = {}) =>
  async (dispatch) => {
    dispatch({ type: LOADING_START });
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      // Set default pagination if not provided
      params.set("page", filters.page || 1);
      params.set("limit", filters.limit || 10);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/admin/all-teachers?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: GET_TEACHERS,
          payload: result,
        });
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      dispatch({ type: LOADING_END });
    }
  };
export const addTeacher = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/create-teacher`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Teacher Added",
          status: "success",
          path: "/dashboard/teachers",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Teacher registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const getTeacherById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/teacher-details/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_SINGLE_TEACHER, // Make sure this action type exists
        payload: result.teacher, // Adjust based on actual response structure
      });
    }
  } catch (error) {
    console.error("Failed to fetch teacher by ID:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const updateTeacher = (id, data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-teacher/${id}`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Teacher Updated",
          status: "success",
          path: "/dashboard/teachers",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update teacher profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

// ====================

export const getStudents =
  (filters = {}) =>
  async (dispatch) => {
    dispatch({ type: LOADING_START });
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      // Set default pagination if not provided
      params.set("page", filters.page || 1);
      params.set("limit", filters.limit || 10);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/admin/all-students?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: GET_STUDENTS,
          payload: result,
        });
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      dispatch({ type: LOADING_END });
    }
  };
export const addStudent = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/create-student`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Student Added",
          status: "success",
          path: "/dashboard/students",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Student registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const getStudentById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/student-details/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_SINGLE_STUDENT, // Make sure this action type exists
        payload: result.student, // Adjust based on actual response structure
      });
    }
  } catch (error) {
    console.error("Failed to fetch student by ID:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const updateStudent = (id, data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-student/${id}`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Student Updated",
          status: "success",
          path: "/dashboard/students",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update student profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

// ===========================

export const getAdmins =
  (filters = {}) =>
  async (dispatch) => {
    dispatch({ type: LOADING_START });
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      // Set default pagination if not provided
      params.set("page", filters.page || 1);
      params.set("limit", filters.limit || 10);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/admin/all-admins?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: GET_ADMINS,
          payload: result,
        });
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      dispatch({ type: LOADING_END });
    }
  };

export const getAdminById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/admin-details/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: GET_SINGLE_ADMIN, // Make sure this action type exists
        payload: result.admin, // Adjust based on actual response structure
      });
    }
  } catch (error) {
    console.error("Failed to fetch admin by ID:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/profile`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: "GET_PROFILE", // Make sure this action type exists
        payload: result.admin, // Adjust based on actual response structure
      });
    }
  } catch (error) {
    console.error("Failed to fetch admin by ID:", error);
  }
};
