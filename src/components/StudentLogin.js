import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {useSnackbar} from 'notistack'
import { verifyToken } from "../redux/slice/userSlice";

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const[email,setEmail] = useState('');
  const [password,setPassWord] = useState('')
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar()

const user = useSelector(state => state.userInfo.user)
const role = localStorage.getItem('role')


  const HandleLogin=async()=>{
    setLoading(true)
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/studentLogin`,{
      email,
      password
    });
    setLoading(false)

    if(response.data.token){
          enqueueSnackbar('Login SuccessFully' ,{variant:'success'});
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("role",'student');
          dispatch(verifyToken(response.data.token))
          navigate('/student/dashboard')
    }
    else{
      enqueueSnackbar(response.data.msg,{variant:'warning'})
    }
    
  }
  useEffect(()=>{
    if(user){
      navigate(`/${role}/dashboard`)
      enqueueSnackbar("Login Successfully", { variant: "success" });
    }
  },[user])
  return (
    <div
      className="container-fluid p-0 m-0 vh-100 text-center "
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp4299476.jpg")',
        backgroundSize: "cover",
      }}
    >
      <div className="row justify-content-center align-items-center w-100 h-100 ">
        <div className="col col-10 col-xl-4 col-lg-6 col-md-8  bg-primary-subtle bg-opacity-100 p-5 rounded d-flex flex-column gap-4">
          <h2 className="fw-bold">Student Login</h2>
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            class="form-control fw-bold py-2 "
            type="text"
            placeholder="Enter Your Email"
            aria-label=" "
          />
          <div className="position-relative">
            {" "}
            <input
            value={password}
            onChange={e=>setPassWord(e.target.value)}
              class="form-control fw-bold py-2 "
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              aria-label=""
            ></input>
            <p
              style={{
                position: "absolute",
                right: 20,
                top: 5,
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </p>
          </div>
          <button onClick={()=>HandleLogin()} className="btn btn-primary fw-bold py-2">{loading?<RotatingLines
  visible={true}
  height="23"
  width="23"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"

  />:'Login'}</button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
