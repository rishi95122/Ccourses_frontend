import React, { useEffect, useState } from "react";
import { getData } from "../../../store/courses";
import "./navsearch.css";
import { Link } from "react-router-dom";

const NavSearch = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(data);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      if (input.length > 0) {
        getData(input).then((res) => {
          setData(res);
          setSearch(res);
        });
      } else {
        setSearch([]);
      }
    }, 300);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="navsearch">
      <div>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Search for Anything"
        />
      </div>
      <div className="searchsection">
        {input.length > 0 && (
          <div>
            {!search?.length > 0 ? (
        
               
                  <div className="nocoursefound">
                    No Course Found
                    <div></div>
                  </div>
            
          
            ) : (
              search?.map((item, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/course/${item.course}`}
                  state={item}
                >
                  <div className="section-item">
                    <img
                      src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${item.image}.png`}
                      alt={item.course}
                    />
                    <div>
                      <h5>{item.course}</h5>
                      <p>{item.username}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSearch;
