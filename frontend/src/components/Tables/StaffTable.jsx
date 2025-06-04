import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from "../Authentication/Register";
import EditFunction from "./EditFunction";
import AuthModalWrapper from "../Modal/AuthModalWrapper";

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

  return (
    <div className="flex flex-col overflow-auto flex-grow gap-2 p-6 text-primary-dark">
      <h1 className="font-bold font-poppins text-[16px]">Staff List</h1>

      <button
        className="flex justify-end bg-primary-dark text-white size-fit p-2 text-[12px] font-medium rounded-custom-xs place-self-end"
        onClick={handleAddUserClick}
      >
        Add User
      </button>

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

      <table className="table-auto h-full text-center min-h-full font-poppins border border-primary-dark border-opacity-30">
        <thead className="bg-primary-dark font-poppins text-white font-semibold text-[12px]">
          <tr>
            <th className="px-3 py-2">ID</th>
            <th>Email</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle I.</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Monthly Salary</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-[12px]">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-primary-dark border-opacity-30"
            >
              <td className="px-3 py-3">{user.id}</td>
              <td className="px-3 py-3">{user.email}</td>
              <td className="px-3 py-3">{user.last_name}</td>
              <td className="px-3 py-3">{user.first_name}</td>
              <td className="px-3 py-3">{user.middle_initial}</td>
              <td className="px-3 py-3">{user.address}</td>
              <td className="px-3 py-3">{user.contact_number}</td>
              <td className="px-3 py-3">₱{user.monthly_salary}</td>
              <td className="px-3 py-3">{user.role}</td>
              <td className="px-4">
                <button
                  className="bg-primary-dark w-full text-white text-xs px-2 py-1 rounded"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
