import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import logo from "../../LOGO/LOGO.png";
import { ReactToPrint } from "react-to-print";
import SideNav from "./SideNav";

const TimeTable = () => {
  const user = useSelector((state) => state.userInfo.user);
  const sectionInfo = useSelector((state) => state.sectionInfo.section);
  const [timeTable, setTimeTable] = useState("");
  const componentRef = useRef();

  useEffect(() => {
    setTimeTable(
      sectionInfo?.find((item) => item._id === user?.section)?.timetable || ""
    );
  }, [user, sectionInfo]);

  return (
    <div style={{ position: 'relative' }} className="w-100">
      <div style={{ position: 'absolute', right: 20, zIndex: 100, top: 100 }}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => <button className="btn btn-secondary">Print</button>}
          documentTitle="Time Table"
          onBeforeGetContent={() => {
            // Add custom styles for printing
            const style = document.createElement('style');
            style.innerHTML = `
              @media print {
                .print-header {
                  display: block !important;
                }
                .no-print {
                  display: none !important;
                }
                /* Hide scrollbars */
                body {
                  overflow: visible !important;
                }
                div::-webkit-scrollbar {
                  display: none;
                }
                div {
                  overflow: visible !important;
                }
              }
            `;
            document.head.appendChild(style);
          }}
        />
      </div>
    
      <div
        className="w-100 "
        ref={componentRef}
        style={{ width: "100%", height: "auto", overflow: "hidden" }} // Changed to hide scrollbars
      >
           <div className="d-none d-lg-block">
        <SideNav />
      </div>
        <div className="print-header " style={{ display: 'none' }}>
         <div className="d-flex justify-content-evenly mb-4" >
         <img src={logo} height={50} width={50} alt="Logo" />
         <h2 className="fw-bold">SPV MATRICULATION SCHOOL-NAGAPATTINAM</h2>
         </div>
        </div>

        <h2 className="bg-success text-light text-center fw-bold p-3 mb-4 no-print">
          Time Table
        </h2>

        {timeTable && (
          <div style={{ width: "100%", height: "auto", overflow: "hidden" }}> {/* Changed to hide scrollbars */}
            <table className="table w-100 mt-5" >
              <thead>
                <tr>
                  <th className="p-2 bg-danger text-light fw-bolder" scope="col">
                    Day / Time
                  </th>
                  {timeTable?.timeSlots?.Monday?.map((item, i) => (
                    <th className="p-2 bg-warning" key={i}>
                      {item.time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day, index) => (
                    <tr key={index}>
                      <th scope="row" className="bg-warning">
                        {day}
                      </th>
                      {timeTable?.timeSlots[day]?.map((item, i) => (
                        <td className="bg-info p-3" key={i}>
                          <span className="fw-bold">
                            {item.subject.toUpperCase()}
                          </span>
                          <br /> / {item.teacher}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
