import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleSignupSubmit } from "../redux/utils/utils";
import { useHistory } from "react-router";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        handleSignupSubmit(e, username, password, dispatch, history);
      }}>
      <div className="form-input social-button">
        <div className="social-icon">
          <img src="./img/email.svg" alt="email" />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
      </div>
      <div className="form-input social-button">
        <div className="social-icon">
          <img src="./img/lock.svg" alt="password" />
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
      </div>
      <button className="social-button social-login-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpPage;
