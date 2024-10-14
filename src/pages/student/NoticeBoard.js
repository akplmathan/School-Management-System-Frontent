import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import SideNav from './SideNav'

const Announcement = () => {
  const[eventList,setEventList] = useState([])
  
  useEffect(()=>{
    const getEventList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getAllEvents`
        );
        setEventList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEventList();
  },[eventList])
  return (
 
      <div className=' w-100'>
      <div className="d-none d-lg-block">
        <SideNav />
      </div>
            <h2 className='bg-warning text-light p-3 text-center fw-bold'>Announcement</h2>
                <table class="table  table-striped mt-4">
                  <thead>
                    <tr>
                      <th className='p-3' scope="col">NO.</th>
                      <th className='p-3' scope="col">TITLE</th>
                      <th className='p-3' scope="col">CONTENT</th>
                      <th className='p-3' scope="col">DATE</th>
                    
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {eventList.map((item, i) => {
                      return (
                        <tr>
                          <th className='p-3 fw-semibold ' scope="row">{i + 1}</th>
                          <td className='p-3 fw-semibold'>{item.title}</td>
                          <td className='p-3 fw-semibold'>{item.content}</td >
                          <td className='p-3 fw-semibold'>{new Date(item.date).toLocaleDateString('en-GB')}</td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
     
  )
}

export default Announcement