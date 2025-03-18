import { useQuery } from "@tanstack/react-query";
import UserAxiosSecure from "../useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const Alluser = () => {
  const axiosSecure = UserAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["usInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usInfo");
      return res.data;
    },
  });

  // Pagination calculations
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Handle role change
  const handleRoleChange = (role, user) => {
    axiosSecure.patch(`/usInfo/${role}/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.name} is now a ${role.charAt(0).toUpperCase() + role.slice(1)}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Delete user
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/usInfo/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        User Management
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">E-mail</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={user.photo} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          user.role === "admin"
                            ? "bg-blue-500"
                            : user.role === "manager"
                            ? "bg-green-500"
                            : user.role === "sellsMan"
                            ? "bg-orange-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {user.role || "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRoleChange("admin", user)}
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => handleRoleChange("manager", user)}
                          className="btn btn-xs btn-outline btn-success"
                        >
                          Make Manager
                        </button>
                        <button
                          onClick={() => handleRoleChange("sellsMan", user)}
                          className="btn btn-xs btn-outline btn-warning"
                        >
                          Make Sales Rep
                        </button>
                         <button onClick={() => handleDelete(user)} className="btn btn-outline btn-xs btn-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Alluser;
