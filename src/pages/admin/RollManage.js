import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSnackbar } from "notistack";
import axios, { Axios } from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import SideNav from "./SideNav";

const RollManage = () => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userInfo.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const convertToFormData = (formData) => {
    const formDataObj = new FormData();

    // Append each key-value pair to the FormData object
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObj.append(key, formData[key]);
      }
    }

    return formDataObj;
  };

  const deleteAdmin = async (adminId) => {
    try {
      const isConfirmed = window.confirm('Are you Sure to Delete This Admin?')

      if(isConfirmed){
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/admin/admin/${adminId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        if (response.status === 201) {
          enqueueSnackbar(response.data.msg, { variant: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          enqueueSnackbar(response.data.msg, { variant: "error" });
        }
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = convertToFormData(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/adminReg`,
        newFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        setFormData({ name: "", email: "", password: "" });
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    const handleAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getAllAdmin`
        );
        if (response) {
          setAdmin(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleAdmin();
  }, [user]);

  console.log(admin, user);
  return (
 
     
      <div class="container mt-2">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Roll Management
        </h2>

        <div class="row justify-content-center">
          <div class="col-md-6  p-3 rounded py-5">
            <h2 class="text-center mb-4 mt-5 fw-bold">Create New Admin</h2>
            <form>
              <div class="mb-4">
                <label for="adminName" class="form-label fw-bold">
                  Name
                </label>
                <input
                  name="image"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    });
                  }}
                  type="file"
                  class="form-control"
                  id="adminName"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="adminName" class="form-label fw-bold">
                  Name
                </label>
                <input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  class="form-control"
                  id="adminName"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="adminEmail" class="form-label fw-bold">
                  Email address
                </label>
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  class="form-control"
                  id="adminEmail"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="adminPassword" class="form-label fw-bold">
                  Password
                </label>
                <input
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  class="form-control"
                  id="adminPassword"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                onClick={(e) => handleSubmit(e)}
                class="btn btn-primary w-100"
              >
                {" "}
                {loading ? (
                  <RotatingLines
                    height="23"
                    width="23"
                    strokeColor="white"
                    strokeWidth="5"
                  />
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
          <div class="col-md-6  p-3 rounded py-5">
            <h2 class="text-center mb-4 mt-5 fw-bold">Admin List</h2>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th className="bg-info text-light" scope="col">
                    NO.
                  </th>
                  <th className="bg-info text-light" scope="col">
                    NAME
                  </th>
                  <th className="bg-info text-light" scope="col">
                    EMAIL
                  </th>
                  <th className="bg-info text-light" scope="col">
                    OPTIONS
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {admin?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{item.name}</td>
                      <td className="fw-semibold">{item.email}</td>
                      <td className="p-2">
                        <div className="btn btn-danger rounded-pill mx-1 px-2" onClick={()=>deleteAdmin(item._id)}>
                          <MdDelete size={15} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
};

export default RollManage;
