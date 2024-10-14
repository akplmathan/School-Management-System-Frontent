import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { PiStudentFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { BsSearch } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import Attendance from "../admin/Attendance";

// Register necessary components for Doughnut chart
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [spinner, setSpinner] = useState(false);
  const student = useSelector((state) => state.studentInfo.student);
  const teacher = useSelector((state) => state.teacherInfo.teacher);
  const parent = useSelector((state) => state.parentInfo.parent);
  const [presentCount, setPresentCount] = useState(null);
  const [students, setStudents] = useState([]);
  const [FilterStudents, setFilterStudents] = useState([]);
  const user = useSelector((state) => state.userInfo.user);
  const section = useSelector((state) => state.sectionInfo.section);
  const [attendance, setAttendance] = useState([]);
  const [AttPer,setAttPer] = useState('')

  const storeData = [
    {
      label: "ClassMates",
      value:FilterStudents?.length,
    },
    {
      label: "Teachers",
      value: teacher?.length,
    },
    {
      label: "Attendance Percentage",
      value: AttPer,
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setAttendance(
      user?.attendance?.filter(record => record.status === "Present").length)

    const handleClassMates = () => {
      setStudents(section?.find((item) => item._id == user.section).students);
    };
    handleClassMates();

    if(attendance){
      setAttPer(
       attendance==0?  0:(attendance / user?.attendance?.length *100).toFixed(0)
      )
    }
    if (students) {
      setFilterStudents(students?.filter((item) => item._id != user?._id));
    }
  }, [students, user]);

  

  return (
    <div className="conatainer-fluid w-100">
      <SideNav />
      <div className="row p-3">
        {/* Student, Teacher, Parent, and Admin Cards */}
        <Link
          to={"/student/class-mates"}
          className="text-decoration-none p-0 m-0 col-lg-4"
        >
          <div className="p-2 text-center">
            <div
              className="card position-realtive"
              style={{
                color: "white",
                background:
                  "linear-gradient(180deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
              }}
            >
              <div className="p-3">
                <div
                  className="position-absolute"
                  style={{ left: 15, top: "25%" }}
                >
                  <PiStudentFill size={60} />
                </div>
                <div className="fw-bold ">
                  <h2>Class Mates</h2>
                  <h3>{FilterStudents?.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to={"/student/teacher-section"}
          className="text-decoration-none p-0 m-0 col-lg-4"
        >
          <div className="p-2 text-center">
            <div
              className="card position-realtive"
              style={{
                color: "white",
                background:
                  "linear-gradient(160deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
              }}
            >
              <div className="p-3">
                <div
                  className="position-absolute"
                  style={{ left: 15, top: "25%" }}
                >
                  <FaPersonChalkboard size={60} />
                </div>
                <div className="fw-bold ">
                  <h2>Teachers</h2>
                  <h3>{teacher?.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to={"/student/parents"}
          className="text-decoration-none p-0 m-0 col-lg-4"
        >
          <div className="p-2 text-center">
            <div
              className="card position-realtive"
              style={{
                color: "white",
                background:
                  "linear-gradient(30deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
              }}
            >
              <div className="p-3">
                <div
                  className="position-absolute"
                  style={{ left: 15, top: "25%" }}
                >
                  <MdFamilyRestroom size={60} />
                </div>
                <div className="fw-bold ">
                  <h2>
                    My <br /> Parents
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to={"/student/profile"}
          className="text-decoration-none p-0 m-0 col-lg-4"
        >
          <div className="p-2 text-center">
            <div
              className="card position-realtive"
              style={{
                color: "white",
                background:
                  "linear-gradient(60deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
              }}
            >
              <div className="p-3">
                <div
                  className="position-absolute"
                  style={{ left: 15, top: "25%" }}
                >
                  <IoPerson size={60} />
                </div>
                <div className="fw-bold ">
                  <h2>
                    my <br /> Profile
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link
        
          className="text-decoration-none p-0 m-0 col-lg-4"
        >
          <div className="p-2 text-center">
            <div
              className="card position-realtive"
              style={{
                color: "white",
                background:
                  "linear-gradient(130deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
              }}
            >
              <div className="p-3">
                <div
                  className="position-absolute"
                  style={{ left: 15, top: "25%" }}
                >
                  <IoPerson size={60} />
                </div>
                <div className="fw-bold ">
                  <h2>
                    Attendance
                  </h2>
                  <h3>
                    {AttPer}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Doughnut Chart */}
      <div className="h-50 w-100 d-flex mt-3 justify-content-center">
        <Doughnut
          data={{
            labels: storeData.map((item) => item.label),
            datasets: [
              {
                label: "Counts",
                data: storeData.map((data) => data.value),
                backgroundColor: ["orangered", "green", "blueviolet", "violet"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
