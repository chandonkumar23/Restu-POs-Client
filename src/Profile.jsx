import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider/AuthProvider";
import ProfileCard from "./ProfileCard";
import Attendance from "./Attendes";

function Profile() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/profile?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
    console.log(users);
  }, [user]);

  return (
    <div>
      {users.map((user) => (
        <ProfileCard key={user._id} user={user}></ProfileCard>
        
      ))}
      
    </div>
  );
}

export default Profile;
