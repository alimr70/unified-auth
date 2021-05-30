import axios from "axios";
/* -------------------------------------------------------------------------- */
/*                                 Auth actions                               */
/* -------------------------------------------------------------------------- */

export const userLoading = () => {
  return { type: "USER_LOADING" };
};

export const loginSuccess = (token, username, image) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      token,
      username,
      image,
    },
  };
};

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: {
      token,
    },
  };
};

export const loginFail = () => {
  return { type: "LOGIN_FAIL" };
};

export const signupFail = () => {
  return { type: "SIGNUP_FAIL" };
};

export const logoutSuccess = () => {
  return { type: "LOGOUT_SUCCESS" };
};

export const getAlreadyLoggedinUserData = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const awaitedToken = await axios({
      method: "get",
      url: `/auth/refresh`,
      withCredentials: true,
    });

    if (awaitedToken.data.token) {
      const loadUserInfo = await axios({
        method: "get",
        url: `/auth/profile`,
        headers: {
          Authorization: `Bearer ${awaitedToken.data.token}`,
        },
        withCredentials: true,
      });

      if (loadUserInfo.data) {
        const { token, username, image } = loadUserInfo.data;
        dispatch(loginSuccess(token, username, image));
      } else {
        dispatch(loginFail());
      }
    }
  } catch (err) {
    dispatch(returnErrors(err.message));
    dispatch(loginFail());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const logoutRequest = await axios({
      method: "get",
      url: "/auth/logout",
      withCredentials: true,
    });

    if (logoutRequest.status === 200) {
      dispatch(logoutSuccess());
    }
  } catch (err) {
    console.log(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Error actions                               */
/* -------------------------------------------------------------------------- */

export const returnErrors = (msg, status) => {
  return {
    type: "RETURN_ERRORS",
    payload: {
      msg,
      status,
    },
  };
};

export const clearErrors = () => {
  return { type: "CLEAR_ERRORS" };
};
