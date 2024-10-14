import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import SideNav from './SideNav'

const TransactionHistory = () => {
  const [paymentHistories, setPaymentHistories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch payment histories
    const fetchPaymentHistories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/payment-histories`);
        // Sort payment histories by createdAt (most recent first)
        const sortedHistories = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPaymentHistories(sortedHistories);
      } catch (error) {
        console.error('Error fetching payment histories:', error);
        enqueueSnackbar('Failed to fetch payment histories', { variant: 'error' });
      }
    };

    fetchPaymentHistories();
  }, []);


  const getCardClass = (remainingBalance) => {
    if (remainingBalance === 0) {
      return 'bg-success text-white'; // Success background for zero remaining balance
    } else {
      return 'bg-warning text-dark'; // Warning background for non-zero remaining balance
    }
  };

  return (
    <div className="container p-0 m-0"> 
    <SideNav/>
      <h2 className='fw-bold text-center p-3 bg-warning text-light'>Payment Histories</h2>
      <div className="row justify-content-center p-3">
        {paymentHistories.length > 0 ? (
          paymentHistories.map((history) => (
            <div key={history._id} className="mb-4 d-flex align-items-stretch">
              <div className={`card shadow-sm ${getCardClass(history.remainingBalance)} w-100`}>
                <div className="card-body d-flex justify-content-evenly mt-2">
                  <div className="d-flex flex-column mb-2">
                    <p className="card-text mb-1">
                      <strong>Name :</strong> {history.student.name}
                    </p>
                    <p className="card-text mb-1">
                      <strong>EMIS :</strong>{history.student.emis}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Date:</strong> {new Date(history.date).toLocaleDateString()}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Description:</strong> {history.description}
                    </p>
                  </div>
                  <div className="d-flex flex-column mb-2">
                    <p className="card-text mb-1">
                      <strong>Total Amount:</strong> {history.totalAmount}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Paid Amount:</strong> {history.paidAmount}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Payment Method:</strong> {history.paymentMethod}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Remaining Balance:</strong> {history.remainingBalance}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Phone:</strong> {history.student.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No payment histories available</p>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory