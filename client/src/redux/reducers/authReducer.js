const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  username: null,
  image: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        username: action.payload.username,
        image: action.payload.image,
      };

    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "SIGNUP_FAIL":
      return {
        ...state,
        token: null,
        username: null,
        isAuthenticated: false,
        isLoading: false,
        image: null,
      };

    default:
      return state;
  }
};

export default authReducer;
