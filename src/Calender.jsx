/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Calender = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
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
    return attendance.status ; 
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
        >
          Previous Month
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        >
          Next Month
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
            <div key={index} className={`p-2 border ${statusClass}`}>
              <div className="text-sm">{day}</div>
              {attendance.length > 0 && (
                <div className="text-xs">
                  {attendance.map((absentee, i) => (
                   
                    <div key={i} >{absentee.userName} ({absentee.status})</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
