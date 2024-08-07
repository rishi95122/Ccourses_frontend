import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Courses.css"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import AddChapterContent from "./AddChapterContent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader } from "react-spinners";
import { Paper } from "@mui/material";

const Courses = () => {
  const { name } = useParams();
  const location = useLocation().state;
  const [add, setAdd] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [content, setContent] = useState();
  const [input, setInput] = useState("");
  const [loading,setLoading]=useState(false)
  const [courseData, setcourseData] = useState();
  const courseName= name.split("=")

  const handleClick = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_BACK_API}/course/addCourse`, {
        name: input,
        course: courseName[0],
        username: currentUser.username,
      },{
        withCredentials:true
      });
      getCourses();
      setLoading(false)
    } catch (err) {
   toast(err.response.data)
    }
   
  };
 const  getCourses=async ()=> {
  setLoading(true)
    try {
      const course = await axios.post(`${process.env.REACT_APP_BACK_API}/course/getcourses`, {
        username: courseName[1],
          course: courseName[0],
      },{
        withCredentials:true
      });

      setData(course.data);
      setLoading(false)
    } catch (err) {
     
    }
  }
  useEffect(() => {
   
    getCourses();
  }, []);
  useEffect(()=>{
    setLoading(true)
    async function getCourseData() {
      try {
        const course = await axios.post(`${process.env.REACT_APP_BACK_API}/course/getCourseData`, {
          username: courseName[1],
          course: courseName[0],
        },{
          withCredentials:true
        });
  
        setcourseData(course.data);
        setLoading(false)
      } catch (err) {
       
      }
    }
    setLoading(false)
    getCourseData();
  },[])
  async function handleEdit(item){
    if(item?.name===add?.name)
     {
      setAdd({})
      return;
     }
    setLoading(true)
    setAdd(item)
    try {
      const dataa=await axios.post(`${process.env.REACT_APP_BACK_API}/chapter/getContent`, {
        username: courseName[1],
        course: courseName[0],
          chapter:item.name,
      
        },{
          withCredentials:true
        });
        setContent(dataa.data)
      } catch (err) {
       
      }
      setLoading(false)
    }
    
    async function deleteCourseContent(item){

      try {
    const res= await axios.post(
         
          `${process.env.REACT_APP_BACK_API}/course/deletecoursecontent/${item._id}`,
          {
            course: courseName[0],
            username: currentUser.username,
          },
          {
            withCredentials: true,
          }
        );
        setData(res.data);
  }
    catch(e){
  console.log(e)
    }
    }
  
     const  handleDelete =async(item)=>{
      deleteCourseContent(item)
     }
  return (
    <div className="main-addcourse">
     <div className="add-courseT">
        <div className="view-course">
        

       
          <div className="view-content">
            <div className="img">
              <img
              loading="lazy"
                src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${courseData?.image||location?.image}.png`}
              />
            </div>

            <h1>{courseData?.course||location?.course}</h1>
            <p className="description">{courseData?.description||location?.description}</p>
          </div>
       
          {(loading)?<div className='loadingg'> <MoonLoader color="#36d7b7" /> </div>:
          <Paper variant="elevation" elevation={24} >
 <div className="chapters">
            <div className="chapter-form">
              <h2>Course Content</h2>
              <form  onSubmit={handleClick} className="addnewchapter">
                <input
                  placeholder="add a new chapter"
                  required
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button >Add</button>
              </form>
            </div>
            {data?.map((item,idx) => {
              return (
                <div>
                <div className="teacher-chapter"  onClick={()=>handleEdit(item)}>
                  <div className="header"><h5>{item?.name}</h5>

                    <CiEdit  />
                  </div>
<MdDelete id="delete" onClick={()=>handleDelete(item)}/>
                </div>
                {add?.name===item?.name&& <AddChapterContent add={add} handleEdit={handleEdit} loading={loading} content={content}  course={name} chapter={item.name} username={currentUser.username} />}
                </div>
              );
            })}
          </div>
          </Paper>
         }
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Courses;
