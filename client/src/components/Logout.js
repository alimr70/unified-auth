import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/actions";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="social-button"
      onClick={() => {
        dispatch(actions.logout());
      }}>
      <p className="social-title">Logout</p>
    </div>
  );
};

export default Logout;
