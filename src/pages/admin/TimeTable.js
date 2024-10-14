import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import SideNav from "./SideNav";
import { RotatingLines } from "react-loader-spinner";

const TimeTable = () => {
  const sectionInfo = useSelector((state) => state.sectionInfo.section);
  const teacherInfo = useSelector((state) => state.teacherInfo.teacher);
  const classInfo = useSelector((state) => state.classInfo.class);
  const componentRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [sections, setSections] = useState([]);
  const [subject, setSubject] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [timeTable, setTimeTable] = useState("");
  const [loading,setLoading] = useState(false)
  const [sectionId, setSectionId] = useState("");
  const [timeSlots, setTimeSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });
 

  const handleClassChange = (e) => {
    setSections("");
    classInfo?.map((item, i) => {
      return setSections(
        classInfo.find((item) => item.number == e.target.value)?.section
      );
    });
  };

  // Fetch sections, teachers, and subjects on component mount
  useEffect(() => {
    setTeachers(teacherInfo);

    setSubject(sectionInfo?.find((item) => item._id == sectionId)?.subjects);

    if (sectionId) {
      setTimeTable(
        sectionInfo?.find((item) => item._id == sectionId)?.timetable
      );
    }
  }, [sectionInfo, teacherInfo, sectionId]);

  // Handle input change for dynamic time slots
  const handleTimeSlotChange = (day, index, field, value) => {
    const newTimeSlots = { ...timeSlots };
    newTimeSlots[day][index][field] = value;
    setTimeSlots(newTimeSlots);
  };

  const handleDelete =async(id)=>{
    try {
        setLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/timetable/${id}`);
        setLoading(false)
      if(response.status == 201){
        enqueueSnackbar(response.data.msg,{variant:'success'})
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }else{
        enqueueSnackbar(response.data.msg,{variant:'warning'})
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // Add a new empty time slot
  const addTimeSlot = (day) => {
    const newTimeSlots = { ...timeSlots };
    newTimeSlots[day].push({ time: "", subject: "", teacher: "" });
    setTimeSlots(newTimeSlots);
  };

  // Remove a time slot
  const removeTimeSlot = (day, index) => {
    const newTimeSlots = { ...timeSlots };
    newTimeSlots[day].splice(index, 1);
    setTimeSlots(newTimeSlots);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/timetable`,
        { sectionId, timeSlots }
      );

      if (response.status == 201) {
        enqueueSnackbar("Time Table Added SuccessFully", {
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
      setSectionId("");
      setTimeSlots({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
   
      <div className="w-100"  >
        <SideNav/>
        <h2 className="text-center no-print  bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Time Tables
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
                View Time Table
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
                Add Time Table
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
              <div style={{ position: 'absolute', right: 20, zIndex: 100, top: 180 }}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => <button className="btn btn-secondary fw-bold">Print</button>}
          documentTitle="Time Table"
          onBeforeGetContent={() => {
            // Add custom styles for printing
            const style = document.createElement('style');
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
                        value={sections}
                        onChange={(e) => {
                          setSectionId(e.target.value);
                        }}
                        class="form-select"
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option selected value="">
                          Choose...
                        </option>
                        {sections?.map((item, i) => {
                          return (
                            <option value={item._id}>{item.section}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
           


              <div className="container mt-5" ref={componentRef}
        style={{ width: "100%", height: "auto", overflow: "hidden" }}>
            <div className="print-header " style={{ display: 'none' }}>
         <div className="d-flex justify-content-evenly mb-4" >
         <img src={logo} height={50} width={50} alt="Logo" />
         <h2 className="fw-bold">SPV MATRICULATION SCHOOL-NAGAPATTINAM</h2>
         </div>
        </div>
      <h2 className="mb-4 fw-bold text-center">Timetable</h2>

      {/* Section and Class Information */}
      <div className="mb-4">
        {/* <h5>Section: {timetable.section.name}</h5>
        <h6>Class: {timetable.section.class}</h6> */}
      </div>
      <div className="container mt-5">
   
      
    {timeTable ? <div className="p-0 m-0"><table class="table w-100" >
<thead>
<tr>
    <th className="p-2 bg-danger text-light fw-bolder " scope="col">Day / Time</th>
    {
    timeTable?.timeSlots?.Monday?.map((item,i)=>{
        return <th className="p-2 bg-warning " key={i}>{item.time}</th>
    })
    }
</tr>
</thead>
<tbody>
<tr>
    <th scope="row" className="bg-warning">Monday</th>
    {
    timeTable?.timeSlots?.Monday?.map((item,i)=>{
        return(
            <td className="bg-info p-3"><span className="fw-bold">{item.subject.toUpperCase()}</span><br/> / {item.teacher}</td>
        )
    })
    }
</tr>
<tr>
    <th scope="row" className="bg-warning">Tuesday</th>
    {
    timeTable?.timeSlots?.Tuesday?.map((item,i)=>{
        return(
            <td className="bg-info p-3"><span className="fw-bold">{item.subject.toUpperCase()}</span> <br/> / {item.teacher}</td>
        )
    })
    }
</tr>
<tr>
    <th scope="row"className="bg-warning">Wednesday</th>
    {
    timeTable?.timeSlots?.Wednesday?.map((item,i)=>{
        return(
            <td className="bg-info p-3"><span className="fw-bold">{item.subject.toUpperCase()}</span> <br/> / {item.teacher}</td>
        )
    })
    }
</tr>
<tr>
    <th scope="row"className="bg-warning">Thursday</th>
    {
    timeTable?.timeSlots?.Thursday?.map((item,i)=>{
        return(
            <td className="bg-info p-3"><span className="fw-bold">{item.subject.toUpperCase()}</span> <br/> / {item.teacher}</td>
        )
    })
    }
</tr>
<tr>
    <th scope="row"className="bg-warning">Friday</th>
    {
    timeTable.timeSlots?.Friday?.map((item,i)=>{
        return(
            <td className="bg-info p-3"><span className="fw-bold">{item.subject.toUpperCase()}</span> <br/> / {item.teacher}</td>
        )
    })
    }
</tr>
</tbody>
</table>

<div className="w-100 justify-content-center d-flex" class="no-print">
  <button className="btn btn-danger fw-bold " onClick={()=>handleDelete(sectionId)}>  {loading ? (
                      <RotatingLines
                        height="23"
                        width="23"
                        strokeColor="white"
                        strokeWidth="5"
                      />
                    ) : (
                      "Delete Timetable"
                    )}</button>
</div>
</div>
:<p className="text-center">No data Found</p>}
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
                <div className="container mt-5">
                  <h2>Register Weekly Timetable</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label htmlFor="section">Class</label>
                        <select
                          className="form-control"
                          onChange={(e) => handleClassChange(e)}
                          required
                        >
                          <option value="">Select Section</option>
                          {classInfo?.map((item, i) => (
                            <option key={i} value={item.number}>
                              {item.className}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="section">Section</label>
                        <select
                          className="form-control"
                          value={sectionId}
                          onChange={(e) => setSectionId(e.target.value)}
                          required
                        >
                          <option value="">Select Section</option>
                          {sections?.map((section) => (
                            <option key={section._id} value={section._id}>
                              {section.section}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {Object.keys(timeSlots)?.map((day) => (
                      <div key={day} className="mt-4">
                        <h4>{day}</h4>
                        {timeSlots?  timeSlots[day].map((timeSlot, index) => (
                          <div key={index} className="row mb-3">
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Time (e.g., 9:00 AM - 10:00 AM)"
                                value={timeSlot.time}
                                onChange={(e) =>
                                  handleTimeSlotChange(
                                    day,
                                    index,
                                    "time",
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                            <div className="col-md-3">
                              <select
                                className="form-control"
                                value={timeSlot.subject}
                                onChange={(e) =>
                                  handleTimeSlotChange(
                                    day,
                                    index,
                                    "subject",
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option value="">Select Subject</option>
                                {subject.map((subject) => (
                                  <option key={subject._id} value={subject.subName}>
                                    {subject.subName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-3">
                              <select
                                className="form-control"
                                value={timeSlot.teacher}
                                onChange={(e) =>
                                  handleTimeSlotChange(
                                    day,
                                    index,
                                    "teacher",
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option value="">Select Teacher</option>
                                {teachers?.map((teacher) => (
                                  <option key={teacher._id} value={teacher.name}>
                                    {teacher.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              {index !== 0 && (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeTimeSlot(day, index)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        )):''}

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => addTimeSlot(day)}
                        >
                          Add Time Slot
                        </button>
                      </div>
                    ))}

                    <div className="mt-4">
                      <button type="submit" className="btn btn-success">
                        Submit Timetable
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
  );
};

export default TimeTable;
