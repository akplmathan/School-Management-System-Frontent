import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import { RotatingLines } from "react-loader-spinner";
import SideNav from "../teacher/SideNav";

const Subject = () => {
  const arr =[1,2,3,4]
  const [selectedStudentClass,setSelectedStudentClass] = useState('')
  const [loading, setLoading] = useState(false);
  const [editClass, setEditClass] = useState(false);
  const [editSubject, setEditSubject] = useState(false);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [formData, setFormData] = useState({
    subName: "",
    subCode: "",
    classId: "",
    sectionId: "",

  });

  const { enqueueSnackbar } = useSnackbar();
  const classInfo = useSelector((state) => state.classInfo.class);
  //for set formdata details
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //for Subject Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/subjectReg`,
        formData
      );
      setLoading(false)

      if (response.status == 201) {
        enqueueSnackbar("Subject Added SuccessFully", { variant: "success" });
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    classInfo?.map((item, i) => {
      return setSelectedClass(
        classInfo.find((item) => item._id == formData.classId)?.section
      );
    });

  
    
    classInfo?.map((item, i) => {
      return setSelectedSection(
        classInfo.find((item) => item.number == selectedStudentClass)?.section
      );
    });
  }, [formData.classId, selectedClass,selectedStudentClass]);
  return (
 
      <div className="w-100">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Subjects
        </h2>

        {/* tabs ************************************************************************************************************** */}

        <div className="tabs">
          <div class="container-fluid p-0">
            {/* Edit Subject */}
            {editSubject && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.59)",
                  width: "100%",
                  height: "100vh",
                  zIndex: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="container w-50 bg-success-subtle p-3 rounded"
                  style={{ opacity: 1 }}
                >
                  <div className="w-100 d-flex fw-bold justify-content-end">
                    <IoMdClose
                      size={25}
                      onClick={() => {
                        setEditSubject(false);
                      }}
                    />
                  </div>
                  <h2 className="text-center fw-bold">Subject Edit</h2>
                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        placeholder="Ex. class-1"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Subject
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        placeholder="Ex. I"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-bold fs-5 mb-2">
                      {" "}
                      Teacher
                    </label>
                    <div class="input-group mb-3">
                      <select class="form-select" id="inputGroupSelect02">
                        <option selected>Choose...</option>
                        <option value="1">Teacher 1</option>
                        <option value="2">Teacher 2</option>
                        <option value="3">Teacher 3</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary "
                    onClick={() => {
                      setEditSubject(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

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
                  Subject List
                </button>
              </li>
              {/* <li class="nav-item fw-bold" role="presentation">
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
                  Add New Subject
                </button>
              </li> */}
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
                <div className="d-flex px-3 justify-content-between">
                  <div>
                    <div class="btn-group mt-4">
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
                    </div>
                  </div>
                </div>

                {/* section from */}
              
              {
                selectedSection?.map((section,i)=>{
                  return(
                        <>
                        <h4 className="w-100 text-center py-2 bg-info text-light">Section  {section.section}</h4>
                        <table class="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">NO.</th>
                      <th className="text-center" scope="col">SUBJECT</th>
                 
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {section.subjects?.map((item, i) => {
                      return (
                        <tr>
                          <th className="text-center" scope="row">{i + 1}</th>
                          <td className="text-center">{item.subName}</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                        </>
                  )
                })
              }
               
              </div>

              {/* tab-2// */}
              {
                // <div
                //   class="tab-pane fade p-3"
                //   id="profile"
                //   role="tabpanel"
                //   aria-labelledby="profile-tab"
                // >
                //   <div className="container ">
                //     <div class="mb-3 mt-3">
                //       <label
                //         for="exampleFormControlInput1"
                //         class="mb-2 fw-bold "
                //       >
                //         Subject Name
                //       </label>
                //       <input
                //         value={formData.subName}
                //         name="subName"
                //         onChange={handleChange}
                //         type="email"
                //         class="form-control"
                //         id="exampleFormControlInput1"
                //       />
                //     </div>
                //     <div class="mb-3">
                //       <label
                //         for="exampleFormControlInput1"
                //         class="mb-2 fw-bold "
                //       >
                //         Subject Code
                //       </label>
                //       <input
                //         value={formData.subCode}
                //         name="subCode"
                //         onChange={handleChange}
                //         type="email"
                //         class="form-control"
                //         id="exampleFormControlInput1"
                //       />
                //     </div>

                //     <div className="input-group mb-2">
                //       <label htmlFor="" className="fw-bold mb-2">
                //         {" "}
                //         Class
                //       </label>
                //       <div class="input-group mb-3">
                //         <select
                //           value={formData.classId}
                //           name="classId"
                //           onChange={handleChange}
                //           class="form-select"
                //           id="inputGroupSelect02"
                //         >
                //           <option selected>Choose...</option>
                //           {classInfo?.map((item, i) => {
                //             return (
                //               <option value={item._id}>{item.className}</option>
                //             );
                //           })}
                //         </select>
                //       </div>
                //     </div>
                //     <div className="input-group mb-2 ">
                //       <label htmlFor="" className="fw-bold mb-2">
                //         {" "}
                //         Section
                //       </label>
                //       <div class="input-group mb-3">
                //         <select
                //           value={formData.sectionId}
                //           name="sectionId"
                //           onChange={handleChange}
                //           class="form-select"
                //           id="inputGroupSelect02"
                //         >
                //           <option selected>Choose...</option>
                //           {selectedClass?.map((item, i) => {
                //             return (
                //               <option value={item._id}>{item.section}</option>
                //             );
                //           })}
                //         </select>
                //       </div>
                //     </div>
                
                //     <button
                //       onClick={(e) => handleSubmit(e)}
                //       className="btn btn-primary w-100 my-3 fw-bold"
                //     >
                //       {loading ? (
                //         <RotatingLines
                //           height="23"
                //           width="23"
                //           strokeWidth="5"
                //           animationDuration="0.75"
                //           strokeColor="white"
                //         />
                //       ) : (
                //         " Add New Subject"
                //       )}
                //     </button>
                //   </div>
                // </div>
              }
            </div>
          </div>
        </div>
      </div>

  );
};

export default Subject;
