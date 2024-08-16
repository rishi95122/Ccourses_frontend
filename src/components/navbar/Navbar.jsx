import React, { useContext, useState } from "react";
import "./navbar.css";
import logo from "../../logo-udemy.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Categories from "../../bin/Categories";
import { AuthContext } from "../../context/authContext";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profilebar from "../../secondarycomponents/ProfileBar/Profilebar";
import axios from "axios";
import NavSearch from "./navsearch/NavSearch";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from "@mui/material";
const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [cat, setCat] = useState(false);
  const [bar, setBar] = useState(false);
  const { setInput } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    setCurrentUser(null);
    try {
      await axios.get(`${process.env.REACT_APP_BACK_API}/auth/logout`,{
        withCredentials:true
      });
    } catch (err) {
     
    }
  }

  function handleBar() {
    setBar(true);

  
  }
  function handleCloseBar(){
    setBar(false)
  }
  return (
    <div className="navbar" >
      <div className="img">
       <IconButton sx={{color:"black"}}>
        <LibraryBooksIcon fontSize="large" onClick={()=>nav('/')}/>
       </IconButton>

        {/* <div
    
          onMouseOver={() => {
            setCat(true);
          }}
          onMouseLeave={() => {
            setCat(false);
          }}
        >
          <p>Categories</p>
        </div> */}

        {cat && (
          <div
            onMouseOver={() => {
              setCat(true);
            }}
            onMouseLeave={() => {
              setCat(false);
            }}
          >
            <Categories />
          </div>
        )}
      </div>
        <div className="navsearch">
        {location.pathname === "/" ? <NavSearch />: location.pathname === "/courses" && <div className="courseSearch"> <input
          placeholder="search for anything"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        /></div>}
        </div>
    
        <div className="courseSearch">
        
        </div>
   

      <div className="login" onMouseLeave={handleCloseBar}>
        {bar && <Profilebar  id="profilebar"/>}
        {currentUser ? (
          <div className="login">
            <CgProfile size={25} />{" "}
            <p onMouseUp={handleBar} >{currentUser.username}</p>{" "}
            <button className="log" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              {" "}
              <button className="log">Login</button>
            </Link>
            <Link to="/register">
              {" "}
              <button className="singup"> Singup</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
