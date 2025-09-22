import "./Profile.css";
import profile from "../../assets/img/profile_avatar.png";
import marouf from "../../assets/img/marouf.jpeg";
import { useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";

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
            <img src={marouf} alt="profile avatar" />
            <h3>Marouf Ebrahimi</h3>
            <h4>Software Engineer</h4>
            <p>
              Engineer skilled in building scalable, efficient, high-performance
              applications.
            </p>

            <div className="profile_social dis_f gap_10">
              <a
                href="https://www.linkedin.com/in/maroufebrahimi/"
                target="_blank"
              >
                <Icon.Linkedin />
              </a>
              <a href="https://github.com/MaroufEbrahimi" target="_blank">
                <Icon.Github />
              </a>
              <a
                href="https://www.instagram.com/marouf_fm?igsh=cXo4bnhxa2VrYjVt"
                target="_blank"
              >
                <Icon.Instagram />
              </a>
              <a
                href="https://www.facebook.com/share/1HwdtUUJUF/"
                target="_blank"
              >
                <Icon.Facebook />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
