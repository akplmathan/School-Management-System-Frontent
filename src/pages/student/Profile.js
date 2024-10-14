import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import SideNav from "./SideNav";

const Profile = () => {
  const user = useSelector((state) => state.userInfo.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      enqueueSnackbar("Please Enter Old Password and New Password", {
        variant: "warning",
      });
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/student/password/${user._id}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response.status === 201) {
        enqueueSnackbar("Password Updated Successfully", {
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();          
        }, 1000);

      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Password update error:", error);
    }
  };
  return (
   
      <div className="w-100">
      <div className="d-none d-lg-block">
        <SideNav />
      </div>
        <h2 className="text-center bg-success text-light p-3 fw-bold">
          {" "}
          Profile
        </h2>
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-lg-6 d-flex justify-content-center">
              <form action="" className="w-100">
                <img
                  style={{ width: "200px", height: "200px" ,objectFit:'cover'}}
                  src={user?.image}
                  class="rounded mx-auto d-block"
                  alt="..."
                />
            

                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Name
                  </label>
                  <div class="input-group mb-3">
                    <input
                      disabled
                      value={user?.name}
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
                      disabled
                      value={user?.email}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Phone
                  </label>
                  <div class="input-group mb-3">
                    <input
                      disabled
                      value={user?.phone}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    address
                  </label>
                  <div class="input-group mb-3">
                    <textarea
                      disabled
                      value={user?.address}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
            
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
                      onChange={(e) => setOldPassword(e.target.value)}
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
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="Enter Your New Password"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>

                <button className="btn btn-primary fw-bold my-4 w-100" onClick={(e)=>handlePasswordUpdate(e)}>
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;
