import axios from 'axios';
import { AxiosInstance } from '../api/AxiosInstance';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  ACCOUNT_VERIFY_REQUEST,
  ACCOUNT_VERIFY_SUCCESS,
  ACCOUNT_VERIFY_FAIL,
  ACCOUNT_VERIFY_REQUEST_SUCCESS,
  ACCOUNT_VERIFY_SUCCESS_SUCCESS,
  ACCOUNT_VERIFY_FAIL_SUCCESS,
} from '../constants_v1/userConstants';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await AxiosInstance.post(
      '/api/users/loginv1',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await AxiosInstance.post(
      '/api/users/registerv1',
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await AxiosInstance.get('/api/users/profile/me/v1');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await AxiosInstance.put(
      '/api/v1/me/update',
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await AxiosInstance.put(
      '/api/v1/password/update',
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword_FUNC = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await AxiosInstance.post(
      '/api/pass/password/forgot',
      email,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password
export const resetPassword_FUNC = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await AxiosInstance.put(
      `/api/pass/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = (userId) => async (dispatch) => {
  try {
    await AxiosInstance.get(`/api/users/logoutv1/${userId}`);

    localStorage.removeItem('userInfo');
    // localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all users
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await AxiosInstance.get('/api/v1/admin/users');

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await AxiosInstance.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await AxiosInstance.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await AxiosInstance.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Register and verify account
export const Register_verify =
  (name, username, email, password) => async (dispatch) => {
    try {
      // dispatch({ type: ACCOUNT_VERIFY_REQUEST, payload: { email, password } });
      dispatch({ type: ACCOUNT_VERIFY_REQUEST });
      const { data } = await AxiosInstance.post('/api/users/register/verify', {
        name,
        username,
        email,
        password,
      });
      dispatch({ type: ACCOUNT_VERIFY_SUCCESS, payload: data });
      // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ACCOUNT_VERIFY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const Register_verify_Success =
  (RegisterverifyToken) => async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_VERIFY_REQUEST_SUCCESS });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await AxiosInstance.post(
        `/api/users/email-activate/account/${RegisterverifyToken}`,
        RegisterverifyToken,
        config
      );

      dispatch({
        type: ACCOUNT_VERIFY_SUCCESS_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_VERIFY_FAIL_SUCCESS,
        payload: error.response.data.message,
      });
    }
  };

//   // Reset password
// export const resetPassword_FUNC = (token, passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_PASSWORD_REQUEST });

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const { data } = await AxiosInstance.put(
//       `/api/users/password/reset/${token}`,
//       passwords,
//       config
//     );

// const { data } = await AxiosInstance.post(
//   `/api/users/email-activate/account`,

//   {
//     headers: { Authorization: `Bearer ${RegisterverifyToken}` },
//   }
// );
