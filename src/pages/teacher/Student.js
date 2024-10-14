import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import { IoMdDownload } from "react-icons/io";
import SideNav from "./SideNav";

const Student = () => {
  const [spinner, setSpinner] = useState(false);
  const classInfo = useSelector((state) => state.classInfo.class);
  const [section, setSection] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [selectedStudentClass, setSelectedStudentClass] = useState([]);
  const [selectedStudentSection, setSelectedStudentSection] = useState([]);
  const [students, setStudents] = useState([]);

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

 


  useEffect(() => {
   
    classInfo?.map((item, i) => {
      return setSelectedStudentSection(
        classInfo.find((item) => item.number == selectedStudentClass)?.section
      );
    });
  }, [ selectedStudentClass]);
  return (
 
    
      <div>
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Students
        </h2>

        <div class="container">
       
         
          {/* tab content */}

       
     
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

                      
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {!spinner && students.length > 0
                        ? [...students]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            ?.map((item, i) => {
                              return students.length > 0 ? (
                                <tr>
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

     
        </div>
      </div>
    )
};

export default Student;
