import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import SideNav from "./SideNav";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [FilterStudents, setFilterStudents] = useState([]);
  const user = useSelector((state) => state.userInfo.user);
  const section = useSelector((state) => state.sectionInfo.section);
  const [spinner,setSpinner] = useState(true)

  setTimeout(() => {
    setSpinner(false)
  }, 2000);
  useEffect(() => {
    const handleClassMates = () => {
      setStudents(section?.find((item) => item._id == user.section).students);
    };
    handleClassMates();

    if (students) {
      setFilterStudents(students?.filter((item) => item._id != user?._id));
    }
  }, [students,user]);

  return (
  
      <div className="w-100 ">
      <div className="d-none d-lg-block">
        <SideNav />
      </div>
        <h2 className="fw-bold text-center p-3 text-light bg-success my-4">
          Class Mates
        </h2>
        {!spinner && (
          <table class="table  table-striped mt-4">
            <thead>
              <tr>
                <th className="bg-primary text-light py-3" scope="col">
                  NO.
                </th>

                <th className="bg-primary text-light py-3" scope="col">
                  IMAGE
                </th>
                <th className="bg-primary text-light py-3" scope="col">
                  EMIS NO.
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
            <tbody class="table-group-divider">
              {FilterStudents?.map((item, i) => {
                return FilterStudents.length > 0 ? (
                  <tr>
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
              })}
            </tbody>
          </table>
        )}
        {spinner && (
        <div className="w-100 mt-4 text-center d-flex justify-content-center">  <TailSpin
        visible={true}
        height="80"
        width="80"
        color="grey"
        ariaLabel="tail-spin-loading"
        radius="10"
        wrapperStyle={{}}
      /></div>
        )}
      </div>

  );
};

export default Student;
