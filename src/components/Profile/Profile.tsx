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
            <img src={profile} alt="profile avatar" />
            <h3>Marouf Ebrahimi</h3>
            <h4>Software Engineer</h4>
            <p>
              Engineer skilled in building scalable, efficient, high-performance
              applications.
            </p>

            <div className="profile_social dis_f gap_15">
              <a href="">
                <i>i</i>
              </a>
              <a href="">
                <i>i</i>
              </a>
              <a href="">
                <i>i</i>
              </a>
              <a href="">
                <i>i</i>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
