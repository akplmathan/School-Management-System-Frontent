import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { PiRankingLight, PiStudentFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { BsDatabaseFill } from "react-icons/bs";
import { IoBookSharp, IoExitOutline } from "react-icons/io5";
import { PiBooksFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa6";
import { FaArrowCircleLeft, FaRegCalendarTimes } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {useDispatch} from 'react-redux'
import { removeUser } from "../../redux/slice/userSlice";
import { useNavigate,useLocation } from "react-router-dom";

const Sidebar = ({width}) => {

  const location = useLocation()
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeUser());
    navigate('/')
  };

  return (
    <div
      style={{
        width: width? "100%" : showSidebar ? "20vw" : "60px",
        height: width? 'auto' : "100%",
        minHeight:'100vh',
        transition: "0.4s linear",
        position:'relative'
      }}
      className="bg-secondary pe-2 "
    >
      <div
        className="text-start mb-4 d-flex align-items-center gap-2 d-flex justify-content-end pe-2 gap-2  py-2 text-light cursor-pointer "
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {
          !width && 
          <span className="btn text-light text-center d-flex align-items-center bg-primary rounded-pill p-0" style={{position:'absolute',zIndex:'1000',right:-15,top:10}}>
            {showSidebar ? (
              <FaArrowCircleLeft size={26} />
            ) : (
              <FaArrowCircleRight size={26} />
            )}
          </span>
        }
      </div>
      <Link to='/student/dashboard' className="text-decoration-none">
      <div className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-5 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/dashboard' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <RiDashboard3Line size={showSidebar ? "" : 25} />
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

<Link to='/student/subject' className="text-decoration-none">
<div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/subject' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <MdLibraryBooks size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Subject
          <IoIosArrowForward />
        </span>
      </div>
</Link>
<Link to='/student/timetable' className="text-decoration-none">
<div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/timetable' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <FaRegCalendarTimes size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Time Table
          <IoIosArrowForward />
        </span>
      </div>
</Link>
<Link to='/student/marks' className="text-decoration-none">
<div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/marks' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <PiRankingLight size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Marks
          <IoIosArrowForward />
        </span>
      </div>
</Link>
 
   <Link to='/student/teacher-section' className="text-decoration-none">
   <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/teacher-section' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <FaPersonChalkboard size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Teachers
          <IoIosArrowForward />
        </span>
      </div>
   </Link>

   <Link to='/student/class-mates' className="text-decoration-none">
   <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/class-mates' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <PiStudentFill size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Class Mates
          <IoIosArrowForward />
        </span>
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
     
     <Link to='/student/exam' className="text-decoration-none">
     <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/exam' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <IoBookSharp size={showSidebar ? "" : 25} />
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Exams
          <IoIosArrowForward />
        </span>
      </div>
     </Link>

     
     <Link to='/student/payment' className="text-decoration-none">
          
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/payment' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <MdPayment size={showSidebar ? "" : 25} />
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
      
    
     
      
      <Link to='/student/announcement' className="text-decoration-none">
          
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold"style={{ 
          backgroundColor: location.pathname === '/student/announcement' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <FaRegClipboard size={showSidebar ? "" : 25} />{" "}
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Notice Board
          <IoIosArrowForward />
        </span>
      </div>
      </Link>
      <Link to='/student/profile' className="text-decoration-none">
          
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/student/profile' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <IoIosPerson size={showSidebar ? "" : 25} />{" "}
        <span
          className="justify-content-between align-items-center"
          style={{
            display: showSidebar ? "flex" : "none",
            transition: "0.5s linear",
            width: "100%",
          }}
        >
          Profile
          <IoIosArrowForward />
        </span>
      </div>
      </Link>


          
          <div  onClick={handleLogout} className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold">
            <IoExitOutline size={showSidebar ? "" : 25} />{" "}
            <span
              className="justify-content-between align-items-center"
              style={{
                display: showSidebar ? "flex" : "none",
                transition: "0.5s linear",
                width: "100%",
              }}
            >
              Logout
           
            </span>
          </div>

    </div>
  );
};

export default Sidebar;
