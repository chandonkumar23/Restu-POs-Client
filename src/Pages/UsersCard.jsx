import Swal from "sweetalert2";
import UserAxios from "../../routes/UserAxios";


const UsersCard = ({ users }) => {
  const { name, photo, email,_id} = users || {};
  const handleMakeAdmin = () =>{
   UserAxios.patch(`/user/admin/${_id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title:`${name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
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
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th></th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{name}</div>
                  </div>
                </div>
              </td>
              <td>
                {email}
                <br />
              </td>
              {
                users.role === 'admin' ? 'Admin' : <button onClick={handleMakeAdmin}>Make Admin</button>
              }
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default UsersCard;
