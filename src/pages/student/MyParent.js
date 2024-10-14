import React from "react";
import { useSelector } from "react-redux";

const MyParent = () => {
  const user = useSelector((state) => state.userInfo.user);
  console.log(user);
  return (
    <div className="w-100">
      <h2 className="w-100 text-center mt-1 p-3 fw-bold text-light bg-success">
        My Parents
      </h2>

      <table className="d-flex justify-content-center mt-3">
        <tbody>
          <tr>
            <th className="  px-3 py-3">NAME</th>
            <th>{user.parent.name}</th>
          </tr>
          <tr>
            <th className="  px-3 py-3">EMAIL</th>
            <th>{user.parent.email}</th>
          </tr>
          <tr>
            <th className="  px-3 py-3">PHONE</th>
            <th>{user.parent.phone}</th>
          </tr>

          <tr>
            <th className="  px-3 py-3">ADDRESS</th>
            <th>{user.parent.address}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyParent;
