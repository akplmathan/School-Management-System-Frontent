import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import SideNav from './SideNav'

const Teacher = () => {
 const[teacher,setTeacher] =  useState([])
 const[classes,setClasses] = useState('')
 const[sectionId,setSectionId] = useState('')
 const classInfo = useSelector(state=>state.classInfo.class)
 const sectionInfo = useSelector(state=>state.sectionInfo?.section)
 const user = useSelector(state=>state.userInfo.user)
 console.log(teacher)
  useEffect(()=>{
    setSectionId(
        user?.section
    )
    setTeacher(
         (classInfo?.find(item=>item._id == classes))?.teacher
    )
    setClasses(
      (sectionInfo?.find(item=>item._id == sectionId))?.className._id
    )
  },[classInfo,user,classes])
  return (

      <div className='w-100 '>
      <div className="d-none d-lg-block">
        <SideNav />
      </div>
        <h2 className='bg-success text-light text-center fw-bold p-3 mb-4'>Class Teachers</h2>
        <table class="table  table-striped mt-4" >
                  <thead>
                    <tr>
                      <th scope="col">NO.</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">NAME</th>
                  
                      <th scope="col">EMAIL</th>
                      <th scope="col">PHONE</th>
              
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                   
                   {(teacher?.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>
                            <img
                              src={
                                item.img ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                              }
                              class="img-thumbnail"
                              style={{ height: "60px" }}
                              alt="..."
                            />
                          </td>
                          <td>{item.name}</td>
                       
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                        
                        </tr>
                      );
                    }))
                    }
                  </tbody>
                  {(teacher== 0 && teacher.length==0) && (
                    <p className="text-center w-100">No Data Found</p>
                  )}
                </table>
      </div>
 
  )
}

export default Teacher