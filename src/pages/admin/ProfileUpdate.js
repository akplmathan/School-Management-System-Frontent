import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";

const ProfileUpdate = () => {
  const user = useSelector((state) => state.userInfo.user);
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [newimg, setNewImg] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setImg(user.img);
    }
  }, [user, loading1]);

  const HandleProfileUpdate = async (e) => {
    try {
      e.preventDefault();
      const newFormdata = new FormData();
      newFormdata.append("name", name);
      newFormdata.append("email", email);
      newFormdata.append("image", newimg);
      setLoading1(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/admin-update`,

          newFormdata
        ,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLoading1(false);

      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (e) => {
    try {
      e.preventDefault();
      setLoading2(true);
      const response = await axios.put(
        "http://localhost:4000/admin/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading2(false);
      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        navigate("/admin/dashboard");
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
 
    
      <div className="w-100 ">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 fw-bold">
          {" "}
          Admin Profile
        </h2>
        <div className="container-fluid p-3">
          <div className="row mt-5">
            <div className="col-lg-6 d-flex justify-content-center">
              <form action="" className="w-100">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  class="rounded mx-auto d-block"
                  alt="..."
                />
                <div class="mb-3">
                  <label for="formFile" class="form-label my-2 btn fw-bold">
                    Edit Profile Picture
                  </label>
                  <input
                    class="form-control"
                    onChange={(e) => setNewImg(e.target.files[0])}
                    type="file"
                    id="formFile"
                  />
                </div>

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
                  className="btn btn-primary fw-bold my-4 w-100"
                  onClick={(e) => {
                    HandleProfileUpdate(e);
                  }}
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
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="text"
                      name="oldPassword"
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
                      name="newPassword"
                      type="text"
                      class="form-control"
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter Your New Password"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary fw-bold my-4 w-100"
                  onClick={(e) => {
                    handlePasswordChange(e);
                  }}
                >
                  {loading2 ? (
                    <RotatingLines
                      visible={true}
                      height="23"
                      width="23"
                      strokeWidth="5"
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
