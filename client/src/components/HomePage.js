import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Logout from "./Logout";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const history = useHistory();
  return (
    <div className="home-page-container">
      <div className="home-page">
        <h1>Welcome{isAuthenticated ? `, ${username}` : ""}</h1>
        <h3>This is All In One Authentication app.</h3>
        <p>
          I made this app to be my boilerplate whenever I need to implement
          authentication in my projects. It provides authentication with Google,
          Facebook, Twitter, and username & password.
        </p>
        <p>Technology Stack: MonogoDB, Express, React, Node</p>
        {isAuthenticated ? (
          <>
            <div
              className="social-button"
              onClick={() => {
                history.push("/profile");
              }}>
              <p className="social-title">Visit your profile</p>
            </div>
            <Logout />
          </>
        ) : (
          <>
            <div
              className="social-button social-login-button"
              onClick={() => {
                history.push("/login");
              }}>
              Log In
            </div>
            <div
              className="social-button social-login-button"
              onClick={() => {
                history.push("/signup");
              }}>
              Sign Up
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
