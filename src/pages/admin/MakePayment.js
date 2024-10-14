import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import UpdatePayment from "./UpdatePayment";

const MakePayment = () => {
  const classInfo = useSelector((state) => state.classInfo.class);
  const sectionInfo = useSelector((state) => state.sectionInfo.section);
  const student = useSelector((state) => state.studentInfo.student);
  const [spinner, setSpinner] = useState(false);
  const [section, setSection] = useState("");
  const [selectedStudentClass, setSelectedStudentClass] = useState([]);
  const [selectedStudentSection, setSelectedStudentSection] = useState([])
  const [filteredStudents, setFillteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [payments,setPayments] = useState([])
  const [selectedPayment,setSelectedPayment] =useState('')
  const [prop, setProp] = useState("");
  const [students, setStudents] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    description: "",
    method: "",
    date: "",
    status: "Pending",
  });


  useEffect(() => {
   
    classInfo?.map((item, i) => {
      return setSelectedStudentSection(
        classInfo.find((item) => item.number == selectedStudentClass)?.section
      );
    });

    setPayments(students.length>0? students[0]?.payments:[])
  }, [ selectedStudentClass,students])
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


  const handleProps = (item) => {
    setProp(item);
    setFillteredStudents([]);
    setSearchQuery("");
  };

  console.log(payments)
  const handleSearch = (event) => {
    setSpinner(true);
    const query = event.target.value.trim();
    setSearchQuery(query);

    // Convert query to string for comparison
    const queryString = query.toLowerCase();

    // Filter students based on whether emis includes the query string
    const filtered = student.filter((stu) =>
      stu.emis.toString().includes(queryString)
    );

    setFillteredStudents(query ? filtered : student); // Show all students if search query is empty

    setTimeout(() => {
      setSpinner(false);
    }, 500);
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active fw-bold"
            id="updatePayment-tab"
            data-bs-toggle="tab"
            href="#updatePayment"
            role="tab"
            aria-controls="updatePayment"
            aria-selected="true"
          >
            Update Payment
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link fw-bold"
            id="checkStatus-tab"
            data-bs-toggle="tab"
            href="#checkStatus"
            role="tab"
            aria-controls="checkStatus"
            aria-selected="false"
          >
            Check Status
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        {/* tab-1 */}
        <div
          className="tab-pane fade show active"
          id="updatePayment"
          role="tabpanel"
          aria-labelledby="updatePayment-tab"
        >
          <div className="d-flex justify-content-end">
            <div className="input-group w-50 p-2">
              <input
                onChange={(e) => handleSearch(e)}
                type="text"
                className="form-control p-2 w-25"
                placeholder="Search Students...."
                id="inputGroupFile02"
              />
              <button className="btn btn-secondary" type="button">
                <BsSearch />
              </button>
            </div>
          </div>
          {searchQuery && (
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

                  {/* <th className="bg-primary text-light py-3 no-print" scope="col">
                  ACTION
                </th> */}
                </tr>
              </thead>
              <tbody class="table-group-divider  justify-content-center">
                {spinner && (
                  <RotatingLines
                    visible={true}
                    height="40"
                    width="40"
                    strokeColor="grey"
                    ariaLabel="tail-spin-loading"
                    radius="10"
                    wrapperStyle={{}}
                  />
                )}
                {!spinner && filteredStudents.length > 0
                  ? filteredStudents?.map((item, i) => {
                      return filteredStudents.length > 0 ? (
                        <tr key={i} onClick={() => handleProps(item)}>
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
          )}

          {prop && <UpdatePayment sectionId={prop.section} student={prop} />}
        </div>

        {/* tab-2// */}
        <div
          className="tab-pane fade"
          id="checkStatus"
          role="tabpanel"
          aria-labelledby="checkStatus-tab"
        >
           <div className="container-fluid d-flex mt-4 align-items-center justify-content-between px-lg-5 px-2">
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
          <div className="mb-3">
            <label htmlFor="paymentSelect" className="form-label fw-bold">
              Select Payment
            </label>
            <select id="paymentSelect" className="form-select" onChange={e=>{setSelectedPayment(e.target.value) 
            setSpinner(true)
               setTimeout(() => {
                setSpinner(false);
              }, 1500);
            }
              
            } required>
              <option value="">Select Payment</option>
              {payments?.map((payment) => (
              <option key={payment._id} value={payment._id}>
                {payment.description} - {payment.amount}
              </option>
            ))}
            </select>
          </div>

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
                          PHONE
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          STATUS
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
                                  <td className="fw-semibold">{item.phone}</td>
                                  <td> 
                                    {
                                      (item.payments?.find(pay => pay._id == selectedPayment))?.status
                                    }
                                  </td>
                                </tr>
                              ) : (
                                <p>No Data Found</p>
                              );
                            })
                        : !spinner && <p>No Data Found</p>}
                         
                    </tbody>
                  </table>
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
  );
};

export default MakePayment;
