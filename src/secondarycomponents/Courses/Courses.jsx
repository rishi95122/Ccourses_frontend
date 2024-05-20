import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Courses.css"
import { CiEdit } from "react-icons/ci";

import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import AddChapterContent from "./AddChapterContent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
  const { name } = useParams();
  const location = useLocation().state;
  const [add, setAdd] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [content, setContent] = useState();
  const [input, setInput] = useState("");
  const [loading,setLoading]=useState(false)


  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/course/addCourse", {
        name: input,
        course: name,
        username: currentUser.username,
      });
      getCourses();
    } catch (err) {
   toast(err.response.data)
    }
   
  };
 const  getCourses=async ()=> {
    try {
      const course = await axios.post("/course/getcourses", {
        username: currentUser.username,
        course: name,
      });

      setData(course.data);
    } catch (err) {
     
    }
  }
  useEffect(() => {
   
    getCourses();
  }, []);
 
  async function handleEdit(item){
    setLoading(true)
    setAdd(item)
    try {
      const dataa=await axios.post("/chapter/getContent", {
          username: currentUser.username,
          course: name,
          chapter:item.name,
      
        });
        setContent(dataa.data)
      } catch (err) {
       
      }
      setLoading(false)
    }

  return (
    <div className="main-addcourse">
      <div className="add-course">
        <div className="view-course">
          <div className="view-content">
            <div className="img">
              <img
                src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${location.image}.png`}
              />
            </div>

            <h1>{location.course}</h1>
            <p>{location.description}</p>
          </div>
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
                <div className="chapter">
                  <div>{<h5>{item?.name}</h5>}</div>
                  <div
                    onClick={()=>handleEdit(item)}
                  >
                    <CiEdit />
                  </div>
                </div>
                {add.name==item.name&& <AddChapterContent add={add} handleEdit={handleEdit} handleEdit={handleEdit} loading={loading} content={content}  course={name} chapter={item.name} username={currentUser.username} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Courses;