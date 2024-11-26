import React, { useEffect, useState } from "react";

import { FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./MemberTable.css";
import useMembers from "../../hooks/useMembers";
import MemberEditModal from "./MemberEditModal";
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import LoadingSkeletonTable from "../../skeleton/LoadingSkeletonTable ";
function MemberTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState("All");
  const { dataList, fetchData, deleteUser, loading } = useMembers(
    userType,
    currentPage
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const totalPages = dataList?.pagination?.totalPages;

  const refreshData = () => {
    fetchData(userType, currentPage, searchTerm);
  };

  useEffect(() => {
    fetchData(userType, currentPage, searchTerm);
  }, [userType, currentPage, searchTerm]);

  const handleTableList = (type) => {
    setUserType(type);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < dataList?.pagination?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="member-container">
      <div className="header">
        <h1>Members</h1>

        <div className="search-wrapper">
          <CiSearch className="search-icon" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${userType === "All" ? "active" : ""}`}
          onClick={() => handleTableList("All")}
        >
          All{" "}
          {userType === "All" && (
            <span className="count">{dataList?.pagination?.totalUsers}</span>
          )}
        </button>
        <button
          className={`tab ${userType === "Teacher" ? "active" : ""}`}
          onClick={() => handleTableList("Teacher")}
        >
          Teacher{" "}
          {userType === "Teacher" && (
            <span className="count">{dataList?.pagination?.totalUsers}</span>
          )}
        </button>
        <button
          className={`tab ${userType === "Students" ? "active" : ""}`}
          onClick={() => handleTableList("Students")}
        >
          Students{" "}
          {userType === "Students" && (
            <span className="count">{dataList?.pagination?.totalUsers}</span>
          )}
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email Address</th>
              <th>User type</th>

              <th>
                Status <FaArrowDown size={12} />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingSkeletonTable />
            ) : (
              dataList &&
              dataList?.users &&
              dataList?.users?.slice(0, 7).map((item, index) => (
                <tr key={item?.id}>
                  <td className="name-cell">
                    <span>{item?.username}</span>
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.user}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        item?.status === "active" ? "active" : "inactive"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td className="actions-buttons">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setSelectedItemId(item?._id);
                      }}
                      className="action-button"
                    >
                      <TiEdit title="Edit" size={18} />
                    </button>
                    <button
                      onClick={() =>
                        deleteUser(item?._id, userType, currentPage, "")
                      }
                      className="action-button"
                    >
                      <MdDeleteForever title="Delete" size={18} />
                    </button>
                    {selectedItemId === item?._id && (
                      <MemberEditModal
                        item={item}
                        open={open}
                        setOpen={setOpen}
                        onRefresh={refreshData}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MemberTable;
