import React from "react";
import Sidebar from "./Sidebar";
import SideNav from "./SideNav";
import { MdOutlinePayments } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <div className="w-100">
      <SideNav />
      <div className="container-fluid p-0">
        <h2 className="fw-bold text-center bg-success p-3 text-light">
          Payments
        </h2>

        <div className="row justify-content-evenly mt-4">
          <Link to={"/admin/payment/makePayment"} className="w-auto">
            <div className="btn btn-primary w-auto border border-5 border-secondary fs-1 fw-bold">
              <span className="d-block">
                <MdOutlinePayments size={60} />
              </span>
              Make Payment
            </div>
          </Link>
          <Link to={"/admin/payment/raisePayment"} className="w-auto">
            <div className="btn btn-info w-auto fs-1 border border-5 border-secondary text-light fw-bold">
              <span className="d-block">
                <RiSecurePaymentFill size={60} />
              </span>
              Raise Payment
            </div>
          </Link>
          <Link to={"/admin/payment/paymentHistory"} className="w-auto">
            <div className="btn btn-warning w-auto fs-1 border border-5 border-secondary fw-bold text-light">
              <span className="d-block">
                <FaHistory size={60} />
              </span>
              Transaction History
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payments;
