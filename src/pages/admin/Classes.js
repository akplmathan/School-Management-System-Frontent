import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { GetAllClasss } from "../../redux/slice/classSlice";
import { useSelector } from "react-redux";
import { RotatingLines ,TailSpin} from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";

const Classes = () => {
  const classInfo = useSelector((state) => state.classInfo.class);
  const sectionInfo = useSelector((state) => state.sectionInfo.section);
  const teacherInfo = useSelector((state) => state.teacherInfo.teacher);
  const navigate = useNavigate()


  const [editClass, setEditClass] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [selectedClass,setSelectedClass] = useState([])
  const [selectedSection,setSelectedSection] = useState([])
  const [classLetter, setClassLetter] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [teacherName, setTeacherName] = useState(null);
  const [teacherId, setTeacherId] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [editClassInfo, setEditClassInfo] = useState({
    id: "",
    classInletter: "",
    classInNumber: "",
  });


  //select Separate Classe;

  const handleSelectSeparateClass = (e) => {
      
      const classVal =  (classInfo?.find(item=>item.number==e.target.value))?.section
    setSelectedClass(classVal);
   
    const sectionVal = sectionInfo
  .filter(section1 => classVal.some(section2 => section2._id === section1._id))
  .map(student => student);
  setSelectedSection(sectionVal)
  };

  const handleEditClass = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/class-update/${editClassInfo.id}`,
        {
          name: editClassInfo.classInletter,
          number: editClassInfo.classInNumber,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status == 201) {
        enqueueSnackbar("Class Updated SuccessFully", { variant: "success" });
        window.location.reload();
        setEditClass(false);
      } else {
        enqueueSnackbar("Something Went wrong", { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreClassData = (item) => {
    setEditClass(true);
    setEditClassInfo({
      id: item._id,
      classInletter: item?.className,
      classInNumber: item.number,
    });
  };

  //section register
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  const handleAddSection = async () => {
    try {
      setLoading2(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/sectionReg`,
        {
          classID: className,
          section,
          classTeacher: teacherName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLoading2(false);

      if (response.status == 201) {
        enqueueSnackbar("Section Added SuccessFully", { variant: "success" });
        setAddSection(false);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClassRegister = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/classReg`,
        {
          className: classLetter,
          number: classNumber,
          teacherID: [teacherId],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLoading1(false);
      if (response.status == 201) {
        enqueueSnackbar("Class Added SuccessFully", { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

      
      <div className="w-100">
        <SideNav/>
        <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">Manage Classes</h2>

        {/* tabs ************************************************************************************************************** */}

        <div className="tabs">
          <div class="container-fluid p-0">
            {/* Edit Class tab 1 ********************* */}
            {editClass && (
              <div
                style={{
                  position: "fixed",
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
                        setEditClass(false);
                      }}
                    />
                  </div>
                  <h2 className="text-center fw-bold">Class Edit</h2>
                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Class In Letters
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        value={editClassInfo.classInletter}
                        name="classInLetter"
                        onChange={(e) =>
                          setEditClassInfo({
                            ...editClassInfo,
                            classInletter: e.target.value,
                          })
                        }
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Class In Numeric
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={editClassInfo.classInNumber}
                        name="classInNumber"
                        onChange={(e) =>
                          setEditClassInfo({
                            ...editClassInfo,
                            classInNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-primary "
                    onClick={() => handleEditClass()}
                  >
                    {" "}
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Edit Section ********************* */}
            {editSection && (
              <div
                style={{
                  position: "fixed",
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
              ></div>
            )}

            {/* Add Section */}
            {addSection && (
              <div
                style={{
                  position: "fixed",
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
                >                  <div className="w-100 d-flex fw-bold justify-content-end"><IoMdClose size={25} onClick={()=>{setAddSection(false)}} /></div>
                  <h2 className="text-center fw-bold">
                    Create Section
                  </h2>
                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        class="form-select"
                        id="inputGroupSelect02"
                      >
                        <option value="">Choose..</option>
                        {classInfo?.map((item, i) => {
                          return (
                            <option value={item._id}>{item?.className}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-semibold fs-5 mb-2">
                      {" "}
                      Section
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={section}
                        onChange={(e) =>
                          setSection(e.target.value.toUpperCase())
                        }
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        placeholder=" A to Z"
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
                      <select
                        value={teacherName}
                        onChange={(e) => {
                          setTeacherName(e.target.value);
                        }}
                        class="form-select"
                        id="inputGroupSelect02"
                      >
                        <option value="">Choose..</option>
                        {teacherInfo?.map((item, i) => {
                          return (
                            <option key={i} value={item._id}>
                              {item?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary "
                    onClick={() => handleAddSection()}
                  >
                    {" "}
                    Add New Section
                  </button>
                </div>
              </div>
            )}

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
                  Class List
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
                  Add New Class
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link fw-bold "
                  id="tab3-tab"
                  data-toggle="tab"
                  href="#tab3"
                  role="tab"
                  aria-controls="tab3"
                  aria-selected="false"
                >
                  Manage Section
                </a>
              </li>
            </ul>

            {/* Class List// ***************************************************************************/}

            <div class="tab-content" id="myTabContent">
            
            {/* tab-1// */}
              <div
                class="tab-pane fade show active p-3"
                id="tab1"
                role="tabpanel"
                aria-labelledby="tab1-tab"
              >
                <table class="table table-striped bg-primary mt-3">
                  <thead>
                    <tr className="py-2">
                      <th className='bg-primary text-light'  scope="col">NO.</th>
                      <th className='bg-primary text-light'  scope="col">CLASS</th>
                      <th className='bg-primary text-light'  scope="col">SECTION</th>
                      <th className='bg-primary text-light'  scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {classInfo
                      ? classInfo?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td className="fw-semibold">{item?.className}</td>
                              <td className="fw-semibold">{item.section?.map((section,ind)=>{return( <div key={ind} onClick={()=>navigate('/admin/student')} className="btn btn-success mx-1">{section.section}</div> )})}</td>
                              <td className="p-2">
                            <div
                              className="btn btn-info rounded"
                              onClick={() => {
                                handlePreClassData(item);
                              }}
                            >
                              <MdEdit size={15} /> Edit
                            </div>
                         
                          </td>
                            </tr>
                          );
                        })
                      : "No data Found"}
                  </tbody>
                </table>
              </div>

              {/* Add Class tab-2 ***********************************************************/}

              <div
                class="tab-pane fade px-5 pt-lg-5 "
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <div className="container ">
                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-bold fs-5 mb-2">
                      {" "}
                      Class in Letters
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={classLetter}
                        onChange={(e) => setClassLetter(e.target.value)}
                        type="text"
                        class="form-control"
                        id="inputGroupFile02"
                        placeholder=" EX : Class-1"
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 ">
                    <label htmlFor="" className="fw-bold fs-5 mb-2">
                      {" "}
                      Class In Numeric
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={classNumber}
                        onChange={(e) => setClassNumber(e.target.value)}
                        type="text"
                        class="form-control"
                        id="inputGroupFile02"
                        placeholder="Ex : 1"
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-bold fs-5 mb-2">
                      {" "}
                      Teacher
                    </label>
                    <div class="input-group mb-3">
                      <select
                        class="form-select"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        id="inputGroupSelect02"
                      >
                        <option>Choose...</option>
                        {teacherInfo
                          ? teacherInfo?.map((item, i) => {
                              return (
                                <option value={item._id}>{item?.name}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100 my-3 fw-bold"
                    onClick={() => handleClassRegister()}
                  >
                    {loading1 ? (
                      <RotatingLines
                        height="23"
                        width="23"
                        strokeColor="white"
                        strokeWidth="5"
                      />
                    ) : (
                      "Create Class"
                    )}
                  </button>
                </div>
              </div>

              {/* *********************************************tab-3 */}

              <div
                class="tab-pane fade p-3"
                id="tab3"
                role="tabpanel"
                aria-labelledby="tab3-tab"
              >
                <div className="d-flex px-3 justify-content-between">
                  <div>
                  <div className="d-flex w-auto">
                    <label htmlFor="" className="me-3 fw-semibold my-2">
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={e=>e.target.value}
                        onChange={(e) =>
                          handleSelectSeparateClass(e)
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
                  <div>
                    <button
                      onClick={() => {
                        setAddSection(true);
                      }}
                      className="btn btn-primary rounded text-light fw-semibold"
                    >
                     <span className="fw-bold">+</span> Add New Section
                    </button>
                  </div>
                </div>

                {/* section from */}
                <table class="table  table-striped mt-3">
                  <thead className="d-hidden">
                    <tr>
                      <th className="bg-primary py-3 text-light" scope="col">NO.</th>
                      <th className="bg-primary py-3 text-light" scope="col">CLASS</th>
                      <th className="bg-primary py-3 text-light" scope="col">SECTION</th>
                      <th className="bg-primary py-3 text-light" scope="col">CLASS TEACHER</th>
                      <th className="bg-primary py-3 text-light" scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {selectedSection
                      ? selectedSection?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td className="fw-semibold">{item?.className?.className}</td>
                              <td className="fw-semibold">{item.section}</td>
                              <td className="fw-semibold">{item.teacher?.name}</td>
                              <td > 
                                <div className="btn btn-danger fw-semibold">Delete </div>
                              </td>
                            </tr>
                          );
                        })
                      : "No data Found"}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Classes;
