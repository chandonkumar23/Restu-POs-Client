import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider/AuthProvider";
import ProfileCard from "./ProfileCard";


function Profile() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://restupos-server.vercel.app/usInfos?email=${user.email}`)
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
