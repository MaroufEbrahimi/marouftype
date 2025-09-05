import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_box_right dis_f gap_25">
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">4</div>
          <div className="navbar_inner_box_text">کلمه/دقیقه</div>
        </div>
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">0</div>
          <div className="navbar_inner_box_text">حرف/دقیقه</div>
        </div>
        <div className="navbar_inner_box">
          <div className="navbar_inner_box_circle">0</div>
          <div className="navbar_inner_box_text">% دقت</div>
        </div>
      </div>
      <div className="navbar_box">2</div>
    </div>
  );
};

export default Navbar;
