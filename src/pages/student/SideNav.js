import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { BsDatabaseFill } from "react-icons/bs";
import { IoBookSharp, IoExitOutline } from "react-icons/io5";
import { PiBooksFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa6";
import { FaArrowCircleLeft, FaRegCalendarTimes } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slice/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
const SideNav = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="d-none d-md-block">
      <div className="d-flex h-auto m-0 p-0 mb-4  bg-secondary align-items-center justify-content-evenly">
        <Link to="/student/dashboard" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/dashboard"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <RiDashboard3Line size={25} />
          </div>
        </Link>

        <Link to="/student/subject" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/subject"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <MdLibraryBooks size={25} />
          </div>
        </Link>
        <Link to="/student/timetable" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/timetable"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <FaRegCalendarTimes size={25} />
          </div>
        </Link>

        <Link to="/student/teacher-section" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/teacher-section"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <FaPersonChalkboard size={25} />
          </div>
        </Link>

        <Link to="/student/class-mates" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/class-mates"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <PiStudentFill size={25} />
          </div>
        </Link>
        {/* <Link to='/student/attendance' className="text-decoration-none">
        
    <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold">
      <BsDatabaseFill size={showSidebar ? "" : 25} />{" "}
      <span
        className="justify-content-between align-items-center"
        style={{
          display: showSidebar ? "flex" : "none",
          transition: "0.5s linear",
          width: "100%",
        }}
      >
        Attendance
        <IoIosArrowForward />
      </span>
    </div>
   </Link> */}

        <Link to="/student/exam" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/exam"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <IoBookSharp size={25} />
          </div>
        </Link>

        <Link to="/student/payment" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/payment"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <MdPayment size={25} />
          </div>
        </Link>

        <Link to="/student/announcement" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/announcement"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <FaRegClipboard size={25} />{" "}
          </div>
        </Link>
        <Link to="/student/profile" className="text-decoration-none">
          <div
            className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
            style={{
              backgroundColor:
                location.pathname === "/student/profile"
                  ? "rgba(19, 12, 12, 0.16)"
                  : "",
            }}
          >
            <IoIosPerson size={25} />{" "}
          </div>
        </Link>

        <div
          onClick={handleLogout}
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
        >
          <IoExitOutline size={25} />{" "}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
