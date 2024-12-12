import { useLoaderData } from "react-router-dom";
import UsersCard from "./UsersCard";

const Alluser = () => {
  const userdata = useLoaderData();
  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold text border-e-white">
        All users
      </h1>
      {
        userdata.map((users) =>(
            <UsersCard key={users._id} users={users}></UsersCard>
        ))
      }
    </div>
  );
};

export default Alluser;
