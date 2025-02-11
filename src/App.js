import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import TeacherLogin from "./components/TeacherLogin";
import StudentLogin from "./components/StudentLogin";
import Dashboard from "./pages/admin/Dashboard";
import Announcement from "./pages/admin/Announcement";
import Attendance from "./pages/admin/Attendance";
import Classes from "./pages/admin/Classes";
import Exam from "./pages/admin/Exam";

import ProfileUpdate from "./pages/admin/ProfileUpdate";
import Student from "./pages/admin/Student";
import Teacher from "./pages/admin/Teacher";
import TProfile from "./pages/teacher/ProfileUpdate";
import Navbar from "./components/Navbar";
import Parents from "./pages/admin/Parents";
import Subject from "./pages/admin/Subject";
import Payment from "./pages/admin/Payments";
import StuDashboard from "./pages/student/Dashboard";
import StuSubject from "./pages/student/Subject";
import StuTeacher from "./pages/student/Teacher";
import StuExam from "./pages/student/Exam";
import StuPayment from "./pages/student/Payment";
import StuNoticeBoard from "./pages/student/NoticeBoard";
import StuProfile from "./pages/student/Profile";
import ClassMates from "./pages/student/Student";
import TDashBoard from "./pages/teacher/Dashboard";
import TClass from "./pages/teacher/Classes";
import TSubject from "./pages/teacher/Subject";
import TStudents from "./pages/teacher/Student";
import TAttendance from "./pages/teacher/Attendance";
import TExams from "./pages/teacher/Exam";
import TSalary from "./pages/teacher/Salary";
import StudentMarks from "./pages/student/Marks"
import TeacherSectionStudents from "./pages/teacher/SectionStudents"

import TAnnouncement from "./pages/teacher/Announcement";
import Marks from "./pages/admin/Marks";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./redux/slice/userSlice";

import axios from "axios";
import { addClass, GetAllClasss } from "./redux/slice/classSlice";
import RollManage from "./pages/admin/RollManage";
import TimeTable from "./pages/admin/TimeTable";
import StuTimeTable from "./pages/student/TimeTable";
import AdminSidebar from "./pages/admin/Sidebar";
import StudentSidebar from "./pages/student/Sidebar";
import TeacherSidebar from "./pages/teacher/Sidebar";

import AdmissionForm from "./pages/admin/AdmissionForm";
import SectionStudents from "./pages/admin/SectionStudents";
import MyParent from "./pages/student/MyParent";
import Footer from "./components/Footer";
import MakePayment from "./pages/admin/MakePayment";
import RaisePayment from "./pages/admin/RaisePayment";
import TransactionHistory from "./pages/admin/TransactionHistory";
import ViewStudent from "./pages/admin/ViewStudent";
import ClassSection from "./pages/admin/ClassSection";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import StudentSection from "./pages/admin/StudentSection";
import { GetAllStudents } from "./redux/slice/studentSlice";
import { GetAllTeachers } from "./redux/slice/teacherSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const queryClient = new QueryClient()

  const getYearBasedOnFebruary = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return today.getMonth() >= 1 ? currentYear - 1 : currentYear;
  };


  useEffect(() => {
    localStorage.setItem("currentYear",getYearBasedOnFebruary())
    dispatch(GetAllClasss())
    dispatch(GetAllTeachers())
    dispatch(GetAllStudents())
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token));
    }
  }, [dispatch]);
  let role = localStorage.getItem("role");

  return (
    <div style={{ backgroundColor: "#FCFCFC " }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <div className="d-flex">
            {user && (
              <div className="d-none d-md-block">
                {(role == "admin" && <AdminSidebar />) ||
                  (role == "student" && <StudentSidebar />) ||
                  (role == "teacher" && <TeacherSidebar />)}
              </div>
            )}
            <Routes>
              {/* Login Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
              <Route path="/student-login" element={<StudentLogin />} />

              {/* <Route element={<PrivateRoute/>}> */}
              {/* Admin Routes */}
              {role == "admin" && (
                <>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route
                    path="/admin/admissionForm"
                    element={<AdmissionForm />}
                  />
                  <Route
                    path="/admin/student/:id"
                    element={<SectionStudents />}
                  />
                  <Route path="/admin/view-student/:id" element={<ViewStudent />} />
                  <Route path="/admin/payment/makePayment" element={<MakePayment />} />
                  <Route path="/admin/payment/raisePayment" element={<RaisePayment />} />
                  <Route path="/admin/payment/paymentHistory" element={<TransactionHistory />} />
                  <Route path="/admin/timeTable" element={<TimeTable />} />
                  <Route path="/admin/announcement" element={<Announcement />} />
                  <Route path="/admin/attendance" element={<Attendance />} />
                  <Route path="/admin/classes" element={<Classes />} />
                  <Route path="/admin/classes/:classID" element={<ClassSection />} />
                  <Route path="/admin/exam" element={<Exam />} />
                  <Route path="/admin/profile" element={<ProfileUpdate />} />
                  <Route path="/admin/student" element={<Student />} />
                  <Route path="/admin/student/section/:classID" element={<StudentSection />} />
                  <Route path="/admin/teacher" element={<Teacher />} />
                  <Route path="/admin/parents" element={<Parents />} />
                  <Route path="/admin/subject" element={<Subject />} />
                  <Route path="/admin/payment" element={<Payment />} />
                  <Route path="/admin/roll-manage" element={<RollManage />} />
                  <Route path="/admin/marks" element={<Marks />} />
                  <Route path="/admin/markReport" element={<Marks />} />
                  <Route path="/admin/attendaceReport" element={<Attendance />} />
                </>
              )}

              {/* Student Routes */}
              {role == "student" && (
                <>
                  <Route path="/student/dashboard" element={<StuDashboard />} />
                  <Route path="/student/timetable" element={<StuTimeTable />} />
                  <Route path="/student/subject" element={<StuSubject />} />
                  <Route path="/student/parents" element={<MyParent />} />
                  <Route path="/student/marks" element={<StudentMarks />} />

                  <Route
                    path="/student/teacher-section"
                    element={<StuTeacher />}
                  />
                  <Route path="/student/class-mates" element={<ClassMates />} />
                  <Route path="/student/exam" element={<StuExam />} />
                  <Route path="/student/payment" element={<StuPayment />} />
                  <Route
                    path="/student/announcement"
                    element={<StuNoticeBoard />}
                  />
                  <Route path="/student/profile" element={<StuProfile />} />
                </>
              )}
              {/* Teacher Routes */}

              {role == "teacher" && (
                <>
                  <Route
                    path="/teacher/student/:id"
                    element={<TeacherSectionStudents />}
                  />
                  <Route path="/teacher/dashboard" element={<TDashBoard />} />
                  <Route path="/teacher/student" element={<TStudents />} />

                  <Route path="/teacher/class" element={<TClass />} />
                  <Route path="/teacher/subject" element={<TSubject />} />
                  <Route path="/teacher/students" element={<TStudents />} />
                  <Route path="/teacher/attendance" element={<TAttendance />} />
                  <Route path="/teacher/exam" element={<TExams />} />
                  <Route path="/teacher/payment" element={<TSalary />} />
                  <Route path="/teacher/profile" element={<TProfile />} />
                  <Route
                    path="/teacher/announcement"
                    element={<TAnnouncement />}
                  />
                </>
              )}
              {/* </Route> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
