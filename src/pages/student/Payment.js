import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import { useSelector } from 'react-redux'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../../LOGO/LOGO.png";
import { format } from "date-fns";
const Payment = () => {
  const [payments,setPayments] = useState([])
  const student = useSelector(state=>state.userInfo.user);

  useEffect(()=>{
    setPayments(student?.payments)
  },[student])


  console.log(payments)
  const generateCombinePDf = (selectedPayment) => {

    const doc = new jsPDF("p", "mm", "a4");

    // Add logo (left-aligned, small size)
    doc.addImage(logo, "PNG", 5, 20, 20, 20); // Adjusted size and alignment

    // Add School Name (center-aligned)
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("SRIMATHY PADMAVATHI VIDHYALAYA ", 115, 20, { align: "center" });
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("MATRICULATION HIGHER SECONDARY SCHOOL ", 115, 30, {
      align: "center",
    });
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(" NAGAPPATTINAM", 105, 40, { align: "center" });

    // Add Payment Receipt Title (center-aligned)
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Receipt", 105, 50, { align: "center" });

    // Add Student Details (bold and with margins)
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text(`Student Name: ${student.name}`, 10, 60);
    doc.text(`EMIS: ${student.emis}`, 10, 70);
    doc.text(`Phone: ${student.phone}`, 10, 80);
    doc.text(`email: ${student.email}`, 10, 90);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 90); // Right-aligned date

    // Generate the rows for the table
    const tableBody = selectedPayment.transactions.map((item, i) => [
      i + 1,
      selectedPayment.description,
      format(new Date(item.date), "MMMM d, yyyy"),
      selectedPayment.amount,
      item.amount,
      item.method,
      item.remainingBalance,
    ]);
    // Add Table with Payment Details
    doc.autoTable({
      startY: 100,
      margin: { top: 20 }, // Add some top margin
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Styling the header
      bodyStyles: { valign: "middle" }, // Center align vertically
      head: [
        [
          "NO",
          "Description",
          "Date",
          "Total Fees",
          "Paid Fees",
          "Payment Method",
          "Remaining Fees",
        ],
      ],
      body: tableBody,
    });
    

    // Save PDF
    doc.save("receipt.pdf");
  };
  return (
   
     <div className='w-100'>
        <SideNav/>
        <h2 className='text-center text-light  bg-warning p-3 fw-bold'>Fees</h2>
     
     <div>
      
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
                          Fees
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          Total Amount
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          Paid Amount
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          Status
                        </th>
                        <th className="bg-primary text-light py-3" scope="col">
                          Receipt
                        </th>
                      
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                     {
                      payments?.map((item,i)=>{
                        return   <tr>
                        <th scope="row">{i+1}</th>
                        <td className="fw-semibold">{item.description}</td>
                        <td className="fw-semibold">{item.amount}</td>
                        <td className="fw-semibold">{item.amountPaid}</td>
                        <td className="fw-semibold">{item.status}</td>
                        <td> 
                        {item.transactions?.length>0?<div className="btn btn-secondary" onClick={()=>generateCombinePDf(item)}>download</div> :''} 
                        </td>
                      </tr>
                      })
                     }
                              
                            </tbody>
                  </table>
     </div>
      </div>
  )
}

export default Payment