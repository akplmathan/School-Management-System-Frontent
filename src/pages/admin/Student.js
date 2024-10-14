import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import { IoMdDownload } from "react-icons/io";
import SideNav from "./SideNav";

const Student = () => {
  const navigate = useNavigate()
  const [editStudent, setEditStudent] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const arr = [1, 2, 3, 4, 5];
  const classInfo = useSelector((state) => state.classInfo.class);
  const parentInfo = useSelector((state) => state.parentInfo.parent);
  const studentInfo = useSelector((state) => state.studentInfo.student);
  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [selectedStudentClass, setSelectedStudentClass] = useState([]);
  const [selectedStudentSection, setSelectedStudentSection] = useState([]);
  const [students, setStudents] = useState([]);
  const [SelectedClassForSection, setSelectedClassForSection] = useState([]);

  const componentRef = useRef();

  const handleStudentList = (e) => {
    setSpinner(true);
    classInfo?.map((item, i) => {
      item.section.map((item1, index) => {
        if (item1._id == e.target.value) {
          setSection(item1.section);
          setStudents(item1.students);
        }
      });
    });
    setTimeout(() => {
      setSpinner(false);
    }, 1500);
  };

  // register Student//
  const [formData, setFormData] = useState({
    image: "",
    currentSession: "",
    name: "",
    emis: "",
    parent: "", // Parent ID
    className: "", // Class ID
    section: "",
    dob: "",
    age: "",
    gender: "",
    motherTungue: "",
    religion: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    preSclName: "",
    admissionDate: "",
    tc: "",
    BirthC: "",
    givenMarksheet: "",
    handicab: "",
  });
  const [formData1, setFormData1] = useState({
    id: "",
    image: "",
    currentSession: "",
    name: "",
    parent: "", // Parent ID
    className: "", // Class ID
    section: "",
    dob: "",
    age: "",
    gender: "",
    motherTungue: "",
    religion: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    preSclName: "",
    admissionDate: "",
    tc: "",
    BirthC: "",
    givenMarksheet: "",
    handicab: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleUpdateStudent = async () => {
    try {
      const formDataObj = convertToFormData(formData1);

      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/student/${formData1.id}`,
        formDataObj
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Updated SuccessFully", { variant: "success" });
        window.location.reload();
        setEditStudent(false);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete Student
  const deleteStudent = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (isConfirmed) {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/admin/students/${id}`
        );

        if (response.status === 201) {
          enqueueSnackbar(response.data.msg, { variant: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          enqueueSnackbar(`Error: ${response.data.msg}`, { variant: "error" });
        }
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      enqueueSnackbar("Error deleting student", { variant: "error" });
    }
  };

  const handleSetDetails = (item) => {
    setEditStudent(true);
    setFormData1({
      id: item._id,
      image: item.image,
      currentSession: item.currentSession,
      name: item.name,
      parent: item.parent, // Parent ID
      className: item.className, // Class ID
      section: item.section,
      dob: item.dob,
      age: item.age,
      gender: item.gender,
      motherTungue: item.motherTungue,
      religion: item.religion,
      bloodGroup: item.bloodGroup,
      address: item.address,
      city: item.city,
      state: item.state,
      nationality: item.nationality,
      phone: item.phone,
      email: item.email,
      preSclName: item.preSclName,
      admissionDate: item.admissionDate,
      tc: item.tc,
      BirthC: item.BirthC,
      givenMarksheet: item.givenMarksheet,
      handicab: item.handicab,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = convertToFormData(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/studentReg`,
        formDataObj,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Student Created SuccessFully", { variant: "success" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error registering student:", error.message);
    }
  };

  useEffect(() => {
    classInfo?.map((item, i) => {
      return setSelectedClass(
        classInfo.find((item) => item._id == formData.className)?.section
      );
    });
    classInfo?.map((item, i) => {
      return setSelectedStudentSection(
        classInfo.find((item) => item.number == selectedStudentClass)?.section
      );
    });
  }, [formData.className, selectedStudentClass]);
  return (
 
    
      <div>
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Students
        </h2>

        <div class="container">
          {/* nav tabs// */}

          {/* popup// */}
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {editStudent && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.59)",
                  width: "100%",
                  height: "100vh",
                  overflow:'scroll',
                  zIndex: 1000,
                 
                 
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
                          setEditStudent(false);
                        }}
                      />
                    </div>
                    <h2 className="text-center fw-semibold">Edit Student</h2>
                    <div className="row justify-content-center gap-4">
                      <div className="col-lg-5">
                        <form action="">
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Image
                            </label>
                            <div class="input-group mb-3">
                              <input
                                onChange={(e) =>
                                  setFormData1({
                                    ...formData1,
                                    image: e.target.files[0],
                                  })
                                }
                                type="file"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Current Session
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={"2024-2025"}
                                disabled
                                type="text"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Full Name
                            </label>
                            <div class="input-group mb-3">
                              <input
                                name="name"
                                value={formData1.name}
                                onChange={(e) => handleChange1(e)}
                                type="text"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Parent
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.parent}
                                name="parent"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                {parentInfo?.map((item, i) => {
                                  return (
                                    <option value={item._id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Date Of Birth
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.dob}
                                name="dob"
                                onChange={handleChange1}
                                type="date"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Age
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.age}
                                name="age"
                                onChange={handleChange1}
                                type="Number"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Gender
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.gender}
                                name="gender"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Mother Tungue
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.motherTungue}
                                name="motherTungue"
                                onChange={handleChange1}
                                type="text"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Religion
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.religion}
                                name="religion"
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
                                value={formData1.bloodGroup}
                                name="bloodGroup"
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
                                value={formData1.address}
                                name="address"
                                onChange={handleChange1}
                                class="form-control"
                                id="floatingTextarea"
                              ></textarea>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              City
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.city}
                                name="city"
                                onChange={handleChange1}
                                type="text"
                                class="form-control"
                                id="inputGroupFile02"
                              />
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
                                value={formData1.state}
                                name="state"
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
                                value={formData1.nationality}
                                name="nationality"
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
                              Previous School Name
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.preSclName}
                                name="preSclName"
                                onChange={handleChange1}
                                type="text"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Admission Date
                            </label>
                            <div class="input-group mb-3">
                              <input
                                value={formData1.admissionDate}
                                name="admissionDate"
                                onChange={handleChange1}
                                type="date"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Transfer Certificate
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.tc}
                                name="tc"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Birth Certificate
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.BirthC}
                                name="BirthC"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Any Given MarkSheet
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.givenMarksheet}
                                name="givenMarkSheet"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="input-group">
                            <label htmlFor="" className="fw-semibold my-2">
                              Phisical Handicap
                            </label>
                            <div class="input-group mb-3">
                              <select
                                value={formData1.handicab}
                                name="handicab"
                                onChange={handleChange1}
                                class="form-select"
                                id="inputGroupSelect04"
                                aria-label="Example select with button addon"
                              >
                                <option selected>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                      <button
                        onClick={(e) => handleUpdateStudent(e)}
                        className="btn btn-primary fw-bold w-50 my-4"
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
                Students List
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
                Admission Form
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
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  zIndex: 100,
                  top: 180,
                }}
              >
                <ReactToPrint
                  content={() => componentRef.current}
                  trigger={() => (
                    <button className="btn btn-secondary"><IoMdDownload/> Print</button>
                  )}
                  documentTitle="Time Table"
                  onBeforeGetContent={() => {
                    // Add custom styles for printing
                    const style = document.createElement("style");
                    style.innerHTML = `
              @media print {
                .print-header {
                  display: block !important;
                }
                .no-print {
                  display: none !important;
                }
                /* Hide scrollbars */
                body {
                  overflow: visible !important;
                }
                div::-webkit-scrollbar {
                  display: none;
                }
                div {
                  overflow: visible !important;
                }
              }
            `;
                    document.head.appendChild(style);
                  }}
                />
              </div>

              <div className="container-fluid d-flex align-items-center justify-content-between px-lg-5 px-2">
                <div className="input-group">
                  <div className="d-flex w-auto">
                    <label htmlFor="" className="me-3 fw-semibold my-2">
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={selectedStudentClass}
                        onChange={(e) =>
                          setSelectedStudentClass(e.target.value)
                        }
                        class="form-select"
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option value={""}>Choose...</option>

                        {classInfo?.map((item, i) => {
                          return (
                            <option value={item.number}>
                              {item.className}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <div className="d-flex w-auto">
                    <label htmlFor="" className="me-3 fw-semibold my-2">
                      section
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={selectedStudentSection}
                        onChange={(e) => handleStudentList(e)}
                        class="form-select"
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option value={""}>Choose...</option>
                        {selectedStudentSection?.map((item, i) => {
                          return (
                            <option value={item._id}>{item.section}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="btn-primary btn " onClick={()=>window.print()}>  Print</div> */}
              <div    ref={componentRef}
                    style={{
                      width: "100%",
                      height: "auto",
                      overflow: "hidden",
                    }}>
                <div className="print-header " style={{ display: "none" }}>
                  <div
                    className="d-flex justify-content-evenly mb-4"
                 
                  >
                    <img src={logo} height={50} width={50} alt="Logo" />
                    <h2 className="fw-bold">
                      SPV MATRICULATION SCHOOL-NAGAPATTINAM
                    </h2>
                  </div>
                </div>
                <div className="p-2">
                  <h4>
                    Class :
                    {selectedStudentClass
                      ? `Class-${selectedStudentClass}`
                      : ""}
                  </h4>
                  <h4>Section :{selectedStudentClass ? section : ""}</h4>
                 
                  <div style={{ width: "100%", height: "auto", overflow: "hidden" }}>
                  <table
                    class="table  table-striped mt-4"
                    style={{ overflowX: "hidden" }}
                  >
                    <thead>
                      <tr>
                        <th className="bg-primary text-light py-3" scope="col">
                          NO.
                        </th>

                        <th className="bg-primary text-light py-3" scope="col">
                          IMAGE
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          EMIS NUMBER
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          NAME
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          GENDER
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          EMAIL
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          PHONE
                        </th>

                        <th className="bg-primary text-light py-3 no-print" scope="col">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {!spinner && students.length > 0
                        ? [...students]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            ?.map((item, i) => {
                              return students.length > 0 ? (
                               
                               <tr>
                                  <th  scope="row">{i + 1}</th>
                                  <td  onClick={()=> navigate(`/admin/view-student/${item._id}`)}>
                                    <img
                                      src={
                                        item.image ||
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                      }
                                      class="img-thumbnail"
                                      style={{ height: "60px" }}
                                      alt="..."
                                    />
                                  </td>
                                  <td  onClick={()=> navigate(`/admin/view-student/${item._id}`)} className="fw-semibold">{item.emis}</td>
                                  <td onClick={()=> navigate(`/admin/view-student/${item._id}`)} className="fw-semibold">{item.name}</td>

                                  <td onClick={()=> navigate(`/admin/view-student/${item._id}`)} className="fw-semibold">{item.gender}</td>
                                  <td onClick={()=> navigate(`/admin/view-student/${item._id}`)} className="fw-semibold">{item.email}</td>
                                  <td  onClick={()=> navigate(`/admin/view-student/${item._id}`)} className="fw-semibold">{item.phone}</td>

                                  <td className="p-2 no-print" >
                                    <div
                                      className="btn btn-primary rounded-pill"
                                      onClick={() => {
                                        handleSetDetails(item);
                                      }}
                                    >
                                      <MdEdit size={20} />
                                    </div>
                                    <div
                                      onClick={() => {
                                        deleteStudent(item._id);
                                      }}
                                      className="btn btn-danger rounded-pill mx-1"
                                    >
                                      <MdDelete size={20} />
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                <p>No Data Found</p>
                              );
                            })
                        : !spinner && <p>No Data Found</p>}
                    </tbody>
                  </table>
                  </div>

                  <div
                    className="d-flex justify-content-center "
                    style={{ width: "80vw" }}
                  >
                    {spinner && (
                      <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="grey"
                        ariaLabel="tail-spin-loading"
                        radius="10"
                        wrapperStyle={{}}
                      />
                    )}
                  </div>
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
                <h2 className="text-center fw-semibold">Admission Form</h2>
                <div className="row justify-content-center gap-4">
                  <div className="col-lg-5">
                    <form action="">
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Image
                        </label>
                        <div class="input-group mb-3">
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image: e.target.files[0],
                              })
                            }
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Current Session
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={`${new Date().getFullYear()} - ${
                              new Date().getFullYear() + 1
                            }`}
                            disabled
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
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
                          EMIS Number{" "}
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.emis}
                            name="emis"
                            onChange={handleChange}
                            type="number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Parent
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.parent}
                            name="parent"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {parentInfo?.map((item, i) => {
                              return (
                                <option value={item._id}>{item.name}</option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/parents"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Class
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.className}
                            name="className"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {classInfo?.map((item, i) => {
                              return (
                                <option value={item._id}>
                                  {item.className}
                                </option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/classes"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Section
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.section}
                            name="section"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {selectedClass?.map((item, i) => {
                              return (
                                <option value={item._id}>{item.section}</option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/classes"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Date Of Birth
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.dob}
                            name="dob"
                            onChange={handleChange}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Age
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.age}
                            name="age"
                            onChange={handleChange}
                            type="Number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Gender
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.gender}
                            name="gender"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Mother Tungue
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.motherTungue}
                            name="motherTungue"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Religion
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.religion}
                            name="religion"
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
                            value={formData.bloodGroup}
                            name="bloodGroup"
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
                            value={formData.address}
                            name="address"
                            onChange={handleChange}
                            class="form-control"
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          City
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.city}
                            name="city"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
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
                            value={formData.state}
                            name="state"
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
                            value={formData.nationality}
                            name="nationality"
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
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
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
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Password
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Previous School Name
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.preSclName}
                            name="preSclName"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Admission Date
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.admissionDate}
                            name="admissionDate"
                            onChange={handleChange}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Transfer Certificate
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.tc}
                            name="tc"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Birth Certificate
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.BirthC}
                            name="BirthC"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Any Given MarkSheet
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.givenMarksheet}
                            name="givenMarksheet"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Phisical Handicap
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.handicab}
                            name="handicab"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <button
                    className="btn w-50 btn-primary fw-bold my-4"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    {loading ? (
                      <RotatingLines
                        height="23"
                        width="23"
                        strokeWidth="5"
                        animationDuration="0.75"
                        strokeColor="white"
                      />
                    ) : (
                      "Create Students"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default Student;
