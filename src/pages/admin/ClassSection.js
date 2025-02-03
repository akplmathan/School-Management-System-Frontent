import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { RotatingLines } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

const ClassSection = () => {
    const [editClass, setEditClass] = useState(false);
    const [addSection, setAddSection] = useState(false);
    const [section, setSection] = useState("")
    const token = localStorage.getItem("token")
    const { classID } = useParams()
    const [class1, setClass1] = useState({
        className: "",
        classNumber: "",
        startYear: "",
        endYear: ""
    })

    const apiCall = ({ queryKey }) => {
        return fetch(queryKey[1]).then((data) => data.json())
    }

    const classData = useQuery({
        queryKey: ["classData", `${process.env.REACT_APP_BACKEND_URL}/admin/getClass/${classID}`],
        queryFn: apiCall,
    });

    useEffect(() => {
        console.log(classData.data)
        setClass1({
            className: classData.data?.className,
            classNumber: classData.data?.classNumber,
            startYear: classData.data?.startYear,
            endYear: classData.data?.endYear
        })

    }, [classData.data])
    const handleEditClass = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/admin/class-update/${classID}`,
                class1,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            
            if (response.status == 201) {
                enqueueSnackbar("Class Updated SuccessFully", { variant: "success" });
                setEditClass(false);
            } else {
                enqueueSnackbar(response.data.msg, { variant: "warning" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClassData = (e) => {
        const { name, value } = e.target;

        setClass1((pre) => ({
            ...pre,
            [name]: value
        }))
    }
    const handleAddSection = async () => {
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/admin/sectionReg`,
                {
                    classID,
                    section,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setSection("")
            if (response.status == 201) {
                enqueueSnackbar("Section Added SuccessFully", { variant: "success" });
                classData.refetch()
                setAddSection(false);
            } else {
                enqueueSnackbar(response.data.msg, { variant: "warning" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-100'> 
        
      <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">{class1?.className}</h2>
        
                 {/* Edit Class  ********************* */}
            {editClass && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.59)",
                        width: "100%",
                        height: "100vh",
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        className="container w-50 bg-success-subtle p-3 rounded"
                        style={{ opacity: 1 }}
                    >
                        <div className="w-100 d-flex fw-bold justify-content-end">
                            <IoMdClose
                                size={25}
                                onClick={() => {
                                    setEditClass(false);
                                }}
                            />
                        </div>
                        <h2 className="text-center fw-bold">Class Edit</h2>
                        <div className="input-group mb-2">
                            <label htmlFor="" className="fw-semibold fs-5 mb-2">
                                {" "}
                                Class In Letters
                            </label>
                            <div class="input-group mb-3">
                                <input
                                    type="text"
                                    value={class1.className}
                                    name="className"
                                    onChange={handleClassData}
                                    class="form-control"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </div>
                        </div>

                        <div className="input-group mb-2">
                            <label htmlFor="" className="fw-semibold fs-5 mb-2">
                                {" "}
                                Class In Numeric
                            </label>
                            <div class="input-group mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={class1.classNumber}
                                    name="classNumber"
                                    onChange={handleClassData}

                                />
                            </div>
                        </div>
                        <div className="input-group mb-2 d-flex gap-5">
                            <div>
                                <label htmlFor="" className="fw-bold fs-5 mb-2">
                                    {" "}
                                    Start Year
                                </label>
                                <div class="input-group mb-3">
                                    <input
                                        value={class1.startYear}
                                        onChange={handleClassData}
                                        type="text"
                                        name="startYear"
                                        class="form-control"
                                        id="inputGroupFile02"
                                        placeholder="Ex : 2020"
                                    />
                                </div>

                            </div>
                            <div><label htmlFor="" className="fw-bold fs-5 mb-2">
                                {" "}
                                End Year
                            </label>
                                <div class="input-group mb-3">

                                    <input
                                        value={class1.endYear}
                                        onChange={handleClassData}
                                        type="text"
                                        name="endYear"
                                        class="form-control"
                                        id="inputGroupFile02"
                                        placeholder="Ex : 2021"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary "
                            onClick={() => handleEditClass()}
                        >
                            {" "}
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
            {/* Add Section */}
            {addSection && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.59)",
                        width: "100%",
                        height: "100vh",
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        className="container w-50 bg-success-subtle p-3 rounded"
                        style={{ opacity: 1 }}
                    >                  <div className="w-100 d-flex fw-bold justify-content-end"><IoMdClose size={25} onClick={() => { setAddSection(false) }} /></div>
                        <h2 className="text-center fw-bold">
                            Create Section
                        </h2>
                        <div className="input-group mb-2">
                            <label htmlFor="" className="fw-semibold fs-5 mb-2">
                                {" "}
                                Class
                            </label>
                            <div class="input-group mb-3">
                                <input
                                    type='text'
                                    value={class1.className}
                                    disabled
                                    class="form-control"
                                    id="inputGroupSelect02"
                                />

                            </div>
                        </div>

                        <div className="input-group mb-2">
                            <label htmlFor="" className="fw-semibold fs-5 mb-2">
                                {" "}
                                Section
                            </label>
                            <div class="input-group mb-3">
                                <input
                                    value={section}
                                    onChange={(e) =>
                                        setSection(e.target.value.toUpperCase())
                                    }
                                    type="text"
                                    class="form-control"
                                    aria-label="Username"
                                    placeholder="Ex : A "
                                    aria-describedby="basic-addon1"
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary "
                            onClick={() => handleAddSection()}
                        >
                            {" "}
                            Add Section
                        </button>
                    </div>
                </div>
            )}

            <div>
                <div className='row w-100 p-3 '>
                    <div className="col-12 col-lg-6 ms-auto ">
                        <div className="btn btn-primary my-3" onClick={() => setEditClass(true)}><FaEdit /> Edit Class Details</div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="btn btn-primary my-3" onClick={() => setAddSection(true)}><FaPlus /> Add New Section</div>
                    </div>
                </div>

            </div>

            {/* display section  */}

            <div>

                {
                    !classData.data ? <RotatingLines
                        height="23"
                        width="23"
                        strokeColor="white"
                        strokeWidth="5"
                    /> :
                    <div className='row gap-5 d-flex justify-content-center'>
                        {
                            classData.data.section?.map((section,index)=>{
                                return <div key={index}  style={{
                                    color: "white",
                                    background:
                                      "linear-gradient(130deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
                                      borderRadius:"30px"
                                  }} className="col-12 col-md-6 col-lg-4 col-xxl-3 p-4 text-center">
                                    <h4>Section-{section.section}</h4>
                                   
                                  </div>
                            })
                        }
                    </div>
            }
            </div>

        </div>
    )
}

export default ClassSection