import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../../LOGO/LOGO.png";
import { format } from "date-fns";

const UpdatePayment = (props) => {
  const { sectionId, student } = props; // Get the section ID and student details from props
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [instaReceipt, setInstaReceipt] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch payments based on sectionId
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/student-payments/${student._id}`
        );
        setPayments(response.data.payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [sectionId]);

  const generatePDF = async() => {
    setIsDownloading(true);

    const doc = new jsPDF("p", "mm", "a4");

    // Add logo (left-aligned, small size)
    doc.addImage(logo, "PNG", 5, 20, 20, 20); // Adjusted size and alignment

    // Add School Name (center-aligned)
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("SRIMATHY PADMAVATHI MATRICULATION SCHOOL", 115, 20, {
      align: "center",
    });
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(" NAGAPPATTINAM", 105, 30, { align: "center" });

    // Add Payment Receipt Title (center-aligned)
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Receipt", 105, 40, { align: "center" });

    // Add Student Details (bold and with margins)
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text(`Student Name: ${student.name}`, 10, 60);
    doc.text(`EMIS: ${student.emis}`, 10, 70);
    doc.text(`Phone: ${student.phone}`, 10, 80);
    doc.text(`email: ${student.email}`, 10, 90);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 90); // Right-aligned date

    // Add Table with Payment Details
    doc.autoTable({
      startY: 100,
      margin: { top: 20 }, // Add some top margin
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Styling the header
      bodyStyles: { valign: "middle" }, // Center align vertically
      head: [
        [
          "Description",
          "Date",
          "Total Fees",
          "Paid Fees",
          "Payment Method",
          "Remaining Fees",
        ],
      ],
      body: [
        [
          selectedPayment.description,
          format(new Date(instaReceipt.date), "MMMM d, yyyy"),
          selectedPayment.amount,
          instaReceipt.amount,
          instaReceipt.method,
          instaReceipt.remainingBalance,
        ],
      ],
    });

    const newStudent ={
      name:student.name,
      emis:student.emis,
      email:student.email,
      phone:student.phone
    }
      //store history
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/store-payment-history`, {
        student:newStudent,
        description:selectedPayment.description,
        date:instaReceipt.date,
        totalAmount:selectedPayment.amount,
        paidAmount:instaReceipt.amount,
        paymentMethod:instaReceipt.method,
        remainingBalance:instaReceipt.remainingBalance
      });

      console.log(response.data);
      

    // Save PDF
    doc.save("receipt.pdf");
    setIsDownloading(false);
  };

  const generateCombinePDf = () => {
    setIsDownloading(true);

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
    setIsDownloading(false);
  };

  useEffect(() => {
    if (instaReceipt) {
      generatePDF();
    }
  }, [instaReceipt]);

  const handlePaymentSelect = async (e) => {
    const paymentId = e.target.value;
    const payment = payments.find((p) => p._id === paymentId);

    if (payment) {
      setSelectedPayment(payment);
      setDescription(payment.description);
      setAmount(payment.amount);
      setRemainingAmount(payment.remainingBalance);
      setStatus(payment.status);
      setPaymentMethod(payment.paymentMethod);
      setPaymentDate(payment.paymentDate);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPayment) return;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/update-payment/${selectedPayment._id}`,
        {
          amountPaid: remainingAmount,
          status,
          method: paymentMethod,
        }
      );

      if (response.status == 201) {
        setInstaReceipt(response.data.receipt);
        enqueueSnackbar(response.data.msg, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">Update Payment</h2>

      {/* Display student details */}
      {student && (
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>EMIS:</strong> {student.emis}
          </p>
          <p>
            <strong>Address:</strong> {student.address}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="paymentSelect" className="form-label fw-bold">
            Select Payment
          </label>
          <select
            id="paymentSelect"
            className="form-select"
            onChange={handlePaymentSelect}
            required
          >
            <option value="">Select Payment</option>
            {payments?.map((payment) => (
              <option key={payment._id} value={payment._id}>
                {payment.description} - {payment.amount}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label fw-bold">
            Total Amount
          </label>
          <input
            disabled
            id="amount"
            className="form-control"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="remainingAmount" className="form-label fw-bold">
            Balance
          </label>
          <input
            type="text"
            id="remainingAmount"
            className="form-control"
            value={remainingAmount}
            onChange={(e) => setRemainingAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label fw-bold">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={handleStatusChange}
            required
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label fw-bold">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">--Select PaymentMethod--</option>
            <option value="UPI">UPI</option>
            <option value="CASH">CASH</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="paymentDate" className="form-label fw-bold">
            Payment Date
          </label>
          <input
            type="date"
            id="paymentDate"
            className="form-control"
            disabled
            value={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Payment
        </button>
      </form>

      {selectedPayment?.transactions.length > 0 && (
        <div>
          {isDownloading ? (
            <p>Generating PDF...</p>
          ) : (
            <button
              className="btn btn-secondary mt-3"
              onClick={generateCombinePDf}
            >
              Download Due Receipt
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatePayment;
