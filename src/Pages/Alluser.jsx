import { useQuery } from "@tanstack/react-query";
import UserAxiosSecure from "../useAxiosSecure";
import Swal from "sweetalert2";

const Alluser = () => {
  const axiosSecure = UserAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["usInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usInfo");
      return res.data;
    },
  });
  //create admin
  const handleMakeAdmin = user =>{
    axiosSecure.patch(`/usInfo/admin/${user._id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${user.name} is admin Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
        }
    })
  }
  //create manager
  const handleMakeManager = user =>{
    axiosSecure.patch(`/usInfo/manager/${user._id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${user.name} is manager Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
        }
    })
  }
  //create  sells man
  const handlesellsMan = user =>{
    axiosSecure.patch(`/usInfo/sellsMan/${user._id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${user.name} is Sells man Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
        }
    })
  }
  //delete users
  const handleDelete = user =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/usInfo/${user._id}`)
            refetch()
            .then( res =>{
                if(res.data.deletecCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            })
         
        }
      });
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Role</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                </td>
                <td>{user.phone}</td>
                <th>
                {
                    user.role === 'admin' ? <span className="text-green-600"> Admin </span> : <button
                    onClick={()=> handleMakeAdmin(user)} 
                    className="btn btn-ghost btn-xs">Make admin
                    </button>
                }
               {
                user.role === 'manager' ? 
                  <span className="text-green-600"> Manager </span> : <button
                onClick={()=> handleMakeManager(user)} 
                className="btn btn-ghost btn-xs ">Make manager
                </button>
                
               }
               {
                user.role === 'sellsMan' ? 
                  <span className="text-green-600"> Sells man </span> : <button
                onClick={()=> handlesellsMan(user)} 
                className="btn btn-ghost btn-xs ">Make Sells man
                </button>
                
               }
                </th>
                <th>
                  <button
                  onClick={()=> handleDelete(user)} 
                  className="btn btn-ghost btn-xs">Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alluser;
