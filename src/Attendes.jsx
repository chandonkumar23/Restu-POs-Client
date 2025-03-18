/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider/AuthProvider";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(1); 
  const { user } = useContext(AuthContext);
  const userName = user.displayName;

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleAttendanceSubmit = async () => {
    console.log("Attendance submitted:", { userId, date, status });
    fetch("https://restupos-server.vercel.app/atten", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, date, status, userName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Attendance submitted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="flex justify-center items-center py-6 px-4 sm:px-8 lg:px-16">
      <div className="w-full max-w-md shadow-md rounded-lg bg-white p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Mark Attendance</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Attendance Status
          </label>
          <select
            id="status"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
        </div>
        <button
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-400"
          onClick={handleAttendanceSubmit}
          disabled={!status}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
