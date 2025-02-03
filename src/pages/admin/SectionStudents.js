import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { FaCross, FaPlus } from 'react-icons/fa'
import { PiCrossBold } from 'react-icons/pi'
import { RiCheckboxMultipleFill, RiCrossFill } from 'react-icons/ri'
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const SectionStudents = () => {
  const token = localStorage.getItem("token")
  const location = useLocation().state;
  const [spinner, setSpinner] = useState(true)
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false)
  const [addStudent, setAddStudent] = useState(false);
 
  const studentData = useQuery({
    queryKey: ["studentData"],
    queryFn: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/section/${params.id}`).then((res) => res.json())
  });
 
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    emis: "",
    adhar: "",
    className:location?.className,
    section:"",
    startYear:location?.startYear,
    fatherName: "",
    motherName: "",
    parentPhone: "",
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
    userID: "",
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

  const navigate = useNavigate()
  const params = useParams()
  setInterval(() => {
    setSpinner(false)
  }, 1500);




  useEffect(() => {

    setStudents(studentData.data?.section?.students)
    setFormData({...formData,section:studentData.data?.section?._id})
  }, [studentData?.data])
  return (
    <div className='w-100 '>
      <h2 className='w-100 bg-success mt-1 text-center p-3 text-light fw-bold'>{location?.className}    Section-{studentData.data?.section.section}</h2>
      {addStudent && <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.59)",
          width: "100%",
          height: "100%",
          paddingTop:"50%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY:"scroll"
        }}
      >
        <div className="mx-2 container bg-secondary-subtle mt-5 rounded pt-4 justify-content-center w-75 ">
        <p className='ms-auto text-end me-5' onClick={()=>setAddStudent(false)}><ImCross/> </p>
              <h2 className="text-center fw-bold">Add Student</h2> 
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
                    Class Name
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.className}
                      name="className"
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                      disabled
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    section
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={`Section-${studentData.data?.section.section}`}
                      name="section"
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                      disabled
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    batch
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={`${formData.startYear}-${formData.startYear+1}`}
                      name="section"
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                      disabled
                    />
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
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Adhar Number
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.adhar}
                      name="adhar"
                      onChange={handleChange}
                      type="number"
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
                    Father Name
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.fatherName}
                      name="fatherName"
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                      
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Mother Name
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.motherName}
                      name="motherName"
                      type="text"
                      onChange={handleChange}
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="" className="fw-semibold my-2">
                    Parent Phone
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.parentPhone}
                      name="parentPhone"
                      type="text"
                      onChange={handleChange}
                      class="form-control"
                      id="inputGroupFile02"
                    />
                  </div>
                </div>
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
                    userName
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={formData.userID}
                      name="userID"
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
        </div></div>}

      <div>

       {location?.startYear && <div className="btn btn-info px-5 py-2" onClick={()=>setAddStudent(true)}><FaPlus /> Add Student</div>}
      </div>
      {
        // section && <div className='h5 d-flex p-2  justify-content-between'>
        //      {/* <span>{section?.className?.className}</span>
        //      <span>Section - {section?.section}</span> */}
        // </div>
      }
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
        {
          <div className='d-flex justify-content-center px-auto w-100'>
            {spinner && <RotatingLines
              strokeColor='grey'

            />}
          </div>
        }
        <tbody class="table-group-divider">
          {!spinner && students?.length > 0
            ? [...students]
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((item, i) => {
                return students?.length > 0 ? (
                  <tr onClick={() => navigate(`/admin/view-student/${item._id}`)}>
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
  )
}

export default SectionStudents