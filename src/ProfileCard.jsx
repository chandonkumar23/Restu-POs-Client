import Attendance from "./Attendes";

/* eslint-disable react/prop-types */
const ProfileCard = ({ user }) => {
  const { name, photo, email, role, phone } = user || {};
  return (
    <div>
      <div className="bg-blue-400 text-black m-5 rounded-xl">
        <div className=" flex items-center m-2">
          <img
            className="w-[300px] border-2 shadow-white shadow-2xl rounded-full m-5"
            src={photo}
            alt=""
          />
          <div>
            <h2 className="font-extrabold text-2xl md:3xl lg:5xl">
              {name} <span className="text-green-700">({role})</span>
            </h2>
            <h2>
              Email: <span className="text-gray-700">{email}</span>
            </h2>
            <h2>
              Phone: <span className="text-gray-700">{phone}</span>
            </h2>
          </div>
        </div>
      </div>
      <Attendance></Attendance>
    </div>
    
  );
};

export default ProfileCard;
