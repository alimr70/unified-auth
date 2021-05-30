import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Logout from "./Logout";

const Profile = () => {
  const image = useSelector((state) => state.auth.image);
  const username = useSelector((state) => state.auth.username);
  const history = useHistory();
  return (
    <div className="home-page-container">
      <div className="home-page">
        {image !== null ? <img src={image} alt="profile-pic" /> : ""}
        <p>Welcome {username}</p>
        <div
          className="social-button"
          onClick={() => {
            history.push("/");
          }}>
          <p className="social-title">Visit home page</p>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
