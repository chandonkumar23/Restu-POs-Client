/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Calender = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null); // Track the selected day

  // Function to fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('https://restupos-server.vercel.app/atten');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Get the first day of the current month
  const getFirstDayOfMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  // Get the number of days in the current month
  const getDaysInMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  };

  // Get calendar days for the current month
  const getCalendarDays = () => {
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();
    const calendarDays = [];

    // Add empty days for the start of the month (before the first day)
    for (let i = 0; i < firstDay.getDay(); i++) {
      calendarDays.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  // Get attendance data for a specific day
  const getAttendanceForDay = (day) => {
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return attendanceData.filter(record => record.date === formattedDate);
  };

  // Filter attendance data by present/absent status
  const getStatusClass = (attendance) => {
    return attendance.status;
  };

  // Handle date click to set the selected day
  const handleDateClick = (day) => {
    setSelectedDay(day); // Set the clicked day to selectedDay
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-xl font-bold">Employee Attendance Sheet</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        >
          Next 
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}

        {getCalendarDays().map((day, index) => {
          if (!day) {
            return <div key={index}></div>;
          }

          const attendance = getAttendanceForDay(day);
          const statusClass = attendance.length > 0 ? getStatusClass(attendance[0]) : '';

          return (
            <div
              key={index}
              className={`p-2 border ${statusClass} flex flex-col items-center cursor-pointer`}
              onClick={() => handleDateClick(day)} 
            >
              <div className="text-sm font-medium mb-2">{day}</div> 

              {attendance.length > 0 && (
                <div className="text-xs sm:text-sm space-y-1 overflow-auto">
                  {attendance.map((absentee, i) => (
                    <div key={i} className="text-left text-ellipsis whitespace-nowrap overflow-hidden">
                      {/* <span className="font-semibold">{absentee.userName}</span> ({absentee.status}) */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-center">Attendance for {selectedDay}</h3>
          <div className="space-y-2 text-center">
            {getAttendanceForDay(selectedDay).length > 0 ? (
              getAttendanceForDay(selectedDay).map((attendance, i) => (
                <div key={i}>
                  <span className="font-semibold">{attendance.userName}</span> ({attendance.status})
                </div>
              ))
            ) : (
              <p>No attendance data available for this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
