import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

const StudentSection = () => {
    const { classID } = useParams()
    const navigate = useNavigate();    

    const apiCall = ({ queryKey }) => {
        return fetch(queryKey[1]).then((data) => data.json())
    }

    const classData = useQuery({
        queryKey: ["classData", `${process.env.REACT_APP_BACKEND_URL}/admin/getClass/${classID}`],
        queryFn: apiCall,
    });

    const navigateToStudent=(id)=>{
        navigate(id,{state:{className:classData.data?.className,startYear:classData.data?.startYear}})
    }

    return (
        <div className='w-100'> 
        
      <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">{classData.data?.className}</h2>

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
                                return <div onClick={()=> navigateToStudent(`/admin/student/${section._id}`)} key={index}  style={{
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

export default StudentSection