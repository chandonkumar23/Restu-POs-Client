import Attendance from "./Attendes";

/* eslint-disable react/prop-types */
const ProfileCard = ({ user }) => {
  const { name, photo, email, role, phone } = user || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-400 text-black rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start p-6">
          <img
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 border-4 border-white shadow-xl rounded-full mb-4 md:mb-0 md:mr-6"
            src={photo}
           
          />
          <div className="text-center md:text-left">
            <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
            welcome back <span className="text-gray-500">{name}!</span> <span className="text-gray-600">({role})</span>
            </h2>
            <p className="text-lg text-gray-200 mt-2">
              Email: <span className="text-gray-100">{email}</span>
            </p>
            <p className="text-lg text-gray-200">
              Phone: <span className="text-gray-100">{phone}</span>
            </p>
            <p className="text-lg text-gray-200">
              Role: <span className="text-gray-100">{role}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Attendance />
      </div>
    </div>
  );
};

export default ProfileCard;
