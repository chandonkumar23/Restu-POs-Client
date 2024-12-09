/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import ChartBar from "./Chart";
import { AuthContext, } from "../Provider/AuthProvider/AuthProvider";

const Account = () => {
  const {user} = useContext (AuthContext);
  return (
    <div className=" mx-auto">
      <div className="stats shadow bg-blue-700 text-white m-5">
        <div className="stat">
          {/* <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div> */}
          <div className="stat-title text-white">Total sell</div>
          <div className="stat-value text-white">25.6K</div>
          <div className="stat-desc text-white">21% more than last month</div>
        </div>

        <div className="stat">
          {/* <div className="stat-figure text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div> */}
          <div className="stat-title text-white">Today sell</div>
          <div className="stat-value text-white">2.6k</div>
          <div className="stat-desc text-white">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-white">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title text-white">Due done</div>
          <div className="stat-desc text-white">31 due remaining</div>
        </div>
      </div>
      <div>
        <ChartBar></ChartBar>
      </div>
    </div>
  );
};

export default Account;
