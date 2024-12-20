/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider/AuthProvider";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(1); // Simulate logged-in user ID
  const { user } = useContext(AuthContext);
  const userName = user.displayName;
  useEffect(() => {
    // Set today's date for the attendance
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleAttendanceSubmit = async () => {
    // Simulate submitting attendance
    console.log("Attendance submitted:", { userId, date, status });
    fetch("http://localhost:5000/atten", {
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
            title: "Attendens submited",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className=" m-5">
      <div className="w-96  shadow-md rounded-lg">
        <h2 className="text-xl mb-4 text-center">Mark Attendance</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">
            Attendance Status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md"
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
          className="w-full p-2 bg-green-500 text-white rounded-md"
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
