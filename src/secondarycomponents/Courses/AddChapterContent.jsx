import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";
import { MoonLoader } from "react-spinners";
import VideoUpload from "../../VideoUpload/VideoUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddChapterContent = ({
  course,
  chapter,
  loading,
  username,
  content,
  add,
  handleEdit,
}) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState();
  async function addContent() {
    try {
      await axios
        .post(`${process.env.REACT_APP_BACK_API}/chapter/content`, {
          username: username,
          course: course,
          chapter: chapter,
          content: url,
        })
        .then(() => {
          handleEdit(add);
        });
      toast.success("Added");
    } catch (err) {}
  }
  function handleUrl(e) {
    const url = e.target.value;
    const up = url.includes("watch");
    if (up) {
      const newUrl = url.split("=")[1];
      setUrl("https://www.youtube.com/embed/" + newUrl);
    } else {
      const newUrl = url.split("/")[3];
      setUrl("https://www.youtube.com/embed/" + newUrl);
    }
  }

  function handleClick() {
    addContent();
    setUrl("");
  }
  return (
    <div className="addcontent">
      <div className="addcontentform">
        <VideoUpload setUrl={setUrl} />
        <p>Or</p>
        <input
          value={url}
          placeholder="Enter Youtube Url"
          onChange={handleUrl}
        />
        <button onClick={handleClick}>Add</button>
      </div>

      <div className="content">
        {!loading ? (
          content &&
          content.map((item, idx) => {
            return (
              <div
                className="inner-content"
                onClick={() => {
                  setOpen(idx);
                }}
              >
                <p> Video {idx + 1} </p>
                <div className="videoo">
                  {open === idx && (
                    <iframe
                      width="100%"
                      height={400}
                      src={item.contentname}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen="true"
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading">
            {" "}
            <MoonLoader color="#36d7b7" />{" "}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddChapterContent;
