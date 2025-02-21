import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import { RotatingLines } from "react-loader-spinner";
import SideNav from "./SideNav";
import { useQuery } from "@tanstack/react-query";

const Subject = () => {
  const [selectedStudentClass, setSelectedStudentClass] = useState('')
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [classInfo, setClassInfo] = useState([])
  const [formData, setFormData] = useState({
    subject: [{ subName: "", subCode: '' }],
    classId: "",
    sectionId: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const getYearForData = localStorage.getItem("currentYear")

  const classData = useQuery({
    queryKey: ["classData"],
    queryFn: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllClass?startYear=${getYearForData}`).then((data) => data.json())
  })

  console.log(classData.data)

  //for set formdata details
  console.log(formData);

  const handleChange = (index, key, value) => {
    if (key == "sectionId" || key == "classId") {
      return setFormData({ ...formData, [key]: value })
    } else {
      setFormData((prev) => ({
        ...prev,
        subject: prev.subject.map((item, i) => {
          return i == index ? { ...item, [key]: value } : item
        })
      }));
    }

  };


  //delete Subject
  const handleDelete = async (subjectId) => {
    try {
      const isConfirmed = window.confirm("Are You Sure Want to Delete Subject ?")

      if (isConfirmed) {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/subject/${subjectId}`);

        if (response.status === 201) {
          enqueueSnackbar(response.data.msg, { variant: 'success' })
          classData.refetch()
        } else {
          enqueueSnackbar(response.data.msg);
        }
      }

    } catch (error) {

      console.error('Error:', error);
    }
  };


  const handleAddSlot = () => {
    setFormData((prev) => ({
      ...prev,
      subject: [...prev.subject, { subName: "", subCode: "" }]
    }))
  }

  const handleRemoveSlot = () => {
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject.slice(0, -1),
    }));
  };


  //for Subject Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/subjectReg`,
        formData
      );
      setLoading(false)

      if (response.status == 201) {
        enqueueSnackbar("Subject Added SuccessFully", { variant: "success" });
        setFormData({
          subject: [{ subName: "", subCode: "" }],
          classId: "",
          sectionId: "",
        })
        classData.refetch()
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    classData.data?.map((item, i) => {
      return setSelectedClass(
        classData.data?.find((item) => item._id == formData.classId)?.section
      );
    });

    setClassInfo(classData?.data)

    classData.data?.map((item, i) => {
      return setSelectedSection(
        classData.data?.find((item) => item._id == selectedStudentClass)?.section
      );
    });
  }, [formData.classId, selectedClass, selectedStudentClass, classData.data]);
  return (


    <div className="w-100">
      <SideNav />
      <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
        Manage Subjects
      </h2>

      {/* tabs ************************************************************************************************************** */}

      <div className="tabs">
        <div class="container-fluid p-0">

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
                Subject List
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
                Add New Subject
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
              <div className="d-flex px-3 justify-content-between">
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
                                <option value={item._id}>
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
              </div>

              {/* section from */}

              {
                selectedSection?.map((section, i) => {
                  return (
                    <>
                      <h4 className="w-100 text-center py-2 bg-info text-light">Section  {section.section}</h4>
                      <table class="table table-striped mt-3">
                        <thead>
                          <tr>
                            <th scope="col">NO.</th>
                            <th scope="col">SUBJECT</th>
                            <th scope="col">OPTIONS</th>
                          </tr>
                        </thead>
                        <tbody class="table-group-divider">
                          {section.subjects?.map((item, i) => {
                            return (
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{item.subName}</td>
                                <td className="p-0 ">
                                  <div className="btn mt-1 p-1 btn-danger" onClick={() => handleDelete(item._id)}>delete</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )
                })
              }

            </div>

            {/* tab-2// */}
            {
              <div
                class="tab-pane fade p-3"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="container ">


                  <div className="input-group mb-2">
                    <label htmlFor="" className="fw-bold mb-2">
                      {" "}
                      Class
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={formData.classId}
                        name="classId"
                        onChange={e => handleChange("", "classId", e.target.value)}
                        class="form-select"
                        id="inputGroupSelect02"
                      >
                        <option selected>Choose...</option>
                        {classInfo?.map((item, i) => {
                          return (
                            <option value={item._id}>{item.className}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="input-group mb-2 ">
                    <label htmlFor="" className="fw-bold mb-2">
                      {" "}
                      Section
                    </label>
                    <div class="input-group mb-3">
                      <select
                        value={formData.sectionId}
                        name="sectionId"
                        onChange={e => handleChange("", "sectionId", e.target.value)}
                        class="form-select"
                        id="inputGroupSelect02"
                      >
                        <option selected>Choose...</option>
                        {selectedClass?.map((item, i) => {
                          return (
                            <option value={item._id}>{item.section}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  {
                    formData.subject?.map((subject, index) => {
                      return <div class="mb-3 mt-3 d-flex w-100 justify-content-between row">
                        <div className="col-4">
                          <label
                            for="exampleFormControlInput1"
                            class="mb-2 fw-bold "
                          >
                            Subject Name
                          </label>
                          <input
                            value={subject.subName}
                            name="subName"
                            onChange={e => handleChange(index, "subName", e.target.value)}
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>

                        <div className="col-4">
                          <label
                            for="exampleFormControlInput1"
                            class="mb-2 fw-bold "
                          >
                            Subject Code
                          </label>
                          <input
                            value={subject.subCode}
                            name="subCode"
                            onChange={e => handleChange(index, "subCode", e.target.value)}
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>

                        <div className="col-3">
                          {index !== 0 && <div className="btn btn-danger mt-4" onClick={() => handleRemoveSlot()} >Remove Slot</div>}
                        </div>
                      </div>
                    })
                  }

                  <div className="btn btn-info mt-4" onClick={() => handleAddSlot()} >Add Slot</div>

                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-primary w-100 my-3 fw-bold"
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
                      " Add New Subject"
                    )}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
