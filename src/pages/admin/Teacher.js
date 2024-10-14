import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { GetAllTeachers } from "../../redux/slice/teacherSlice";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoMdClose, IoMdDownload } from "react-icons/io";
import SideNav from "./SideNav";

const Teacher = () => {
  const [spinner,setSpinner]  = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const teacherInfo = useSelector((state) => state.teacherInfo.teacher);
  const classInfo = useSelector((state) => state.classInfo.class);
  const [classTeacher, setClassTeacher] = useState([]);

  //for convert page as pdf
  const contentRef = useRef();
  // const handleGeneratePdf = async () => {
  //   try {
  //     const element = contentRef.current;
  //     console.log("Element to be printed:", element); // Debugging log

  //     if (!element) {
  //       throw new Error("Invalid element reference");
  //     }

  //     const canvas = await html2canvas(element, {
  //       logging: true,
  //       useCORS: true,
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("download.pdf");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  // list the selected class Teacher
  const handleClass = (e) => {
    setSpinner(true)
    classInfo?.map((item, i) => {
      if (item.number == e.target.value) {
        return setClassTeacher(item.teacher);
      }
    });
    setSpinner(false)
  };
  //search teacher
  const handleSearch = (event) => {
    setSpinner(true)
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = teacherInfo.filter((teacher) =>
      teacher.name.toLowerCase().includes(query)
    );
    setFilteredTeachers(event.target.value ? filtered : "");
    if (event.target.value) {
      setClassTeacher([]);
    }
    setSpinner(false)
  };


  const [formData, setFormData] = useState({
    img: "",
    name: "",
    dob: "",
    age: "",
    gender: "",
    religion: "",
    bloodGroup: "",
    address: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    qualification: "",
    joiningDate: "",
  });
  //for update
  const [formData1, setFormData1] = useState({
    img: "",
    name: "",
    dob: "",
    age: "",
    gender: "",
    religion: "",
    bloodGroup: "",
    address: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    qualification: "",
    joiningDate: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleUpdateTeacher = async (e) => {
    try {
      e.preventDefault();
      const newFormDataObj = convertToFormData(formData1);
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/teacher/teacher-update/${formData1.id}`,
        newFormDataObj,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status == 201) {
        enqueueSnackbar("Updated Success", { variant: "success" });
        setEditTeacher(false);
        window.location.reload();
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

  //Handle Update Teacher
  const handleUpdateTeacherValue = (data) => {
    setEditTeacher(true);
    setFormData1({
      id: data._id,
      img: data.image,
      name: data.name,
      dob: data.dob,
      age: data.age,
      gender: data.gender,
      religion: data.religion,
      bloodGroup: data.bloodGroup,
      address: data.address,
      state: data.state,
      nationality: data.nationality,
      phone: data.phone,
      email: data.email,
      qualification: data.qualification,
      joiningDate: data.joiningDate,
    });
  };

  const handleCreateTeacher = async () => {
    try {
      const formDataObj = convertToFormData(formData);

      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher/teacherReg`,
        formDataObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setLoading(false);

      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const arr = [1, 2, 3, 4, 5];
  return (

      <div className="w-100">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Teachers
        </h2>

        <div class="container">
          {/* nav tabs// */}

          {/* popup// */}
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center'}}>
          {editTeacher && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.59)",
                width: "100%",
                height: "auto",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                class="tab-pane fade show active p-3"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="container-fluid mt-4 bg-info-subtle rounded pt-4 justify-content-center ">
                  <div className="w-100 d-flex fw-bold justify-content-end">
                    <IoMdClose
                      size={25}
                      onClick={() => {
                        setEditTeacher(false);
                      }}
                    />
                  </div>
                  <h2 className="text-center fw-semibold">Edit Teacher</h2>
                  <div className="row justify-content-center gap-4">
                    <div className="col-lg-5">
                      <form action="">
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Image
                          </label>
                          <div class="input-group mb-3">
                            <input
                              onChange={(e) => {
                                setFormData1({
                                  ...formData1,
                                  img: e.target.files[0],
                                });
                              }}
                              type="file"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="name"
                              value={formData1.name}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>

                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Date Of Birth <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="dob"
                              value={formData1.dob}
                              onChange={handleChange1}
                              type="date"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Age <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="age"
                              value={formData1.age}
                              onChange={handleChange1}
                              type="Number"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <select
                              name="gender"
                              value={formData1.value}
                              onChange={handleChange1}
                              class="form-select"
                              id="inputGroupSelect04"
                              aria-label="Example select with button addon"
                            >
                              <option value="">Choose...</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Religion <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="religion"
                              value={formData1.religion}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Blood Group
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="bloodGroup"
                              value={formData1.bloodGroup}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Address
                          </label>
                          <div class="input-group mb-3">
                            <textarea
                              name="address"
                              value={formData1.address}
                              onChange={handleChange1}
                              class="form-control"
                              id="floatingTextarea"
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-5">
                      <form action="">
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            State
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="state"
                              value={formData1.state}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Nationality
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="nationality"
                              value={formData1.nationality}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="phone"
                              value={formData1.phone}
                              onChange={handleChange1}
                              type="Number"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="email"
                              value={formData1.email}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>

                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Qualification <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="qualification"
                              value={formData1.qualification}
                              onChange={handleChange1}
                              type="text"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="" className="fw-semibold my-2">
                            Date Of Joining{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div class="input-group mb-3">
                            <input
                              name="joiningDate"
                              value={formData1.joiningDate}
                              onChange={handleChange1}
                              type="date"
                              class="form-control"
                              id="inputGroupFile02"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <button
                      className="btn btn-success fw-bold my-4"
                      onClick={(e) => {
                        handleUpdateTeacher(e);
                      }}
                    >
                      {loading ? (
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
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>


          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item fw-bold" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Teacher List
              </button>
            </li>
            <li class="nav-item fw-bold" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Add Teacher
              </button>
            </li>
          </ul>

          {/* tab content */}

          <div class="tab-content" id="myTabContent">
            {/* tab-1// */}
            <div
              class="tab-pane fade show active p-3"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div>
                <div className="container-fluid d-flex align-items-center justify-content-between px-lg-5 px-2">
                  <div className="input-group">
                    <div className="d-flex w-auto">
                      <label htmlFor="" className="me-3 fw-semibold my-2">
                        Class
                      </label>
                      <div class="input-group mb-3">
                        <select
                          onChange={(e) => handleClass(e)}
                          class="form-select"
                          id="inputGroupSelect04"
                          aria-label="Example select with button addon"
                        >
                          <option selected>Choose...</option>
                          {classInfo?.map((item, i) => {
                            return (
                              <option key={i} value={item.number}>
                                {item.className}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className="btn btn-secondary position-absolute"
                    style={{ right: 20, top: 180 }}
                    onClick={() => handleGeneratePdf()}
                  >
                    <IoMdDownload />
                    PDF
                  </div> */}
                  <div class="input-group w-50 p-2">
                    <input
                      value={searchQuery}
                      onChange={handleSearch}
                      type="text"
                      class="form-control p-0"
                      id="inputGroupFile02"
                    />
                    <button class="btn btn-primary" type="button">
                      Search
                    </button>
                  </div>
                </div>
                <div ref={contentRef}>
                  <table class="table  table-striped mt-4">
                    <thead>
                      <tr>
                        <th scope="col">NO.</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">NAME</th>
                        <th scope="col">SEX</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">PHONE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {filteredTeachers.length > 0
                        ? spinner? <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="grey"
                        ariaLabel="tail-spin-loading"
                        radius="10"
                        wrapperStyle={{}}
                      
                      />: filteredTeachers.map((item, i) => {
                            return (
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <td>
                                  <img
                                    src={item.img}
                                    class="img-thumbnail"
                                    style={{ height: "60px" }}
                                    alt="..."
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td className="p-0">
                                  <div class="dropdown">
                                    <button
                                      class="btn dropdown-toggle p-1 mt-1"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Action
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li
                                        onClick={() =>
                                          handleUpdateTeacherValue(item)
                                        }
                                      >
                                        <a class="dropdown-item" href="#">
                                          Edit{" "}
                                        </a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#">
                                          {" "}
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>{" "}
                                </td>
                              </tr>
                            );
                          })
                        : spinner? <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="grey"
                        ariaLabel="tail-spin-loading"
                        radius="10"
                        wrapperStyle={{}}
                      
                      />: classTeacher?.map((item, i) => {
                            return (
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <td>
                                  <img
                                    src={
                                      item.img
                                    }
                                    class="img-thumbnail"
                                    style={{ height: "60px" }}
                                    alt="..."
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td className="p-0">
                                  <div class="dropdown">
                                    <button
                                      class="btn dropdown-toggle p-1 mt-1"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Action
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li
                                        onClick={() =>
                                          handleUpdateTeacherValue(item)
                                        }
                                      >
                                        <a class="dropdown-item" href="#">
                                          Edit{" "}
                                        </a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#">
                                          {" "}
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>{" "}
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                    {classTeacher.length == 0 &&
                      filteredTeachers.length == 0 && (
                        <p className="text-center w-100">No Data Found</p>
                      )}
                  </table>
                </div>
              </div>
            </div>

            {/* tab-2// */}
            <div
              class="tab-pane fade p-3"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="container-fluid mt-4 bg-info-subtle rounded pt-4 justify-content-center ">
                <h2 className="text-center fw-semibold">Add New Teacher</h2>
                <div className="row justify-content-center gap-4">
                  <div className="col-lg-5">
                    <form action="">
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Image
                        </label>
                        <div class="input-group mb-3">
                          <input
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                img: e.target.files[0],
                              });
                            }}
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Date Of Birth <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="dob"
                            value={formData.dob}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Age <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            type="Number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <select
                            name="gender"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option value="">Choose...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Religion <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Blood Group
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Address
                        </label>
                        <div class="input-group mb-3">
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            class="form-control"
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5">
                    <form action="">
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          State
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Nationality
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="Number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Qualification <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Date Of Joining <span className="text-danger">*</span>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <button
                    className="btn btn-success fw-bold my-4"
                    onClick={() => handleCreateTeacher()}
                  >
                    {loading ? (
                      <RotatingLines
                        visible={true}
                        height="23"
                        width="23"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                      />
                    ) : (
                      "Create Teacher"
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

export default Teacher;
