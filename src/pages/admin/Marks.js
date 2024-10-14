import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import SideNav from "./SideNav";

const Marks = () => {
  const [exams, setExams] = useState([]);
  const [examLIst, setExamList] = useState([]);
  const [students, setStudents] = useState([]);
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [marks, setMarks] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedClassSection, setSelectedClassSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [studentMark,setStudentMark] = useState({})


  const { enqueueSnackbar } = useSnackbar();
  const studentInfo = useSelector(state=>state.studentInfo.student)
  const classInfo = useSelector((state) => state.classInfo.class);
  const sectionInfo = useSelector((state) => state.sectionInfo.section);



  useEffect(() => {
    setSelectedClassSection(
      classInfo?.find((item) => item.number == selectedClass)?.section
    );

    setSection(sectionInfo?.find((item) => item._id == selectedSection));
    setExamList(section?.exams);
    setStudents(section?.students);
    
    
  }, [selectedSection, selectedClass, section, studentId, examId]);

  const handleExamChange = async (e) => {
    setExamId(e.target.value);
 
    try {
      const examResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getExam/${e.target.value}`
      );
      const subjects = examResponse.data.subjects?.map((subject) => ({
        subject: subject.subject,
        mark: "",
      }));
      setMarks(subjects);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  const handleMarkChange = (index, newMark) => {
    const updatedMarks = marks?.map((mark, i) =>
      i === index ? { ...mark, mark: newMark } : mark
    );
    setMarks(updatedMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/markReg`,
        {
          examId,
          studentId,
          marks,
        }
      );

      if (response.status == 201) {
        enqueueSnackbar(response.data.msg,{variant:'success'});
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error registering marks:", error);
    }
  };

  const handleGetStudent = () => {
    if (!studentId || studentId=='') {
      return enqueueSnackbar("Please Select The Details", { variant: "warning" });
    }
  setSelectedStudent(students?.find((item) => item._id == studentId));

  };
  const handleGetStudentMarks = () => {
    if (!studentId || studentId === '') {
      return enqueueSnackbar("Please Select The Details", { variant: "warning" });
    }
  
    const selected = students?.find((item) => item._id === studentId);

    if (!selected) {
      return enqueueSnackbar("Student not found", { variant: "warning" });
    }

    setSelectedStudent(selected);
    const marks = selected?.marks?.find(item => item.exam === examId);

    setStudentMark(marks);
  };
  
  return (
   
     
      <div className="w-100">
        <SideNav/>
        <h2 className="fw-bold w-100 bg-success py-3 my-2 text-center text-light">
          Manage Marks
        </h2>
        <ul
          class="nav nav-tabs bg-secondary-subtle pt-1 ps-2 w-100 m-0 p-0"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item " >
            <a
              class="nav-link active fw-bold "
              id="tab1-tab"
              data-toggle="tab"
              href="#tab1"
              role="tab"
              aria-controls="tab1"
              aria-selected="true"
            >
              View Marks
            </a>
          </li>
          <li class="nav-item" >
            <a
              class="nav-link  fw-bold "
              id="tab2-tab"
              data-toggle="tab"
              href="#tab2"
              role="tab"
              aria-controls="tab2"
              aria-selected="false"
            >
              Add Marks
            </a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
       
       {/* tab 1 */}
          <div
            class="tab-pane fade show active p-3"
            id="tab1"
            role="tabpanel"
            aria-labelledby="tab1-tab"
          >
         <div className="container-fluid d-md-flex align-items-center justify-content-between px-0 gap-2">
              <div className="input-group mb-2 ">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Class
                </label>
                <div class="input-group mb-3">
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
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
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Section
                </label>
                <div class="input-group mb-3">
                  <select
                    value={selectedSection}
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {selectedClassSection?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.section}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Exam
                </label>
                <div class="input-group mb-3">
                  <select
                    value={examId}
                    onChange={(e) => {
                      handleExamChange(e);
                    
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {examLIst?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Student
                </label>
                <div class="input-group mb-3">
                  <select
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {students?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div
                className="btn btn-primary w-100 fw-bold"
                onClick={() => handleGetStudentMarks()}
              >
                {" "}
                Get Details
              </div>
            </div>
        {studentMark?.marks ?    <table className="table table-bordered table-hover mt-5">
                  <thead className="thead-dark">
                    <tr className="bg-secondary">
                      <th className="bg-secondary text-light">Student Name</th>
                      <th
                        className="bg-secondary text-light text-center"
                        colSpan="3"
                      >
                        {selectedStudent?.name}
                      </th>
                    </tr>
                    <tr>
                      <th className="fw-bolder">Subjects</th>
                      <th className="fw-bolder">Obtained Marks</th>
                      <th className="fw-bolder">Total Marks</th>
                      <th className="fw-bolder">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentMark?.marks?.map((mark, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{mark?.subject}</td>
                        <td>
                          {mark?.mark}
                        </td>
                        <td>100</td>
                        <td>{mark?.mark}%</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="fw-bold">Total</td>
                      <td className="fw-semibold">{studentMark?.marks?.reduce((total, item) => total + item?.mark, 0)}</td>
                      <td className="fw-semibold">{  (studentMark?.marks?.length)*100}</td>
                      <td className="fw-semibold">{(((studentMark?.marks?.reduce((total, item) => total + item.mark, 0))/( (studentMark?.marks?.length)*100))*100).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table> : <p className="text-center mt-4">No Data Found</p>}
          </div>
          {/* //content fron tab 2 */}
          <div
            class="tab-pane fade px-5 pt-lg-5 "
            id="tab2"
            role="tabpanel"
            aria-labelledby="tab2-tab"
          >
            <div className="container-fluid d-md-flex align-items-center justify-content-between px-0 gap-2">
              <div className="input-group mb-2 ">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Class
                </label>
                <div class="input-group mb-3">
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
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
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Section
                </label>
                <div class="input-group mb-3">
                  <select
                    value={selectedSection}
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {selectedClassSection?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.section}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Exam
                </label>
                <div class="input-group mb-3">
                  <select
                    value={examId}
                    onChange={(e) => {
                      handleExamChange(e);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {examLIst?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group mb-2">
                <label htmlFor="" className="fw-bold fs-5 mb-2">
                  {" "}
                  Student
                </label>
                <div class="input-group mb-3">
                  <select
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                    class="form-select"
                    id="inputGroupSelect02"
                  >
                    <option value="">Choose..</option>
                    {students?.map((item, i) => {
                      return (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div
                className="btn btn-primary w-100 fw-bold"
                onClick={() => handleGetStudent()}
              >
                {" "}
                Get Details
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {/* {selectedExam && <h4 className="w-100 fw-bold p-2 bg-info text-light mt-5 text-center">{selectedExam?.name}</h4>} */}
              {selectedStudent && (
                <table className="table table-bordered table-hover mt-5">
                  <thead className="thead-dark">
                    <tr className="bg-secondary">
                      <th className="bg-secondary text-light">Student Name</th>
                      <th
                        className="bg-secondary text-light text-center"
                        colSpan="2"
                      >
                        {selectedStudent?.name}
                      </th>
                    </tr>
                    <tr>
                      <th className="fw-bolder">Subjects</th>
                      <th className="fw-bolder">Obtained Marks</th>
                      <th className="fw-bolder">Total Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks?.map((mark, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{mark.subject}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={mark.mark}
                            onChange={(e) =>
                              handleMarkChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td>100</td>
                      </tr>
                    ))}
                  </tbody>
               
              <button
                type="submit"
                className="btn btn-primary fw-bold text-light my-3"
              >
                Submit
              </button>
                </table>
              )}

            </form>
          </div>
        </div>
      </div>
   
  );
};

export default Marks;
