import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/footer/Footer'
import {  Route, Routes, useLocation } from 'react-router-dom'
import Login from './profile/Login'
import Register from './profile/Register'
import Manage from './secondarycomponents/AddCourse/Manage'
import View from './secondarycomponents/ProfileBar/View'
import Courses from './secondarycomponents/Courses/Courses'
import ViewAll from './secondarycomponents/ProfileBar/ViewAll'
import StudentCourse from './secondarycomponents/studentCourse/StudentCourse'
import Forgot from './profile/Forgot'
import AdminDashboard from './admin/AdminDashboard'
import { ToastContainer } from 'react-toastify'
const Layout = () => {
  const {pathname} =useLocation()

  return (
    <div >
       {pathname!=='/admin' && <Navbar/>}
    <Routes>
      <Route path="/" element={ <Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/forgot" element={<Forgot />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/teacher/manage" element={<Manage />}/>
      <Route path="/teacher/view" element={<View />}/>
      <Route path="/teacher/course/:name" element={<Courses />} />
      <Route path="/course/:name" element={<StudentCourse />} />
      <Route path="/courses/"  element={<ViewAll />}/>
      <Route path="/admin"  element={<AdminDashboard />}/>
    </Routes>
    { pathname!=='/admin' &&   <Footer /> }
    <ToastContainer />
    </div>
  )
}

export default Layout