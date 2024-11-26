import axios from "axios";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const useMembers = () => {

  const [dataList, setDataList] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    debounce(async (userType, currentPage, searchTerm) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_API}/members?userType=${userType}&page=${currentPage}&limit=8&searchTerm=${searchTerm}`
        );
        if (res.status === 200) setDataList(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(error);
      }
    }, 300),
    []
  );
  const deleteUser = async (userId, userType, currentPage, searchTerm) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_API}/members`,
        {
          params: {
            userId,
          },
        }
      );
      if (response.status === 200) {
        fetchData(userType, currentPage, searchTerm);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return { dataList, loading, fetchData, deleteUser };
};

export default useMembers;
