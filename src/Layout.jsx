import React from 'react'
import Navbar from './components/navbar/Navbar'
import Carou from './components/homepage/carousel/Carou'
import Home from './pages/Home'
import Footer from './components/footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './profile/Login'
import Register from './profile/Register'
import Manage from './secondarycomponents/AddCourse/Manage'
import View from './secondarycomponents/ProfileBar/View'
import Courses from './secondarycomponents/Courses/Courses'
import ViewAll from './secondarycomponents/ProfileBar/ViewAll'
import StudentCourse from './secondarycomponents/studentCourse/StudentCourse'
import Forgot from './profile/Forgot'
const Layout = () => {
  return (
    <div>
        <Navbar/>
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
    </Routes>
      
       
      
       <Footer />
    </div>
  )
}

export default Layout