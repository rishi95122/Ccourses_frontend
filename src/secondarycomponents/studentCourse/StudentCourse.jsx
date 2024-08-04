import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./studentcourse.css"

import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import ViewStudentContent from "./ViewStudentContent";
import { Paper, Typography } from "@mui/material";
const StudentCourse = () => {
  const { name } = useParams();
  const location = useLocation().state;
  const [add, setAdd] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [content, setContent] = useState();
  const [courseData, setcourseData] = useState();
  const [loading,setLoading]=useState(false)

  const courseName= name.split("=")

useEffect(()=>{
  async function getCourseData() {
    try {
      const course = await axios.post(`${process.env.REACT_APP_BACK_API}/course/getCourseData`, {
        username: courseName[1],
        course: courseName[0],
      });

      setcourseData(course.data);
    } catch (err) {
     
    }
  }
  getCourseData();
},[])
  useEffect(() => {
    async function getCourses() {
      try {
        const course = await axios.post(`${process.env.REACT_APP_BACK_API}/course/getcourses`, {
          username: courseName[1],
          course: courseName[0],
        });

        setData(course.data);
      } catch (err) {
       
      }
    }
    getCourses();
  }, []);
 console.log("dasasasasasasasdds",courseData)
  async function handleEdit(item){
    if(item?.name===add)
      {
       setAdd({})
       return;
      }
    setLoading(true)
    setAdd(item.name)
    try {
      const dataa=await axios.post(`${process.env.REACT_APP_BACK_API}/chapter/getContent`, {
          username: courseName[1],
          course: courseName[0],
          chapter:item.name,
        });
     
        setContent(dataa.data)
       
      } catch (err) {
       
      }
      setLoading(false)
    }
console.log("dsadas",data)
  return (
    <div className="main-addcourse">
      <div className="add-course">
        <div className="view-course">
          <div className="view-content">
            <div className="img">
              <img
                src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${courseData?.image}.png`}
              />
            </div>

            <h1>{courseData?.course}</h1>
            <p>{courseData?.description}</p>
          </div>
          <div className="chapters">
            <div className="chapter-form">
              <h2>Course Content</h2>
    
            </div>
            {!currentUser ? <Paper elevation={24}>
             <Typography variant="h6" p={3} textAlign='center' color='red'>
             Please Login to view Content!!!
              </Typography></Paper>:
            data?.map((item,idx) => {
              return (
                <div>
                <div className="chapter"  onClick={()=>handleEdit(item)}>
                  <div >{<h5 >{item?.name}</h5>}</div>
                </div>
                {add==item.name&& <ViewStudentContent content={content} loading={loading} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
