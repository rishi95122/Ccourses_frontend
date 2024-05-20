import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CgEyeAlt } from "react-icons/cg";
import { IoEyeOutline } from "react-icons/io5";
const Profilebar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return (
    <div className="profilebar">
      {currentUser?.user == "Teacher" ? (
        <div>
     
          <NavLink style={{ textDecoration: "none" }} to="/teacher/manage">

            <p
              style={{
                textDecoration: "none",
                display: "flex",
                gap: "2px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            
              <FaPlus />
              Add Courses
            </p>
          </NavLink>{" "}
          <NavLink style={{ textDecoration: "none" }} to="/teacher/view">
            <p
              style={{
                textDecoration: "none",
                display: "flex",
                gap: "2px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <IoEyeOutline />
              View Courses
            </p>
          </NavLink>{" "}
          <NavLink style={{ textDecoration: "none" }} to="/courses">
            <p
              style={{
                textDecoration: "none",
                display: "flex",
                gap: "2px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <CgEyeAlt />
              View All Courses
            </p>
          </NavLink>{" "}
        </div>
      ) : (
        <NavLink to="/courses">
          <p>View All Courses</p>
        </NavLink>
      )}
    </div>
  );
};

export default Profilebar;
