import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/authContext";
import { getData } from "../../store/courses";
import "./profilebar.css";
import SingleCard from "../../../src/skeleton/SingleCard";

const ViewAll = () => {
  const { input } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(data);
  useEffect(() => {
    getData()
      .then(function (res) {
        setData(res);
        setSearch(res);
      })
      .catch(() => {
        throw new Error("Error");
      });
  }, []);
  useEffect(() => {
    const updated = data?.filter((item) => {
      const course = item.course.toLowerCase();
      const search = input.toLowerCase();

      return course.indexOf(search) != -1;
    });
    setSearch(updated);
  }, [input]);

  return (
    <div className="single-main">
      <h1>Courses</h1>
      <div className="single">
        {search ? (
          search?.map((item) => {
            return (
              <div className="card">
                <div className="img">
                  <img
                    src={`https://res.cloudinary.com/drlewouwd/image/upload/q_auto,f_auto/v1710917678/${item.image}.png`}
                    alt="Optimized Image"
                  />
                </div>
                <div className="text">
                  <h5>{item?.course}</h5>

                  <h6>{item?.category}</h6>
                  <Link
                    to={"/course/" + item.course + "=" + item.username}
                    state={item}
                  >
                    <button>Preview Course</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="skeletons">
            {" "}
            <SingleCard /> <SingleCard /> <SingleCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAll;
