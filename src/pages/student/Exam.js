import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import SideNav from './SideNav'

const Exam = () => {
  const [exam,setExam] = useState([])

  const user =useSelector(state=>state.userInfo.user)
  const section = useSelector(state=>state.sectionInfo.section)

  useEffect(()=>{
    setExam(
      (section?.find(item=>item._id==user?.section))?.exams
    )
  },[user,section])
const arr =[1.2]
  console.log(exam)
  return (
     <div className='w-100 '>
      
     <div className="d-none d-lg-block">
        <SideNav />
      </div>
                
                <h2 className='text-light fw-bold text-center bg-info p-3' >Exams</h2>
                {exam.length > 0 ? (
                        exam.map((item, i) => {
                          return (
                            <>
                              <div className="d-flex justify-content-between align-items-center bg-secondary-subtle p-2 mt-4">
                                <h6 className="fw-bold">EXAM : {item.name}</h6>
                                <h6 className="fw-bold">
                                  EXAM TIME : {item.examType}
                                </h6>
                              </div>

                              <table class="table  mt-4">
                                <thead>
                                  <tr>
                                    <th scope="col">NO.</th>
                                    <th scope="col">SUBJECT</th>
                                    <th scope="col">DATE</th>
                                 
                                  </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                  {item.subjects?.map((sub, i) => {
                                    return (
                                      <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{sub.subject}</td>
                                        <td>
                                          {
                                            new Date(sub.date)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                   
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </>
                          );
                        })
                      ) : (
                        <p className="text-center">No Data Found</p>
                      )}
              </div>
 
  )
}

export default Exam