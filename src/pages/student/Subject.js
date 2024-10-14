import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import SideNav from './SideNav'

const Subject = () => {
const[section,setSection] = useState([])
  const sectionInfo = useSelector(state=>state.sectionInfo.section)
  const user = useSelector(state=>state.userInfo.user)


 
  useEffect(()=>{
    setSection(
      (sectionInfo?.find(item=>item._id==user?.section))?.subjects
    )
  },[user,section])
  return (

    <div className='w-100 pb-4'>
    <div className="d-none d-lg-block">
        <SideNav />
      </div>
       <h2 className='my-3 text-center fw-bold bg-success p-3 text-light'>Subjects</h2>
       <table class="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th className='bg-primary text-center' scope="col">NO.</th>
                      <th className='bg-primary text-center' scope="col">SUBJECT</th>
                 
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {section?.map((item, i) => {
                      return (
                        <tr >
                          <th scope="row" className='text-center'>{i + 1}</th>
                          <td className='fw-bold p-3 text-center'>{item.subName}</td>
                         
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
    </div>

  )
}

export default Subject