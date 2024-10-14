import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import { RotatingLines } from "react-loader-spinner";
import SideNav from "./SideNav";

const Attendance = () => {
  const classInfo = useSelector((state) => state.classInfo.class);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [sectionStudents, SetSectionStudents] = useState([]);
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const dateInput = new Date(date); // Input date
  dateInput.setUTCHours(0, 0, 0, 0);
  const { enqueueSnackbar } = useSnackbar();

  const [attendance, setAttendance] = useState([]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((a) =>
        a.studentId === studentId ? { ...a, status } : a
      )
    );
  };

  //attendance Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/studentAttendance`,
        { attendanceRecords: attendance }
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClassChange = (e) => {
    setSection('')
    classInfo?.map((item, i) => {
      return setSelectedClass(
        classInfo.find((item) => item.number == e.target.value)?.section
      );
    });
    setClasses(e.target.value);
  };

  //for atttendace mark
  const handleStudents = (e) => {
    SetSectionStudents(
      selectedClass?.find((item) => item.section == selectedSection)?.students
    );
  };

 

  //for attendance view
  const handleStudents1 = (e) => {
    SetSectionStudents(
      selectedClass?.find((item) => item.section == selectedSection)?.students
    );
  };
  const arr = [1, 2, 3, 4.5, 6, 7, 8, 9, 10];
  useEffect(() => {
    // Update attendance state whenever sectionStudents changes
    setAttendance(
      sectionStudents?.map((student) => ({
        studentId: student._id,
        status: "Present",
        date: new Date().toISOString().split("T")[0],
      }))
    );


  }, [sectionStudents]);

  return (
 
     
      <div className="w-100">
        <SideNav/>
        <h2 className="text-center  bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Attendance
        </h2>

        <div class="container">
          {/* nav tabs// */}

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
                Mark attendance
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
                View Attendance
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
              <div className="container-fluid d-lg-flex align-items-center justify-content-lg-between px-lg-5 px-2 my-4">
                <div className="input-group">
                  <div className="d-flex w-auto">
                    <label htmlFor="" className="me-3 fw-semibold my-2">
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <select
                        class="form-select"
                        onChange={(e) => {
                          handleClassChange(e);
                        }}
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option selected>Choose...</option>
                        {classInfo?.map((item, i) => {
                          return (
                            <option value={item.number}>
                              {item?.className}
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
                      Section
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={section}
                        onChange={(e) => {
                          setSelectedSection(e.target.value);
                          setSection(e.target.value);
                        }}
                        class="form-select"
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option selected value=''>Choose...</option>
                        {selectedClass?.map((item, i) => {
                          return (
                            <option value={item.section}>{item.section}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <div className="d-flex w-auto">
                    <label htmlFor="" className="me-3 fw-semibold my-2">
                      Date
                    </label>
                    <div class="input-group mb-3">
                      <input
                        disabled
                        value={new Date().toISOString().split("T")[0]}
                        type="date"
                        class="form-control"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <h4>Attendace For : Class -{classes}</h4>
                <h4>Section : {section}</h4>
                <h4>Date : {new Date().toISOString().split("T")[0]}</h4>
                {section !==''  && <div
                  className="btn btn-info text-light fw-bold my-3"
                  onClick={handleStudents}
                >
                  Get Students
                </div>}
              </div>

              <div className="container">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">NO.</th>
                      <th scope="col">EMIS </th>
                      <th scope="col">Name</th>

                      <th scope="col">Status</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {
                  [...sectionStudents].sort((a, b) => a.name.localeCompare(b.name))?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{item.emis}</td>
                          <td>{item.name}</td>

                          <td>
                            <div class=" w-50 d-flex gap-3">
                              <div
                                className="btn btn-success"
                                onClick={(e) =>
                                  handleAttendanceChange(item._id, "Present")
                                }
                              >
                                Present
                              </div>
                              <div
                                className="btn btn-danger "
                                onClick={(e) =>
                                  handleAttendanceChange(item._id, "Absent")
                                }
                              >
                                Absent
                              </div>
                            </div>
                          </td>
                          <td>
                            {attendance?.find(
                              (item1) => item1.studentId == item._id
                            )?.status == "Present" ? (
                              <div className="btn btn-success">P</div>
                            ) : (
                              <div className="btn btn-danger">A</div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div
                  className="btn btn-primary align-self-center"
                  onClick={() => handleSubmit()}
                >
                  {loading ? (
                    <RotatingLines
                      height="23"
                      width="23"
                      strokeColor="white"
                      strokeWidth="4"
                    />
                  ) : (
                    "Submit"
                  )}
                </div>
              </div>
            </div>

            {/* tab-2// */}
            {
              <div
                class="tab-pane fade p-3"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="container-fluid d-lg-flex align-items-center justify-content-lg-between px-lg-5 px-2 my-4">
                  <div className="input-group">
                    <div className="d-flex w-auto">
                      <label htmlFor="" className="me-3 fw-semibold my-2">
                        Class
                      </label>
                      <div class="input-group mb-3">
                        <select
                          class="form-select"
                          onChange={(e) => {
                            handleClassChange(e);
                          }}
                          id="inputGroupSelect04"
                          aria-label="Example select with button addon"
                        >
                          <option selected>Choose...</option>
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
                        Section
                      </label>
                      <div class="input-group mb-3">
                        <select
                          value={section}
                          onChange={(e) => {
                            setSelectedSection(e.target.value);
                            setSection(e.target.value);
                          }}
                          class="form-select"
                          id="inputGroupSelect04"
                          aria-label="Example select with button addon"
                        >
                          <option selected value={''}>Choose...</option>
                          {selectedClass?.map((item, i) => {
                            return (
                              <option value={item.section}>
                                {item.section}
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
                        Date
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                          class="form-control"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container ">
                  {section !=='' && <button
                    onClick={handleStudents1}
                    className="btn w-100 btn-info text-light fw-semibold "
                  >
                    View Attendance
                  </button>}
                </div>

                <div className="container">
                {  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">NO.</th>
                        <th scope="col">EMIS No</th>
                        <th scope="col">Name</th>

                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {     [...sectionStudents].sort((a, b) => a.name.localeCompare(b.name))?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{ item.emis}</td>
                            <td>{item.name}</td>
                            <td>
                              {
                                  item.attendance.find(info => {
                                    const infoDate = new Date(info.date);
                                    infoDate.setUTCHours(0, 0, 0, 0); // Normalize to start of the day
                                    return infoDate.getTime() === dateInput.getTime(); // Compare timestamps
                                  })?.status=='Present'?<div className="btn btn-success">P</div>:'' || 
                                  item.attendance.find(info => {
                                    const infoDate = new Date(info.date);
                                    infoDate.setUTCHours(0, 0, 0, 0); // Normalize to start of the day
                                    return infoDate.getTime() === dateInput.getTime(); // Compare timestamps
                                  })?.status=='Absent'?<div className="btn btn-danger">A</div>:''
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
 
  );
};

export default Attendance;
