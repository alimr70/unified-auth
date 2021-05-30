import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import * as actions from "./redux/actions/actions";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(actions.getAlreadyLoggedinUserData());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {isLoading ? <Loading /> : ""}
        <div className="container">
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <HomePage />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/login`}>
              {isAuthenticated ? (
                <Redirect to={`${process.env.PUBLIC_URL}`} />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/signup`}>
              {isAuthenticated ? (
                <Redirect to={`${process.env.PUBLIC_URL}`} />
              ) : (
                <SignUpPage />
              )}
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/profile`}>
              {isAuthenticated ? (
                <Profile />
              ) : (
                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
