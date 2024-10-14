import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Marks = () => {
  const [examId, setExamId] = useState("");
  const [examLIst, setExamList] = useState([]);
  const user = useSelector((state) => state.userInfo.user);
  const [marks, setMarks] = useState([]);
  const [studentMark, setStudentMark] = useState({});
  const[section,setSection] = useState({})
  const sectionInfo = useSelector(state=>state.sectionInfo.section)

  console.log(user)
  useEffect(() => {
    setSection(
        sectionInfo?.find(item=> item._id == user?.section)
    )

    setExamList(section?.exams);
  }, [examId,sectionInfo,user]);

  const handleGetStudentMarks = () => {  
    const marks = user?.marks?.find((item) => item.exam === examId);
    console.log(marks)
    setStudentMark(marks);
  };
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

  return (
    <div
      class=" p-3 w-100"

    >
        <h2 className="w-100 p-3 fw-bold text-center bg-success text-light ">Marks</h2>
      <div className="container-fluid d-md-flex align-items-center justify-content-between px-0 gap-2">
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
        <div
          className="btn btn-primary w-100 fw-bold"
          onClick={() => handleGetStudentMarks()}
        >
          {" "}
          Get Details
        </div>
      </div>
      {studentMark?.marks ? (
        <table className="table table-bordered table-hover mt-5">
          <thead className="thead-dark">
            <tr className="bg-secondary">
              <th className="bg-secondary text-light">Student Name</th>
              <th className="bg-secondary text-light text-center" colSpan="3">
                {user?.name}
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
                <td>{mark?.mark}</td>
                <td>100</td>
                <td>{mark?.mark}%</td>
              </tr>
            ))}
            <tr>
              <td className="fw-bold">Total</td>
              <td className="fw-semibold">
                {studentMark?.marks?.reduce(
                  (total, item) => total + item?.mark,
                  0
                )}
              </td>
              <td className="fw-semibold">
                {studentMark?.marks?.length * 100}
              </td>
              <td className="fw-semibold">
                {(
                  (studentMark?.marks?.reduce(
                    (total, item) => total + item.mark,
                    0
                  ) /
                    (studentMark?.marks?.length * 100)) *
                  100
                ).toFixed(1)}
                %
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No Data Found</p>
      )}
    </div>
  );
};

export default Marks;
