import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosArrowDown, IoIosPerson } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FaPen, FaPersonChalkboard } from "react-icons/fa6";
import { BsDatabaseFill } from "react-icons/bs";
import { IoBookSharp, IoExitOutline } from "react-icons/io5";
import { PiBooksFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa6";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LiaLandmarkSolid } from "react-icons/lia";
import { PiRankingLight } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarTimes } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";


const Sidebar = ({ width }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const[dropDown,setDropDown] = useState(false)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <div
      style={{
        width: width ? "100%" : showSidebar ? "20vw" : "60px",
        height: width ? "auto" : "100%",
        transition: "0.4s linear",
        position: "relative",
        overflowY: "scroll",
        // backgroundColor:'navy',
        scrollbarWidth: "none",
      }}
      className=" pe-2 bg-secondary"
    >
      <div
        style={{ zIndex: 1000 }}
        className="text-start my-1 mb-4 d-flex align-items-center gap-2 d-flex justify-content-end pe-2 gap-2  py-2 text-light cursor-pointer "
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {!width && (
          <span
            className="btn text-light text-center d-flex align-items-center bg-primary rounded-pill p-0"
            style={{ position: "absolute", right: 10, top: 30 }}
          >
            {showSidebar ? (
              <FaArrowCircleLeft size={26} />
            ) : (
              <FaArrowCircleRight size={26} />
            )}
          </span>
        )}
      </div>
      <Link to="/admin/dashboard" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-lg-5 mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/dashboard"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <RiDashboard3Line size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Dashboard <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <div
        className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
        style={{
          backgroundColor:
            location.pathname === "/admin/report"
              ? "rgba(19, 12, 12, 0.16)"
              : "",
        }}
        
        onClick={()=>setDropDown(!dropDown)}
      >
        <BsGraphUpArrow size={showSidebar ? 20 : 25} />
        <span
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
            width: "100%",
          }}
          className="justify-content-between align-items-center"
        >
         General Reports{!dropDown? <IoIosArrowForward /> :<IoIosArrowDown/>}
        </span>
      </div>
      
      {
          dropDown && <>
           <Link to="/admin/markReport" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary"
          style={{
            backgroundColor:
              location.pathname === "/admin/markReport"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="ps-5 fw-semibold justify-content-between align-items-start"
          >
          <div> <PiRankingLight/> Mark Report </div>
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/attendaceReport" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary "
          style={{
            backgroundColor:
              location.pathname === "/admin/attendaceReport"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
       
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="ps-5  fw-semibold justify-content-between"
          >
            <div><BsDatabaseFill/> Attendance Report</div>
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
          </>

      }



<Link to="/admin/admissionForm" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/admissionForm"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <FaPen size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center "
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Admission Form
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/student" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/student"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <PiStudentFill size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center "
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Student Information
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/announcement" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/announcement"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <LiaLandmarkSolid size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Co-Curricular Activities <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/classes" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3  btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/classes"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <SiGoogleclassroom size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Class Information
            <IoIosArrowForward />
          </span>
        </div>
      </Link>

      <Link to="/admin/subject" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/subject"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <MdLibraryBooks size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage Subject
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/timeTable" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/timeTable"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <FaRegCalendarTimes size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage TimeTables
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/marks" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/marks"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <PiRankingLight size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Student Scores <IoIosArrowForward />
          </span>
        </div>
      </Link>

      <Link to="/admin/parents" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/parents"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <MdFamilyRestroom size={showSidebar ? 20 : 25} />{" "}
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage Parents
            <IoIosArrowForward />
          </span>
        </div>
      </Link>

  

      <Link to="/admin/teacher" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/teacher"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <FaPersonChalkboard size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage Teachers
            <IoIosArrowForward />
          </span>
        </div>
      </Link>

      <Link to="/admin/attendance" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/attendance"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <BsDatabaseFill size={showSidebar ? 20 : 25} />{" "}
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage Attendance
            <IoIosArrowForward />
          </span>
        </div>
      </Link>

      <Link to="/admin/exam" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/exam"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <IoBookSharp size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Manage Exams
            <IoIosArrowForward />
          </span>
        </div>
      </Link>

      <Link to="/admin/payment" className="text-decoration-none">
        <div
          className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/payment"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <MdPayment size={showSidebar ? 20 : 25} />
          <span
            className="justify-content-between align-items-center"
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
            }}
          >
            Payment
            <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/roll-manage" className="text-decoration-none">
        <div
          className="text-start d-flex align-items-center gap-2 d-flex align-items-center  mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/roll-manage"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <RiAdminFill size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Role Managements <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <Link to="/admin/profile" className="text-decoration-none">
        <div
          className="text-start d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
          style={{
            backgroundColor:
              location.pathname === "/admin/profile"
                ? "rgba(19, 12, 12, 0.16)"
                : "",
          }}
        >
          <IoIosPerson size={showSidebar ? 20 : 25} />
          <span
            style={{
              display: showSidebar ? "flex" : "none",
              transition: "0.5s linear",
              width: "100%",
              width: "100%",
            }}
            className="justify-content-between align-items-center"
          >
            Profile Update <IoIosArrowForward />
          </span>
        </div>
      </Link>
      <div
        onClick={() => handleLogout()}
        className="text-start d-flex align-items-center gap-2 d-flex align-items-center mb-3  mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold"
      >
        <IoExitOutline size={showSidebar ? 20 : 25} />
        <span
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
            width: "100%",
          }}
          className="justify-content-between align-items-center"
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
