
import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
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
import {useNavigate} from 'react-router-dom' 
import { FaRegCalendarTimes } from "react-icons/fa";

const SideNav = () => {
    const location = useLocation()
  return (
    <div className="d-none d-md-block">
                 <div className='d-flex h-auto m-0 p-0 mb-4  bg-secondary align-items-center justify-content-evenly' >
      <Link to='/admin/dashboard' className="text-decoration-none" 
>
      <div className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/dashboard' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <RiDashboard3Line size={25} />
        
      </div>

      </Link>
      <Link to='/admin/announcement' className="text-decoration-none">
      <div className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/announcement' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
         <LiaLandmarkSolid size={25} />
        
      </div>

      </Link>
      <Link to='/admin/admissionForm' className="text-decoration-none">
      <div className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/admissionForm' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
         <FaPen size={25} />
        
      </div>

      </Link>
      <Link to='/admin/classes' className="text-decoration-none">
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3  btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/classes' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <SiGoogleclassroom size={25} />
        
      </div>
      </Link>

<Link to='/admin/subject' className="text-decoration-none">
<div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/subject' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <MdLibraryBooks size={25} />
        
      </div>
</Link>
<Link to='/admin/timeTable' className="text-decoration-none">
<div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/timeTable' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <FaRegCalendarTimes size={25} />
       
      </div>
</Link>
<Link to='/admin/marks' className="text-decoration-none">
      <div className="text-start my-1 d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/marks' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <PiRankingLight size={25} />
        
      </div>

      </Link>     

  <Link to='/admin/student' className="text-decoration-none">
  <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/student' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <PiStudentFill size={25} />
       
      </div>
  </Link>

   <Link to='/admin/teacher' className="text-decoration-none">
   <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/teacher' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <FaPersonChalkboard size={25} />
        
      </div>
   </Link>

     
     <Link to='/admin/attendance' className="text-decoration-none">
          
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/attendance' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <BsDatabaseFill size={25} />{" "}
        
      </div>
     </Link>
     
     <Link to='/admin/exam' className="text-decoration-none">
     <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/exam' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <IoBookSharp size={25} />
       
      </div>
     </Link>

     
     <Link to='/admin/payment' className="text-decoration-none">
          
      <div className="text-start my-1 d-flex align-items-center gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/payment' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <MdPayment size={25} />
        
      </div>
     </Link>
      <Link to='/admin/roll-manage' className="text-decoration-none">
      <div className="text-start d-flex align-items-center gap-2 d-flex align-items-center  mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/roll-manage' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <RiAdminFill size={25} />
        
      </div>

      </Link>
      <Link to='/admin/profile' className="text-decoration-none">
      <div className="text-start d-flex align-items-center gap-2 d-flex align-items-center mt-0 gap-2 ps-3 py-2 btn btn-secondary fw-semibold" style={{ 
          backgroundColor: location.pathname === '/admin/profile' ? 'rgba(19, 12, 12, 0.16)' : '' 
        }}>
        <IoIosPerson size={25} />
       
      </div>

      </Link>

    </div>
    </div>
   
  )
}

export default SideNav