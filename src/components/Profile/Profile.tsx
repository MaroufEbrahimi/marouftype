import "./Profile.css";
import profile from "../../assets/img/profile_avatar.png";
import { useState } from "react";
const Profile = () => {
  const [profileBox, setProfileBox] = useState(false);

  return (
    <div className="profile">
      <div
        className="profile_circle dis_f c_aic c_jcc cur_p"
        onClick={() => setProfileBox((prev) => !prev)}
      >
        <img src={profile} alt="profile avatar" />
      </div>

      {profileBox && (
        <div className="profile_box">
          <div className="profile_inner_box">
            <h2>not found</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
