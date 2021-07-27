import axios from "axios";
import * as actions from "../actions/actions";

export const handleLoginSubmit = async (
  e,
  username,
  password,
  dispatch,
  history
) => {
  e.preventDefault();
  const config = {
    method: "post",
    url: `/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      password,
    },
    withCredentials: true,
  };

  try {
    dispatch(actions.userLoading());
    // Get Token
    const res = await axios(config);
    if (res.data) {
      const { token } = res.data;

      // get user data with session
      axios({
        method: "get",
        url: `/auth/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).then((res) => {
        if (res.data) {
          const { token, username, image } = res.data;
          dispatch(actions.loginSuccess(token, username, image));
          history.push("/");
        } else {
          dispatch(actions.loginFail());
        }
      });
    } else {
      dispatch(actions.loginFail());
    }
  } catch (err) {
    if (err.response) {
      dispatch(
        actions.returnErrors(err.response.data.msg, err.response.status)
      );
      dispatch(actions.loginFail());
    } else {
      dispatch(actions.loginFail());
      console.error(err);
    }
  }
};

export const handleSignupSubmit = (
  e,
  username,
  password,
  dispatch,
  history
) => {
  e.preventDefault();
  const config = {
    method: "post",
    url: `/auth/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      password: password,
    },
  };

  axios(config)
    .then((res) => {
      if (res.data) {
        const { token, username, image } = res.data;
        dispatch(actions.loginSuccess(token, username, image));
        history.push("/");
      } else {
        dispatch(actions.loginFail());
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          actions.returnErrors(err.response.data.msg, err.response.status)
        );
        dispatch(actions.loginFail());
      } else {
        dispatch(actions.loginFail());
        console.error(err);
      }
    });
};
