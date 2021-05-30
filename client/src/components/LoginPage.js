import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginSubmit } from "../redux/utils/utils";
import Loading from "./Loading";
import { useHistory } from "react-router";

const LoginPage = () => {
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <div className="social-madia">
      {isLoading ? <Loading /> : ""}
      <SocialMediaBtn
        platform="Google"
        imgSrc="./img/btn_google_dark_normal_ios.svg"
        url={`/auth/google`}
      />
      {/* <SocialMediaBtn
        platform="Facebook"
        imgSrc="./img/f_logo_RGB-Blue_58.png"
        url={`/auth/facebook`}
      /> */}
      <SocialMediaBtn
        platform="Twitter"
        imgSrc="./img/Twitter_social_icons_circle_blue.png"
        url={`/auth/twitter`}
      />
      <div className="divider">
        <span className="dividerLine"></span>
        <span className="dividerText">OR</span>
        <span className="dividerLine"></span>
      </div>
      <LoginForm />
      <p>
        Don't have an account?
        <span
          style={{ cursor: "pointer" }}
          className="social-title"
          onClick={() => {
            history.push("/signup");
          }}>
          Sign Up!
        </span>
      </p>
    </div>
  );
};

const SocialMediaBtn = ({ platform, imgSrc, url }) => {
  return (
    <div
      className="social-button"
      onClick={() => {
        window.open(url, "_self");
        // window.open(
        //   url,
        //   "mywindow",
        //   "location=1,status=1,scrollbars=1, width=800,height=800"
        // );
        // window.addEventListener("message", (message) => {
        //   //message will contain user token
        //   // console.log(message.data);
        //   dispatch(actions.setToken(message.data.token));
        // });
      }}>
      <div className="social-icon">
        <img src={imgSrc} alt={"Continue with " + platform} />
      </div>
      <p className="social-title">Continue with {platform}</p>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="login-form"
      onSubmit={(e) =>
        handleLoginSubmit(e, username, password, dispatch, history)
      }>
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
        Log In
      </button>
    </form>
  );
};

export default LoginPage;
