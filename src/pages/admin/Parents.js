import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines, Radio, LineWave } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import SideNav from "./SideNav";

const Parents = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery,setSearchQuery] = useState('')
  const [filteredParents,setFilteredParents] = useState([])
  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = parentInfo.filter((parent) =>
      parent.name.toLowerCase().includes(query)
    );
    setFilteredParents(event.target.value ? filtered : "");
    
  };

  const [spinner, setSpinner] = useState(true);
  const parentInfo = useSelector((state) => state.parentInfo.parent);
  const [editParent, setEditParent] = useState(false);
  const arr = [1, 2, 3, 4];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    profession: "",
    address: "",
  });

  setTimeout(() => {
    setSpinner(false);
  }, 1500);

  //find Single parent Details for Update
  const [formData1, setFormData1] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    profession: "",
    address: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //set parent details in edit Section
  const handleSetParent = (data) => {
    setEditParent(true);
    setFormData1({
      id: data._id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      profession: data.profession,
    });
  };

  //updating Details
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/parentReg`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      if (response.status == 201) {
        window.location.reload();
        navigate("/admin/parents");
        enqueueSnackbar(response.data.msg, { variant: "success" });
      } else {
        return enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error(error);
      alert("Error registering parent");
    }
  };

  //update Parent
  const handleUpdateParent = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/parentEdit/${data.id}`,
        formData1
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Updated SuccessFully", { variant: "success" });
        window.location.reload();
        setEditParent(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete parent
  const deleteParent = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/parents/${id}`
      );

      if (response.status === 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "error" });
      }
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };
  return (
  
     
      <div className="w-100">
        <SideNav/>
        <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">
          Manage Parents
        </h2>

        {/* tabs ************************************************************************************************************** */}

        <div className="tabs">
          <div class="container-fluid p-0">
            {/* Edit Class tab 1 ********************* */}
           <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center'}}>
           {editParent && (
              <div
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.59)",
                  width: "100%",
                  height: "100%",
                  zIndex: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="container w-50 bg-secondary-subtle p-3 rounded">
                  <div className="w-100 d-flex fw-bold justify-content-end">
                    <IoMdClose
                      size={25}
                      onClick={() => {
                        setEditParent(false);
                      }}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="" className="fw-semibold my-2">
                      Full Name
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={formData1.name}
                        name="name"
                        onChange={handleChange1}
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
                        value={formData1.phone}
                        name="phone"
                        onChange={handleChange1}
                        type="Number"
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
                        value={formData1.email}
                        name="email"
                        onChange={handleChange1}
                        type="text"
                        class="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="" className="fw-semibold my-2">
                      Profession
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={formData1.profession}
                        name="profession"
                        onChange={handleChange1}
                        type="text"
                        class="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Address
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={formData1.address}
                          name="address"
                          onChange={handleChange1}
                          type="text"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 my-3 fw-bold"
                    onClick={(e) => {
                      handleUpdateParent(formData1);
                    }}
                  >
                    {loading ? (
                      <RotatingLines
                        height="23"
                        width="23"
                        strokeColor="white"
                        strokeWidth="5"
                      />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            )}
           </div>
            <ul
              class="nav nav-tabs bg-secondary-subtle pt-1 ps-2 w-100 m-0 p-0"
              id="myTab"
              role="tablist"
            >
              <li class="nav-item ">
                <a
                  class="nav-link active fw-bold "
                  id="tab1-tab"
                  data-toggle="tab"
                  href="#tab1"
                  role="tab"
                  aria-controls="tab1"
                  aria-selected="true"
                >
                  Parent List
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link fw-bold "
                  id="tab2-tab"
                  data-toggle="tab"
                  href="#tab2"
                  role="tab"
                  aria-controls="tab2"
                  aria-selected="false"
                >
                  Add New Parent
                </a>
              </li>
            </ul>

            {/* Parent List// ***************************************************************************/}

            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active p-3"
                id="tab1"
                role="tabpanel"
                aria-labelledby="tab1-tab"
              >
                <div className="w-100 d-flex justify-content-end mt-5 mb-3 px-3">
                <div class="input-group w-50 p-2">
                  
                  </div>
                  <div class="input-group w-50 p-2">
                  
                  </div>
                <div class="input-group w-50 p-2">
                    <input
                      value={searchQuery}
                      onChange={handleSearch}
                      type="text"
                      class="form-control px-2"
                      id="inputGroupFile02"
                    />
                    <button class="btn btn-primary" type="button">
                      Search
                    </button>
                  </div>
                 
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th className="bg-primary text-light mt-5" scope="col">
                        NO.
                      </th>
                      <th className="bg-primary text-light mt-5" scope="col">
                        NAME
                      </th>
                      <th className="bg-primary text-light mt-5" scope="col">
                        EMAIL
                      </th>
                      <th className="bg-primary text-light mt-5" scope="col">
                        PHONE
                      </th>
                      <th className="bg-primary text-light mt-5" scope="col">
                        PROFESSION
                      </th>
                      <th className="bg-primary text-light mt-5" scope="col">
                        OPTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {
                    filteredParents?.length>0 ?filteredParents?.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td className="fw-semibold">
                            {item.name.toUpperCase()}
                          </td>
                          <td className="fw-semibold">{item.email}</td>
                          <td className="fw-semibold">{item.phone}</td>
                          <td className="fw-semibold">{item.profession}</td>
                          <td className="p-2">
                            <div
                              className="btn btn-primary rounded-pill"
                              onClick={() => {
                                handleSetParent(item);
                              }}
                            >
                              <MdEdit size={22} />
                            </div>
                            <div
                              onClick={() => {
                                deleteParent(item._id);
                              }}
                              className="btn btn-danger rounded-pill mx-1"
                            >
                              <MdDelete size={22} />
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (!spinner &&
                      parentInfo.slice(0, visibleCount)?.map((item, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td className="fw-semibold">
                              {item.name.toUpperCase()}
                            </td>
                            <td className="fw-semibold">{item.email}</td>
                            <td className="fw-semibold">{item.phone}</td>
                            <td className="fw-semibold">{item.profession}</td>
                            <td className="p-2">
                              <div
                                className="btn btn-primary rounded-pill"
                                onClick={() => {
                                  handleSetParent(item);
                                }}
                              >
                                <MdEdit size={22} />
                              </div>
                              <div
                                onClick={() => {
                                  deleteParent(item._id);
                                }}
                                className="btn btn-danger rounded-pill mx-1"
                              >
                                <MdDelete size={22} />
                              </div>
                            </td>
                          </tr>
                        );
                      })) }
                  </tbody>
                  {/* {
                   filteredParents?.length == 0 && (
                        <p className="text-center w-100">No Data Found</p>
                      )} */}
                </table>
                {spinner && (
                  <div className="d-flex justify-content-center w-100">
                    {" "}
                    <LineWave height={150} width={150} strokeColor="white"  strokeWidth="10" color="grey" />
                  </div>
                )}


               {(!spinner && filteredParents?.length == 0) && <div className="w-100 d-flex align-items-center justify-content-center p-3">
                  <div className="btn btn-primary m-0" onClick={loadMoreItems}> Load More...</div>
                </div>}
              </div>

              {/* Add Class tab-2 ***********************************************************/}

              <div
                class="tab-pane fade px-5 pt-lg-5 "
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <div className="container ">
                  <div className="input-group">
                    <label htmlFor="" className="fw-semibold my-2">
                      Full Name
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
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
                        type="Number"
                        value={formData.phone}
                        name="phone"
                        onChange={handleChange}
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
                        type="text"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        class="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="" className="fw-semibold my-2">
                      Profession
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        value={formData.profession}
                        name="profession"
                        onChange={handleChange}
                        class="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Address
                      </label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          value={formData.address}
                          name="address"
                          onChange={handleChange}
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-primary w-100 my-3 fw-bold"
                  >
                    {loading ? (
                      <RotatingLines
                        height="23"
                        width="23"
                        strokeColor="white"
                        strokeWidth="5"
                      />
                    ) : (
                      "Add Parent"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Parents;
