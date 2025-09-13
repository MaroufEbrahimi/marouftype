import "./Profile.css";
import profile from "../../assets/img/profile_avatar.png";
import { useEffect, useRef, useState } from "react";
const Profile = () => {
  const [profileBox, setProfileBox] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".profile_circle")
      ) {
        setProfileBox(false);
      }
    };

    if (profileBox) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileBox]);

  return (
    <div className="profile">
      <div
        className="profile_circle dis_f c_aic c_jcc cur_p"
        onClick={() => setProfileBox((prev) => !prev)}
      >
        <img src={profile} alt="profile avatar" />
      </div>

      {profileBox && (
        <div className="profile_box" ref={boxRef}>
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
