import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import logo from "../../LOGO/LOGO.png";
import { RotatingLines } from "react-loader-spinner";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState("");
  const studentInfo = useSelector((state) => state.studentInfo.student);
  const printSectionRef = useRef();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setStudent(studentInfo?.find((student) => student._id == id));
  }, [id,studentInfo]);

  setTimeout(() => {
    setLoading(false)
  }, 1000);
  const handlePrint = () => {
    const printContents = printSectionRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    // Temporarily replace the body content with the print content
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to avoid any layout issues after print
  };

  return (
    <div className="container-fluid">
      <SideNav />
      <h2 className="p-3 fw-bold w-100 mb-4 text-center text-light bg-success">
        STUDENT INFORMATION
      </h2>
{
  loading && <div className="container d-flex align-items-center justify-content-center "> <RotatingLines strokeColor="grey" /></div>
}
{!loading &&   student &&   <div className="container">
        <div ref={printSectionRef} className="row w-100 d-flex align-items-center">
          <div className="print-header">
            <div className="d-flex justify-content-evenly mb-4">
              <img src={logo} height={60} width={60} alt="Logo" />
              <h2 className="fw-bold">SPV MATRICULATION SCHOOL-NAGAPATTINAM</h2>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={student?.image}
              alt={student?.name}
              className="img-fluid rounded border border-5 mb-4"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginLeft: "20px",
              }}
            />
          </div>

          <div className="d-flex justify-content-evenly">
            {/* <div></div> */}
            <div>
              <div className="mb-3">
                <strong>Name:</strong> {student?.name}
              </div>
              <div className="mb-3">
                <strong>Age:</strong> {student?.age}
              </div>
              <div className="mb-3">
                <strong>Date of Birth:</strong>{" "}
                {new Date(student?.dob).toLocaleDateString()}
              </div>
              <div className="mb-3">
                <strong>Gender:</strong> {student?.gender}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {student?.email}
              </div>
              <div className="mb-3">
                <strong>Phone:</strong> {student?.phone}
              </div>
              <div className="mb-3">
                <strong>Address:</strong> {student?.address}
              </div>
              <div className="mb-3">
                <strong>Blood Group:</strong> {student?.bloodGroup}
              </div>
              <div className="mb-3">
                <strong>Admission Date:</strong>{" "}
                {new Date(student?.admissionDate).toLocaleDateString()}
              </div>
              <div className="mb-3">
                <strong>Emis:</strong> {student?.emis}
              </div>
              <div className="mb-3">
                <strong>Nationality:</strong> {student?.nationality}
              </div>
              <div className="mb-3">
                <strong>Mother Tongue:</strong> {student?.motherTungue}
              </div>
              <div className="mb-3">
                <strong>Religion:</strong> {student?.religion}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 mb-4">
          <button className="btn btn-secondary" onClick={handlePrint}>
            Print Student Information
          </button>
        </div>
      </div>}
    </div>
  );
};

export default ViewStudent;
