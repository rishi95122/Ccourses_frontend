import React, { useEffect, useState } from "react";
import "./Upload.css"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
const VideoUpload = ({setUrl}) => {
 
  const [video, setVideo] = useState();
  const [videoper, setVideoper] = useState();

  const [input,setInputs]=useState()

  function upload(file, fileType) {
    const storage = getStorage(app);
    const folder = "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log("fdgh",storage)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
       
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setVideoper(Math.round(progress))
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
       console.log(error)
      },
      () => {
      
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(
             downloadURL
            )
        });
      }
    );
  }

  useEffect(() => {
    video &&  upload(video, "videourl");
  }, [video]);
 
console.log(video)
  return (
    <div className="upload">
      
        <input  onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
          type="file"
          id="actual-btn"
          accept="video/*"  hidden/>
  <div className="div">
        <label htmlFor="actual-btn">Choose File</label>
{
  videoper!==100? <p>{videoper>0 ? "Uploading-> " + videoper+ "%":""}</p>:<p>Uploaded</p>
}
{video?<span id="file-chosen" >{video.name}</span>:<span id="file-chosen" >No file chosen</span>}
 
        </div>



    </div>
  );
};

export default VideoUpload;
