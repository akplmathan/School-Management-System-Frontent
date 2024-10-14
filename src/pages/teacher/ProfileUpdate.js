import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import SideNav from "../teacher/SideNav";

const ProfileUpdate = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const user = useSelector((state) => state.userInfo.user);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate()
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading1(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/teacher/teacher-update/${user._id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading1(false);

      if(response.status == 201){
       
        enqueueSnackbar('Changes Saved SuccessFully' ,{variant:'success'})
        Navigate('/teacher/dashboard')
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePassword=async(e)=>{
    e.preventDefault()
    try {
      setLoading2(true)
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/teacher/change-password`,{
        oldPassword,
        newPassword
      },{
        headers:{
          Authorization:token
        }
      });
setLoading2(false);

      if(response.status ==201){
        enqueueSnackbar(response.data.msg,{variant:'success'})
        setNewPassword('')
        setOldPassword('')
      }
      else{
        enqueueSnackbar(response.data.msg,{variant:'warning'})
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
   
      <div className="w-100 ">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 mt-3 fw-bold">
          {" "}
          Profile
        </h2>
      
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-lg-6 d-flex justify-content-center">
              <form action="" className="w-100">
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={user.img}
                  class="rounded mx-auto d-block"
                  alt="..."
                />
               

                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Name
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Email
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                  className="btn btn-primary fw-bold my-4 w-100"
                >
                  {loading1 ? (
                    <RotatingLines
                      visible={true}
                      height="23"
                      width="23"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
            <div className="col-lg-5 ">
              <form action="">
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Old Password
                  </label>
                  <div class="input-group mb-3">
                    <input
                    value={oldPassword}
                    onChange={e=>setOldPassword(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="Enter Your Old Password"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    New Password
                  </label>
                  <div class="input-group mb-3">
                    <input
                    value={newPassword}
                    onChange={e=>setNewPassword(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="Enter Your New Password"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>

                <button className="btn btn-primary fw-bold my-4 w-100" onClick={(e)=>handleChangePassword(e)}>
                  {loading2 ? (
                    <RotatingLines
                      visible={true}
                      height="23"
                      width="23"
                      strokeColor="white"
                      strokeWidth="4"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ProfileUpdate;
