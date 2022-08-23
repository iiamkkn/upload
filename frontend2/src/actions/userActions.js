import Axios from 'axios';
import { AxiosInstance } from '../api/AxiosInstance';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
} from '../constants/userConstants';

export const register =
  (name, username, email, password) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, username, email, password },
    });
    try {
      const { data } = await AxiosInstance.post('/api/users/register', {
        name,
        username,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const SellerRegister =
  (name, isSeller, username, email, password) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, isSeller, username, email, password },
    });
    try {
      const { data } = await AxiosInstance.post('/api/users/join_seller', {
        name,
        isSeller,
        username,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    // window.location.reload();
    const { data } = await AxiosInstance.post('/api/users/signin', {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  window.location.reload();
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/index';
};
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await AxiosInstance.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await AxiosInstance.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const Store_verification = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await AxiosInstance.put(
      `/api/users/store/verification`,
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await AxiosInstance.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await AxiosInstance.get('/api/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await AxiosInstance.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};
export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await AxiosInstance.get('/api/users/top-sellers');
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};

// v1 actions

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_ERRORS',
  });
};

export const signinv1 = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
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
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.userInfo });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerv1 = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

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
      type: USER_REGISTER_SUCCESS,
      payload: data.userInfo,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUserv1 = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await AxiosInstance.get('/api/users/profile/me/v1');

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.userInfo,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logoutv1 = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  try {
    await AxiosInstance.get(`/api/users/logoutv1/${userId}`);

    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
      type: USER_SIGNOUT_SUCCESS,
    });
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/index';
  } catch (error) {
    dispatch({
      type: USER_SIGNOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
