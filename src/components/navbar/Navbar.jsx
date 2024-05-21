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
const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [cat, setCat] = useState(false);
  const [bar, setBar] = useState(false);
  const { setInput } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    localStorage.clear();

    setCurrentUser(null);
    try {
      await axios.post(`${process.env.REACT_APP_BACK_API}/auth/logout`);
    } catch (err) {
     
    }
  }

  function handleBar() {
    setBar(!bar);

    setTimeout(() => {
      setBar(false);
    }, 5000);
  }
  return (
    <div className="navbar">
      <div className="img">
        <img src={logo} onClick={() => nav("/")} />

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
   

      <div className="login">
        {bar && <Profilebar />}
        {currentUser ? (
          <div className="login">
            <CgProfile size={20} />{" "}
            <p onClick={handleBar}>{currentUser.username}</p>{" "}
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
