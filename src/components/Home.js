import React from "react";
import { Link } from "react-router-dom";
import { BsPersonFillGear } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import img from '../LOGO/bg.png';


const Home = () => {
  
  return (
    <div
      className="container-fluid p-0 m-0  text-center "
      style={{
        backgroundImage:`url(${img})`,
        backgroundSize: "cover",
        overflow:'hidden',
        height:'90vh',
        backgroundRepeat:'no-repeat',
      }}
    >
      <div className="row justify-content-center align-items-center w-100 h-100 ">
        <div className="col col-xl-4 col-lg-6 col-md-8  bg-light bg-opacity-25 p-5 rounded d-flex flex-column gap-4">
          <Link to={"/admin-login"}>
          <div className="btn p-3 px-4 btn-success text-light pointer opacity-100 w-100">
              <div className="d-flex justify-content-between align-items-center" ><BsPersonFillGear size={35}/>  <h2>Admin Login</h2> <div></div></div>
            </div>
          </Link>
          <Link to={"/teacher-login"}>
            <div className="btn p-3 px-4 btn-info text-light pointer opacity-100 w-100">
              <div className="d-flex justify-content-between align-items-center"><BsPersonFillCheck size={35}/> <h2>Teacher Login</h2> <div></div></div>
            </div>
          </Link>
          <Link to={"/student-login"}>
            <div className="btn p-3 px-4 btn-warning text-light pointer opacity-100 w-100">
              <div className="d-flex justify-content-between align-items-center"><BsPersonFill size={35}/>  <h2>Student Login</h2> <div></div></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
