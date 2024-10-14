import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { RotatingLines } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import SideNav from "./SideNav";

const Announcement = () => {
  const [editClub, setEditClub] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [addClub, setAddClub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [clubInfo, setClubInfo] = useState({
    title: "",
    description: "",
  });
  const [clubInfo1, setClubInfo1] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [eventInfo, setEventInfo] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [eventInfo1, setEventInfo1] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });

  const handleClubChange = (e) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
  };
  const handleClubChange1 = (e) => {
    setClubInfo1({ ...clubInfo1, [e.target.name]: e.target.value });
  };

  const handleEventChange = (e) => {
    setEventInfo({ ...eventInfo, [e.target.name]: e.target.value });
  };
  const handleEventChange1 = (e) => {
    setEventInfo1({ ...eventInfo1, [e.target.name]: e.target.value });
  };
  //update club
  const handleUpdateClub = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/club/${clubInfo1.id}`,
        clubInfo1
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Updated SuccessFully", { variant: "success" });
        setEditClub(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //set pre values
  const handleClubinfo = (item) => {
    setClubInfo1({
      id: item._id,
      title: item.title,
      description: item.description,
    });

    setEditClub(true);
  };
  const registerClub = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/clubReg`,
        clubInfo
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Club Added SuccessFully", { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update event
  const handleUpdateEvent = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/event/${eventInfo1.id}`,
        eventInfo1
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Updated SuccessFully", { variant: "success" });
        setEditEvent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //set pre values
  const handleEventinfo = (item) => {
    setEventInfo1({
      id: item._id,
      title: item.title,
      content: item.content,
      date: item.date,
    });

    setEditEvent(true);
  };
  const registerEvent = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/eventReg`,
        eventInfo
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Event Added SuccessFully", { variant: "success" });
        window.location.reload();
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

//delete Functions
//delete club
const deleteClub = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/clubs/${id}`);

    if (response.status === 201) {

      enqueueSnackbar('Club deleted successfully', { variant: 'success' });
      window.location.reload()
    } else {
      enqueueSnackbar(`${response.data.message}`, { variant: 'warning' });
    }
  } catch (error) {
    console.log(error)
  }
};

//delete Event
const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/events/${id}`);

    if (response.status === 201) {
      enqueueSnackbar(response.data.msg, { variant: 'success' });
      window.location.reload()
    } else {
      enqueueSnackbar(`${response.data.msg}`, { variant: 'error' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
  }

};


  useEffect(() => {
    const getClubList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getAllClubs`
        );
        setClubList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClubList();
    const getEventList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getAllEvents`
        );
        setEventList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEventList();
  }, [clubList, eventList]);
  return (
 
      
      <div className="w-100">
        <SideNav/>
        <h2 className="text-center bg-success text-light p-3 my-3  w-100 fw-bold ">
          Manage Co-Curricular Activities
        </h2>

        <div class="container">
          {/* nav tabs// */}

          {/* popub for Add// */}
          {(addClub || addEvent) && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.59)",
                width: "100%",
                height: "100vh",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                class="tab-pane fade show active p-3 w-50 bg-secondary-subtle rounded"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {/* add club// */}
                {addClub && (
                  <form action="">
                    <div className="w-100 d-flex fw-bold justify-content-end">
                      <IoMdClose
                        size={25}
                        onClick={() => {
                          setAddClub(false);
                        }}
                      />
                    </div>
                    <h3 className="text-center fw-bold">Add Clubs</h3>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Club Name
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={clubInfo.title}
                          name="title"
                          onChange={handleClubChange}
                          type="text"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Description
                      </label>
                      <div class="input-group mb-3">
                        <textarea
                          value={clubInfo.description}
                          name="description"
                          onChange={handleClubChange}
                          class="form-control"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      onClick={(e) => registerClub(e)}
                      className="btn btn-primary fw-bold my-4 w-100"
                    >
                      {loading ? (
                        <RotatingLines
                          height="23"
                          width="23"
                          strokeColor="white"
                          strokeWidth="5"
                        />
                      ) : (
                        "Create Club"
                      )}
                    </button>
                  </form>
                )}
                {/* add Event// */}
                {addEvent && (
                  <form action="">
                    <div className="w-100 d-flex fw-bold justify-content-end">
                      <IoMdClose
                        size={25}
                        onClick={() => {
                          setAddEvent(false);
                        }}
                      />
                    </div>
                    <h3 className="text-center">Add Events</h3>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Title
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={eventInfo.title}
                          name="title"
                          onChange={handleEventChange}
                          type="text"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Content
                      </label>
                      <div class="input-group mb-3">
                        <textarea
                          value={eventInfo.content}
                          name="content"
                          onChange={handleEventChange}
                          class="form-control"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Date
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={eventInfo.date}
                          name="date"
                          onChange={handleEventChange}
                          type="date"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        registerEvent(e);
                      }}
                      className="btn btn-primary fw-bold my-4 w-100"
                    >
                      Create Club{" "}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* popup for Edit// */}

          {(editClub || editEvent) && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.59)",
                width: "100%",
                height: "100vh",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                class="tab-pane fade show active p-3 w-50 bg-info-subtle rounded"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {/* edit club// */}
                {editClub && (
                  <form action="">
                    <div className="w-100 d-flex fw-bold justify-content-end">
                      <IoMdClose
                        size={25}
                        onClick={() => {
                          setEditClub(false);
                        }}
                      />
                    </div>
                    <h3 className="text-center fw-bold">Add Clubs</h3>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Club Name
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={clubInfo1.title}
                          name="title"
                          onChange={handleClubChange1}
                          type="text"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Description
                      </label>
                      <div class="input-group mb-3">
                        <textarea
                          value={clubInfo1.description}
                          name="description"
                          onChange={handleClubChange1}
                          class="form-control"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleUpdateClub(e)}
                      className="btn btn-primary fw-bold my-4 w-100"
                    >
                      {loading ? (
                        <RotatingLines
                          height="23"
                          width="23"
                          strokeColor="white"
                          strokeWidth="5"
                        />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                )}
                {editEvent && (
                  <form action="">
                    <div className="w-100 d-flex fw-bold justify-content-end">
                      <IoMdClose
                        size={25}
                        onClick={() => {
                          setEditEvent(false);
                        }}
                      />
                    </div>
                    <h3 className="text-center">Edit Events</h3>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Title
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={eventInfo1.title}
                          name="title"
                          onChange={handleEventChange1}
                          type="text"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Content
                      </label>
                      <div class="input-group mb-3">
                        <textarea
                          value={eventInfo1.content}
                          name="content"
                          onChange={handleEventChange1}
                          class="form-control"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="" className="fw-semibold my-2">
                        Date
                      </label>
                      <div class="input-group mb-3">
                        <input
                          value={eventInfo1.date}
                          name="date"
                          onChange={handleEventChange1}
                          type="date"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        handleUpdateEvent(e);
                      }}
                      className="btn btn-primary fw-bold my-4 w-100"
                    >
                      {loading ? (
                        <RotatingLines
                          height="23"
                          width="23"
                          strokeColor="white"
                          strokeWidth="5"
                        />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item fw-bold" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                School Clubs
              </button>
            </li>
            <li class="nav-item fw-bold" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                School Events
              </button>
            </li>
          </ul>

          {/* tab content */}

          <div class="tab-content" id="myTabContent">
            {/* tab-1// */}
            <div
              class="tab-pane fade show active p-3"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
              style={{width:'100%',height:'90vh',background:'url(https://media.istockphoto.com/id/907984278/vector/education-conceptual-vector-illustration.jpg?s=612x612&w=0&k=20&c=D1aEvJD4lo_EiLs0mf18KPSRi-BEiXeQGuCg6EESSIo=)',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'center'}}
            >
              <div>
                <div className="container my-3 d-flex justify-content-end ">
                  <button
                    className="btn btn-primary"
                    onClick={() => setAddClub(true)}
                  >
                    {" "}
                    Add New Club
                  </button>
                </div>

                <table class="table  table-striped mt-4 " style={{opacity:'0.8'}}>
                  <thead>
                    <tr >
                      <th scope="col">NO.</th>
                      <th scope="col">CLUB NAME</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {clubList?.map((item, i) => {
                      return (
                        <tr className="">
                          <th scope="row">{i + 1}</th>

                          <td className="  fw-semibold">{item.title}</td>
                          <td className=" fw-semibold">{item.description}</td>

                          <td className="p-3">
                            <div
                              className="btn btn-primary rounded-pill"
                              onClick={() => {
                                handleClubinfo(item);
                              }}
                            >
                              <MdEdit size={22} />
                            </div>
                            <div onClick={()=>{deleteClub(item._id)}} className="btn btn-danger rounded-pill mx-1"><MdDelete size={22}/></div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* tab-2// */}
            <div
              class="tab-pane fade p-3"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div>
                <div className="container my-3 d-flex justify-content-end ">
                  <button
                    className="btn btn-primary"
                    onClick={() => setAddEvent(true)}
                  >
                    {" "}
                    Add New Event
                  </button>
                </div>

                <table class="table  table-striped mt-4">
                  <thead>
                    <tr>
                      <th scope="col">NO.</th>
                      <th scope="col">TITLE</th>
                      <th scope="col">CONTENT</th>
                      <th scope="col">DATE</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {eventList.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>

                          <td className="fw-semibold">{item.title}</td>
                          <td className="fw-semibold">{item.content}</td>
                          <td className="fw-semibold">
                            {new Date(item.date).toLocaleDateString("en-GB")}
                          </td>

                          <td className="p-3">
                            <div
                              className="btn btn-primary rounded-pill"
                              onClick={() => {
                                handleEventinfo(item);
                              }}
                            >
                              <MdEdit size={22} />
                            </div>
                            <div onClick={()=>deleteEvent(item._id)} className="btn btn-danger rounded-pill mx-1"><MdDelete size={22}/></div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Announcement;
