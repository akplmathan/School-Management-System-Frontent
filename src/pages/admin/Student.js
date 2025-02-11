import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines, RotatingSquare, TailSpin } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import { IoMdDownload } from "react-icons/io";
import SideNav from "./SideNav";
import { useQuery } from "@tanstack/react-query";

const Student = () => {
  const navigate = useNavigate()
  const [editStudent, setEditStudent] = useState(false);
  const [classInfo, setClassInfo] = useState([])
  const parentInfo = useSelector((state) => state.parentInfo.parent);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const navigateSection = (id) => {
    navigate(`/admin/student/section/${id}`)
  }

  const getYearBasedOnFebruary = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return today.getMonth() >= 1 ? currentYear - 1 : currentYear;
  };

  const classData = useQuery({
    queryKey: ["classData"],
    queryFn: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllClass?startYear=${getYearBasedOnFebruary()}`).then((data) => data.json())
  })



  useEffect(() => {
    setClassInfo(classData?.data)
  }, [classData?.data])


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
  const [formData1, setFormData1] = useState({
    id: "",
    image: "",
    currentSession: "",
    name: "",
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
  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleUpdateStudent = async () => {
    try {
      const formDataObj = convertToFormData(formData1);

      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/student/${formData1.id}`,
        formDataObj
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Updated SuccessFully", { variant: "success" });
        window.location.reload();
        setEditStudent(false);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete Student
  const deleteStudent = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (isConfirmed) {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/admin/students/${id}`
        );

        if (response.status === 201) {
          enqueueSnackbar(response.data.msg, { variant: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          enqueueSnackbar(`Error: ${response.data.msg}`, { variant: "error" });
        }
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      enqueueSnackbar("Error deleting student", { variant: "error" });
    }
  };

  const handleSetDetails = (item) => {
    setEditStudent(true);
    setFormData1({
      id: item._id,
      image: item.image,
      currentSession: item.currentSession,
      name: item.name,
      parent: item.parent, // Parent ID
      className: item.className, // Class ID
      section: item.section,
      dob: item.dob,
      age: item.age,
      gender: item.gender,
      motherTungue: item.motherTungue,
      religion: item.religion,
      bloodGroup: item.bloodGroup,
      address: item.address,
      city: item.city,
      state: item.state,
      nationality: item.nationality,
      phone: item.phone,
      email: item.email,
      preSclName: item.preSclName,
      admissionDate: item.admissionDate,
      tc: item.tc,
      BirthC: item.BirthC,
      givenMarksheet: item.givenMarksheet,
      handicab: item.handicab,
    });
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

  return (


    <div>
      <SideNav />
      <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
        Manage Students
      </h2>

      <div class="container">
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        </div>

        <div>
          {classData.isLoading ?
           <div className="d-flex w-100 justify-content-center"> <RotatingLines strokeColor="grey" /> </div>
           : <div className="row gap-3">
            {
              classInfo?.length > 0 ?
                classInfo?.map((item, index) => {
                  return <div className="col-12 col-md-6 col-lg-4 col-xxl-3 ">
                    <div onClick={() => navigateSection(item._id)} key={index} style={{
                      color: "white",
                      background:
                        "linear-gradient(130deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
                    }} className="p-4 text-center">
                      <h4>{item.className}</h4>

                    </div>
                  </div>
                })
                : <h6>No Data Found</h6>
            }


          </div>}
        </div>

      </div>
    </div>

  )
};

export default Student;
