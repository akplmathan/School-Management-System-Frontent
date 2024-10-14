import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { IoIosPeople, IoMdClose } from "react-icons/io";
import { MdDelete, MdDownload, MdEdit, MdMultipleStop } from "react-icons/md";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import { IoMdDownload } from "react-icons/io";
import SideNav from "./SideNav";
import admissionForm from '../../FORM/ADMISSION FORM.pdf'

const AdmissionForm= () => {


  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = admissionForm; 
    link.download = 'SPV admission Form.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const classInfo = useSelector((state) => state.classInfo.class);
  const parentInfo = useSelector((state) => state.parentInfo.parent);

  const [selectedClass, setSelectedClass] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [selectedStudentClass, setSelectedStudentClass] = useState([]);
 

  const componentRef = useRef();


  // register Student//
  const [formData, setFormData] = useState({
    image: "",
    currentSession: "",
    name: "",
    emis: "",
    parent: "", // Parent ID
    className: "", // Class ID
    section: "",
    dob: "",
    age: "",
    gender: "",
    motherTungue: "",
    religion: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    preSclName: "",
    admissionDate: "",
    tc: "",
    BirthC: "",
    givenMarksheet: "",
    handicab: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const convertToFormData = (formData) => {
    const formDataObj = new FormData();

    // Append each key-value pair to the FormData object
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObj.append(key, formData[key]);
      }
    }

    return formDataObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = convertToFormData(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/studentReg`,
        formDataObj,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Student Created SuccessFully", { variant: "success" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error registering student:", error.message);
    }
  };

  useEffect(() => {
    classInfo?.map((item, i) => {
      return setSelectedClass(
        classInfo.find((item) => item._id == formData.className)?.section
      );
    });
   
  }, [formData.className, selectedStudentClass]);
  return (
 
    
      <div className="w-100 ">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Admission Form
        </h2>

      <div className="w-100 d-flex justify-content-between p-3">
      <button className="btn btn-secondary fw-bold"  disabled><IoIosPeople/> Bulk Admission</button>
        <div className="btn btn-secondary fw-bold" onClick={()=>downloadPDF()}><MdDownload/> Download Admission Form</div>
      </div>

              <div className="mx-2 container-fluid bg-secondary-subtle mt-4 rounded pt-4 justify-content-center ">
                               <div className="row justify-content-center gap-4">
                  <div className="col-lg-5">
                    <form action="">
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Image <small>(max:100kb)</small>
                        </label>
                        <div class="input-group mb-3">
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image: e.target.files[0],
                              })
                            }
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Current Session
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={`${new Date().getFullYear()} - ${
                              new Date().getFullYear() + 1
                            }`}
                            disabled
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Full Name
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          EMIS Number{" "}
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.emis}
                            name="emis"
                            onChange={handleChange}
                            type="number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Parent
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.parent}
                            name="parent"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {parentInfo?.map((item, i) => {
                              return (
                                <option value={item._id}>{item.name}</option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/parents"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Class
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.className}
                            name="className"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {classInfo?.map((item, i) => {
                              return (
                                <option value={item._id}>
                                  {item.className}
                                </option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/classes"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Section
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.section}
                            name="section"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            {selectedClass?.map((item, i) => {
                              return (
                                <option value={item._id}>{item.section}</option>
                              );
                            })}
                          </select>
                          <Link to={"/admin/classes"}>
                            <button class="btn btn-secondary" type="button">
                              Add
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Date Of Birth
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.dob}
                            name="dob"
                            onChange={handleChange}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Age
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.age}
                            name="age"
                            onChange={handleChange}
                            type="Number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Gender
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.gender}
                            name="gender"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Mother Tungue
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.motherTungue}
                            name="motherTungue"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Religion
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.religion}
                            name="religion"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Blood Group
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.bloodGroup}
                            name="bloodGroup"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Address
                        </label>
                        <div class="input-group mb-3">
                          <textarea
                            value={formData.address}
                            name="address"
                            onChange={handleChange}
                            class="form-control"
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          City
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.city}
                            name="city"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5">
                    <form action="">
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          State
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.state}
                            name="state"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Nationality
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.nationality}
                            name="nationality"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Phone
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
                            type="Number"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Email
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Password
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Previous School Name
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.preSclName}
                            name="preSclName"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Admission Date
                        </label>
                        <div class="input-group mb-3">
                          <input
                            value={formData.admissionDate}
                            name="admissionDate"
                            onChange={handleChange}
                            type="date"
                            class="form-control"
                            id="inputGroupFile02"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Transfer Certificate
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.tc}
                            name="tc"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Birth Certificate
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.BirthC}
                            name="BirthC"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Any Given MarkSheet
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.givenMarksheet}
                            name="givenMarksheet"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group">
                        <label htmlFor="" className="fw-semibold my-2">
                          Phisical Handicap
                        </label>
                        <div class="input-group mb-3">
                          <select
                            value={formData.handicab}
                            name="handicab"
                            onChange={handleChange}
                            class="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected>Choose...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <button
                    className="btn w-50 btn-primary fw-bold my-4"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
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
                      "Create Students"
                    )}
                  </button>
                </div>
              </div>
            </div>
         
  
    )
};

export default AdmissionForm;
