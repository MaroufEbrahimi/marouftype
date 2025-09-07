import Profile from "../Profile/Profile";
import "./Navbar.css";

interface NavbarProps {
  wordPerMin: number;
  charsPerMin: number;
}

const Navbar = ({ wordPerMin, charsPerMin }: NavbarProps) => {
  return (
    <div className="navbar">
      <div className="navbar_box_right dis_f gap_25">
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">{wordPerMin}</div>
          <div className="navbar_inner_box_text">کلمه/دقیقه</div>
        </div>
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">{charsPerMin}</div>
          <div className="navbar_inner_box_text">حرف/دقیقه</div>
        </div>
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">0</div>
          <div className="navbar_inner_box_text">% دقت</div>
        </div>
      </div>
      <div className="navbar_box">
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
