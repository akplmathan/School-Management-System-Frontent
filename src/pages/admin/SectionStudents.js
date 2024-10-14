import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const SectionStudents = () => {
    const[spinner,setSpinner] = useState(true)
    const [students,setStudents] = useState([]);
    const [section,setSection] = useState({})
  const navigate = useNavigate()
    const params = useParams()
    const sectionInfo = useSelector(state=>state.sectionInfo.section)
    setInterval(() => {
        setSpinner(false)
    }, 1500);

    useEffect(()=>{
        setStudents(
            (sectionInfo?.find(item=> item._id == params.id))?.students
        )
        setSection(
            (sectionInfo?.find(item=> item._id == params.id))
        )
    },[sectionInfo,spinner,params])
  return (
    <div className='w-100 '>
            <h2 className='w-100 bg-success mt-1 text-center p-3 text-light fw-bold'>View Students</h2>

          {
            section && <div className='h5 d-flex p-2  justify-content-between'>
                 <span>{section?.className?.className}</span>
                 <span>Section - {section?.section}</span>
            </div>
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
                         { spinner && <RotatingLines
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
                                <tr onClick={()=>navigate(`/admin/view-student/${item._id}`)}>
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