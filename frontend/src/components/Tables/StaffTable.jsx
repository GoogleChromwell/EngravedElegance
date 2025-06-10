import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from "../Authentication/Register";
import EditFunction from "./EditFunction";
import AuthModalWrapper from "../Modal/AuthModalWrapper";
import { toast, ToastContainer } from "react-toastify";

export default function StaffTable() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Staff/DisplayUsers.php"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching users: ", error);
      });
  };

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  const handleAddUserClick = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios
      .put(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Staff/DeleteUser.php",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Staff information deleted")
        fetchStaff();
      })
      .catch((err) => {
        toast.error("Failed to delete staff information")
      });
  };

  return (
    <div className="flex flex-col w-full h-full p-4 text-primary-dark">
      <ToastContainer/>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold custom-tablet:text-[16px] custom-mobileSmall:text-[14px]">
          Staff List
        </h1>
        <button
          className="bg-primary-dark text-white text-xs px-4 py-2 rounded-custom-xs"
          onClick={handleAddUserClick}
        >
          Add Staff
        </button>
      </div>

      <AuthModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {editingStaff ? (
          <EditFunction
            staffToEdit={editingStaff}
            onBackToLogin={() => setIsModalOpen(false)}
          />
        ) : (
          <Register onBackToLogin={() => setIsModalOpen(false)} />
        )}
      </AuthModalWrapper>

      <div
        className="overflow-x-auto 
      custom-tablet:max-w-full 
      custom-mobileSmall:max-w-[410px] "
      >
        <table className="table-auto text-left font-poppins w-full">
          <thead className="bg-primary-dark text-white font-semibold text-[12px]">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Email & Role</th>
              <th className="px-3 py-2">Name & Contact No.</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">Monthly Salary</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-primary-dark border-opacity-30 text-left"
              >
                <td className="px-3 py-3">{user.id}</td>
                <td className="px-3 py-3">
                  {user.email} <br />
                  {user.role}
                </td>
                <td className="px-3 py-3">
                  {user.first_name} {user.middle_initial}. {user.last_name}{" "}
                  <br />
                  {user.contact_number}
                </td>
                <td className="px-3 py-3">{user.address}</td>
                <td className="px-3 py-3">₱{user.monthly_salary}</td>
                <td className="flex gap-1 px-3 py-3 text-center items-center">
                  <button
                    className="bg-primary-dark text-white text-xs px-2 py-1 rounded w-full"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded w-full"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
