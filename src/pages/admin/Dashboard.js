import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { PiStudentFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { BsGraphUpArrow, BsSearch } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

// Register necessary components for Doughnut chart
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate()
  const [spinner,setSpinner]  = useState(false)
  const [admin, setAdmin] = useState([]);
  const student = useSelector((state) => state.studentInfo.student);
  const teacher = useSelector((state) => state.teacherInfo.teacher);
  const parent = useSelector((state) => state.parentInfo.parent);
  const[classInfo,setClassInfo] = useState([])
  const [presentCount, setPresentCount] = useState(null);
  const [filteredStudents,setFillteredStudents] = useState([]);
  const [searchQuery,setSearchQuery] = useState('')

  const getYearBasedOnFebruary = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return today.getMonth() >= 1 ? currentYear - 1 : currentYear;
};

  const classData = useQuery({
    queryKey:["classData"],
    queryFn :() =>  fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllClass?startYear=${getYearBasedOnFebruary()}`).then((data)=> data.json())
  })
    useEffect(()=>{
        setClassInfo(classData?.data)
      },[classData?.data])

  const storeData = [
    {
      label: "Students",
      value: student?.length,
    },
    {
      label: "Teachers",
      value: teacher?.length,
    },{
      label: "Parents ",
      value: parent?.length,
    },
    {
      label: "Student Present",
      value: presentCount,
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  // Count present students based on attendance records
  const handleCountPresentStudents = () => {
    const presentStudentsCount = student?.reduce((count, student) => {
      const isPresentToday = student.attendance?.some(
        (record) =>
          new Date(record.date).toISOString().split("T")[0] === today &&
          record.status === "Present"
      );
      return isPresentToday ? count + 1 : count;
    }, 0);

    setPresentCount(presentStudentsCount);
  };

  const handleSearch = (event) => {
    setSpinner(true)
    const query = event.target.value.toLowerCase().trim();
    setSearchQuery(query);

    const filtered = student.filter((stu) =>
      stu.name.toLowerCase().includes(query)
    );
    setFillteredStudents(event.target.value ? filtered : "");
    setTimeout(() => {
      setSpinner(false)
    }, 500);
  };

  useEffect(() => {
    // Fetch admin data
    const handleAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getAllAdmin`
        );
        if (response) {
          setAdmin(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleAdmin();
  }, []);

  useEffect(() => {
    handleCountPresentStudents();
  }, [student]); // Recalculate attendance when student data changes

  console.log(filteredStudents);
  
  return (

     
      <div className="conatainer-fluid w-100">
        <SideNav />
        <div className="row p-3">
          <div className="d-flex justify-content-end">
            <div className="input-group w-50 p-2">
              <input
              
              onChange={e=>handleSearch(e)}
                type="text"
                className="form-control p-2 w-25"
                placeholder="Search Students...."
                id="inputGroupFile02"
              />
              <button className="btn btn-secondary" type="button">
                <BsSearch/>
              </button>
            </div>
          </div>
          {
            searchQuery &&   <table
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

                {/* <th className="bg-primary text-light py-3 no-print" scope="col">
                  ACTION
                </th> */}
              </tr>
              
            </thead>
            <tbody class="table-group-divider  justify-content-center">
                 {
                  spinner && <RotatingLines

                  visible={true}
                  height="40"
                  width="40"
                  strokeColor="grey"
                  ariaLabel="tail-spin-loading"
                  radius="10"
                  wrapperStyle={{}}
                
                />
                 }
              {!spinner && filteredStudents.length > 0
                ?
                    filteredStudents?.map((item, i) => {
                      return filteredStudents.length > 0 ? (
                        <tr onClick={()=>navigate(`/admin/view-student/${item._id}`)}>
                          <th scope="row">{i + 1}</th>
                          <td>
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
                          <td className="fw-semibold">{item.emis}</td>
                          <td className="fw-semibold">{item.name}</td>

                          <td className="fw-semibold">{item.gender}</td>
                          <td className="fw-semibold">{item.email}</td>
                          <td className="fw-semibold">{item.phone}</td>

                          {/* <td className="p-2 no-print" >
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
                          </td> */}
                        </tr>
                      ) : (
                        <p>No Data Found</p>
                      );
                    })
                : !spinner && <p>No Data Found</p>}
            </tbody>
          </table>

          }

          {/* Student, Teacher, Parent, and Admin Cards */}
          <Link
            to={"/admin/student"}
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
                    <h2>Students</h2>
                    <h3>{student?.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={"/admin/teacher"}
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
            to={"/admin/parents"}
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
                    <h2>Parents</h2>
                    <h3>{parent?.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={"/admin/roll-manage"}
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
                    <h2>Admin</h2>
                    <h3>{admin?.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={"/admin/attendance"}
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
                    <h2>Students Present</h2>
                    <h3>{presentCount || 0}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to={"/admin/markReport"}
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
                    <BsGraphUpArrow size={60} />
                  </div>
                  <div className="fw-bold ">
                    <h2>General <br />  Reports</h2>
                  
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Doughnut Chart */}
        <div className=" w-100 d-flex mt-3 justify-content-center" style={{height:'60vh'}}>
          <Doughnut
            data={{
              labels: storeData.map((item) => item.label),
              datasets: [
                {
                  label: "Counts",
                  data: storeData.map((data) => data.value),
                  backgroundColor: ["orangered", "green", "blueviolet",'violet'],
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

        {/* //all Classs And Section// */}

        <div>
        <table class="table table-striped bg-primary m-3">
                  <thead>
                    <tr className="py-2">
                    
                      <th className='bg-primary text-light'  scope="col">CLASS</th>
                      <th className='bg-primary text-light'  scope="col">SECTION</th>

                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {classInfo
                      ? classInfo?.map((item, i) => {
                          return (
                            <tr key={i}>
                             
                              <td className="fw-semibold">{item?.className}</td>
                              <td className="fw-semibold">{item.section?.map((section,ind)=>{return( <div key={ind} onClick={()=>navigate(`/admin/student/${section._id}`)} className="btn btn-success mx-1">{section.section}</div> )})}</td>
                             
                            </tr>
                          );
                        })
                      : "No data Found"}
                  </tbody>
                </table>
        </div>
      </div>
   
  );
};

export default Dashboard;
