import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import AdminSidebar from "../pages/admin/Sidebar";
import TeacherSidebar from "../pages/teacher/Sidebar";
import StudentSidebar from "../pages/student/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slice/userSlice";
import img from "../LOGO/LOGO.png";
import Marquee from "react-fast-marquee";
import { IoExitOutline, IoPerson } from "react-icons/io5";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
 const navigate = useNavigate();
 const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeUser());
    navigate('/')
  };

  const styles = {
    image: {
      height: "32px",
      width: "32px",
      objectFit: "cover",
    },
    dropdownMenu: {
      display: isHovered ? "block" : "none",
      opacity: isHovered ? 1 : 0,
      visibility: isHovered ? "visible" : "hidden",
      position: "absolute",
      right: 0,
      
    },
  };
  const role = localStorage.getItem('role')
   
  const user = useSelector((state) => state.userInfo.user);
  const text =
    "    SRIMATHY PADMAVATHI VIDYALAYA MATRICULATION HIGHER SECONDARY SCHOOL   ";
  
  return (
    <nav
      className="navbar navbar-expand-lg p-3   "
      style={{ 
        // backgroundColor: "#6D6D6D"
        backgroundColor:'navy'
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <img
            src={img}
            style={{
              height: "50px",
              width: "50px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            class="img-thumbnail rounded-pill "
            alt="..."
          />
          <Link className="text-decoration-none" to={"/"}>
            {" "}
            <p
              style={{ width: "420px", overflow: "hidden" }}
              className="h2 fw-bold text-light p-0 m-0"
            >
              <Marquee speed={75} style={{ overflow: "hidden" }}>
                <p className="p-0 m-0 me-5"> {text}</p>
              </Marquee>
            </p>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 fw-semibold gap-lg-4 mt-4 mt-lg-0">
            <li className="nav-item d-flex align-items-center justify-content-center  gap-2">
              <a className="nav-link text-light fs-5" href="#">
                {user ? user.name : ""}
              </a>

              <div class=" " id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li
                    class="nav-item dropdown"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >{ user &&
                    <img
                      class="btn p-0 dropdown-toggle img rounded-pill"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      src={user?.image || user?.img}
                      style={{
                        height: "32px",
                        width: "32px",
                        objectFit: "cover",
                      }}
                      alt="..."
                    />}

                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end"  style={styles.dropdownMenu}>
                      
                      <li>
                        <a class="dropdown-item fw-bold" href="#" onClick={()=>navigate(`${role}/profile`)}>
                          <IoPerson /> Profile
                        </a>
                      </li>
                      <li className="ms-auto">
                      
                        <a class="dropdown-item fw-bold ms-auto" href="#" onClick={()=>handleLogout()}>
                          <IoExitOutline size={20} /> Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="d-lg-none  nav-item d-flex align-items-center">
              <Routes>
                <Route
                  path="/admin/:any"
                  element={<AdminSidebar width={true} style={"none"} />}
                />
                <Route
                  path="/teacher/:any"
                  element={<TeacherSidebar width={true} style={"none"} />}
                />
                <Route
                  path="/student/:any"
                  element={<StudentSidebar width={true} style={"none"} />}
                />
              </Routes>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
