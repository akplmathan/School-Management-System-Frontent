import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RotatingLines } from "react-loader-spinner";
import SideNav from "./SideNav";

const Exam = () => {


  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([{ subject: "", date: "" }]);
  const [examType, setExamType] = useState("FN");
  const [selectedClass, setSelectedClass] = useState([]);
  const [loading, setLoading] = useState(false);

  const classInfo = useSelector((state) => state.classInfo.class);
  const [selectedStudentClass, setSelectedStudentClass] = useState([]);
  const [selectedClassList, setSelectedClassList] = useState([]);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: "", date: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/examReg`,
        {
          sectionId,
          name,
          subjects,
          examType,
        }
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  useEffect(() => {
    setSelectedClass(classInfo?.find((item) => item._id == classId)?.section);
    setSelectedClassList(
      classInfo?.find((item) => item.number == selectedStudentClass)?.section
    );
  }, [classId, selectedStudentClass]);

  return (
  
      
      <div className="w-100" >
        <SideNav/>
        <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">
          Manage Exams
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
                Exams
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
                Add Exam
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
              <div>
                {selectedClassList?.map((section, i) => {
                  return (
                    <>
                      <h4 className="text-center text-light bg-primary w-100 py-2  fw-bold">
                        SECTION {section.section}
                      </h4>
                      {section.exams.length > 0 ? (
                        section.exams.map((item, i) => {
                          return (
                            <>
                              <div className="d-flex justify-content-between align-items-center bg-secondary-subtle p-2 mt-4">
                                <h6 className="fw-bold">EXAM : {item.name}</h6>
                                <h6 className="fw-bold">
                                  EXAM TIME : {item.examType}
                                </h6>
                              </div>

                              <table class="table  mt-4">
                                <thead>
                                  <tr>
                                    <th scope="col">NO.</th>
                                    <th scope="col">SUBJECT</th>
                                    <th scope="col">DATE</th>
                               
                                  </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                  {item.subjects?.map((sub, i) => {
                                    return (
                                      <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{sub.subject}</td>
                                        <td>
                                          {
                                            new Date(sub.date)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                      
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </>
                          );
                        })
                      ) : (
                        <p className="text-center">No Data Found</p>
                      )}
                    </>
                  );
                })}
              </div>
            </div>

            {/* tab-2// */}
            <div
              class="tab-pane fade p-3"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <form className="container mt-5">
                <div className="form-group mb-3">
                  <label className="fw-bold">Class :</label>
                  <select
                    name="classId"
                    onChange={(e) => setClassId(e.target.value)}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option selected>Choose...</option>
                    {classInfo?.map((item, i) => {
                      return <option value={item._id}>{item.className}</option>;
                    })}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="fw-bold">Section:</label>
                  <select
                    value={sectionId}
                    name="sectionId"
                    onChange={(e) => setSectionId(e.target.value)}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option selected>Choose...</option>
                    {selectedClass?.map((item, i) => {
                      return <option value={item._id}>{item.section}</option>;
                    })}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="fw-bold">Exam Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Exam Name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="fw-bold">Exam Type</label>
                  <select
                    className="form-control"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    required
                  >
                    <option value="FN">FN</option>
                    <option value="AN">AN</option>
                  </select>
                </div>
                {subjects?.map((subject, index) => (
                  <div className="form-group mb-3" key={index}>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="fw-bold">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          value={subject.subject}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "subject",
                              e.target.value
                            )
                          }
                          placeholder="Subject"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="fw-bold">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={subject.date}
                          onChange={(e) =>
                            handleSubjectChange(index, "date", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={handleAddSubject}
                >
                  Add Subject
                </button>

                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-100 fw-bold"
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
                    " Schedule New Exam "
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Exam;
