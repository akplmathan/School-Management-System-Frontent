import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { LineWave, RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
  // const classInfo = useSelector((state) => state.classInfo.class);
  const sectionInfo = useSelector((state) => state.sectionInfo.section);
  const [classInfo, setClassInfo] = useState([])
  //create class Data
  const [class1, setClass1] = useState({
    className: "",
    classNumber: "",
    startYear: "",
    endYear: ""
  })

  const getYearForData = localStorage.getItem("currentYear")

  const classData = useQuery({
    queryKey: ["classData"],
    queryFn: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllClass?startYear=${getYearForData}`).then((data) => data.json())
  })


  useEffect(() => {
    setClassInfo(classData?.data)
  }, [classData?.data])

  //for create class function assign data to values
  const handleClassChange1 = (e) => {
    const { name, value } = e.target

    setClass1((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const [loading1, setLoading1] = useState(false);
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();


  const handleClassRegister = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/classReg`,
        class1,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLoading1(false);
      if (response.status == 201) {
        enqueueSnackbar("Class Added SuccessFully", { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (


    <div className="w-100">
      <SideNav />
      <h2 className="text-center p-3 my-3 bg-success text-light w-100 fw-bold ">Manage Classes ({`${getYearForData}-${Number(getYearForData) + 1}`})</h2>

      {/* tabs ************************************************************************************************************** */}

      <div className="tabs">
        <div class="container-fluid p-0">

          <ul
            class="nav nav-tabs bg-secondary-subtle pt-1 ps-2 w-100 m-0 p-0"
            id="myTab"
            role="tablist"
          >
            <li class="nav-item ">
              <a
                class="nav-link active fw-bold "
                id="tab1-tab"
                data-toggle="tab"
                href="#tab1"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                Class List
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link fw-bold "
                id="tab2-tab"
                data-toggle="tab"
                href="#tab2"
                role="tab"
                aria-controls="tab2"
                aria-selected="false"
              >
                Add New Class
              </a>
            </li>

          </ul>

          {/* Class List// ***************************************************************************/}

          <div class="tab-content" id="myTabContent">

            {/* tab-1// */}
            <div
              class="tab-pane fade show active p-3"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
            >

              <div className="row gap-3">
                {classData.isLoading ? <div className="d-flex w-100 justify-content-center "> <LineWave  /> </div> :

                  classInfo?.length > 0 ?
                    classInfo?.map((item, index) => {
                      return <div className="col-12 col-md-6 col-lg-4 col-xxl-3 ">
                        <Link to={`/admin/classes/${item._id}`}><div key={index} style={{
                          color: "white",
                          background:
                            "linear-gradient(130deg, rgba(61,54,177,1) 28%, rgba(0,212,255,1) 100%)",
                        }} className="p-4 text-center">
                          <h4>{item.className}</h4>

                        </div></Link>
                      </div>
                    })
                    : <h6>No Data Found</h6>
                }


              </div>
            </div>

            {/* Add Class tab-2 ***********************************************************/}

            <div
              class="tab-pane fade px-5 pt-lg-5 "
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab2-tab"
            >
              <div className="container ">
                <div className="input-group mb-2">
                  <label htmlFor="" className="fw-bold fs-5 mb-2">
                    {" "}
                    Class in Letters
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={class1.className}
                      onChange={handleClassChange1}
                      name="className"
                      type="text"
                      class="form-control"
                      id="inputGroupFile02"
                      placeholder=" EX : Class-1"
                    />
                  </div>
                </div>
                <div className="input-group mb-2 ">
                  <label htmlFor="" className="fw-bold fs-5 mb-2">
                    {" "}
                    Class In Numeric
                  </label>
                  <div class="input-group mb-3">
                    <input
                      value={class1.classNumber}
                      onChange={handleClassChange1}
                      type="number"
                      name="classNumber"
                      class="form-control"
                      id="inputGroupFile02"
                      placeholder="Ex : 1"
                    />
                  </div>
                </div>
                <div className="input-group mb-2 d-flex gap-5">
                  <div>
                    <label htmlFor="" className="fw-bold fs-5 mb-2">
                      {" "}
                      Start Year
                    </label>
                    <div class="input-group mb-3">
                      <input
                        value={class1.startYear}
                        onChange={handleClassChange1}
                        type="text"
                        name="startYear"
                        class="form-control"
                        id="inputGroupFile02"
                        placeholder="Ex : 2020"
                      />
                    </div>

                  </div>
                  <div><label htmlFor="" className="fw-bold fs-5 mb-2">
                    {" "}
                    End Year
                  </label>
                    <div class="input-group mb-3">

                      <input
                        value={class1.endYear}
                        onChange={handleClassChange1}
                        type="text"
                        name="endYear"
                        class="form-control"
                        id="inputGroupFile02"
                        placeholder="Ex : 2021"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 my-3 fw-bold"
                  onClick={() => handleClassRegister()}
                >
                  {loading1 ? (
                    <RotatingLines
                      height="23"
                      width="23"
                      strokeColor="white"
                      strokeWidth="5"
                    />
                  ) : (
                    "Create Class"
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Classes;
