import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const RaisePayment = () => {
  const classInfo = useSelector((state) => state.classInfo.class);
  const [classes, setClasses] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {}, []);

  const handleClassChange = (e) => {
    setSections("");
    classInfo?.map((item, i) => {
      return setSelectedClass(
        classInfo.find((item) => item.number == e.target.value)?.section
      );
    });
    setClasses(e.target.value);
  };

  console.log({ amount, status, description });
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      // Submit the payment data to the API
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/assign-payments/${selectedSection}`,
        {
          sectionId: selectedSection,
          amount:amount,
          description:description,
          status:status,
        }
      );
      console.log(response);
      if (response.status == 201) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        setClasses("");
        setSelectedSection("");
        setSelectedClass([]);
      } else {
        enqueueSnackbar(response.data.msg, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-100">
      <SideNav />
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-center">Assign Payment to Students</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Select Class:</label>
            <select
              className="form-select p-2"
              value={classes}
              onChange={handleClassChange}
              required
            >
              <option value="">-- Select Class --</option>
              {classInfo?.map((classItem) => (
                <option key={classItem._id} value={classItem.number}>
                  {classItem.className}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Section:</label>
            <select
              className="form-select p-2"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              required
            >
              <option value="">-- Select Section --</option>
              {selectedClass?.map((sectionItem) => (
                <option key={sectionItem._id} value={sectionItem._id}>
                  {sectionItem.section}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Amount:</label>
            <input
              type="number"
              className="form-control p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description:</label>
            <input
              type="text"
              className="form-control p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Status:</label>
            <select
              className="form-select p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Select Status --</option>
              <option value="Unpaid">unpaid</option>
              <option value="Paid">Completed</option>
              
            </select>
          </div>

          <button type="submit" className="btn btn-primary fw-bold p-2 mt-3">
            Assign Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default RaisePayment;
