import axios from "axios";

export const getData = async (search) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_API}/course/getallcourses?search=${search}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message || error);
   
  }
};
