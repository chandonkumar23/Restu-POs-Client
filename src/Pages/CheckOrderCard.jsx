/* eslint-disable react/prop-types */
const CheckOrderCard = ({ orders }) => {
  const { _id,foodName,foodPhoto,foodLavel} = orders || {};
  console.log(_id);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> 
              <th>Order name</th>
              <th>Food code</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={foodPhoto}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{foodName}</div>
                    <div className="text-sm opacity-50">{foodLavel}</div>
                  </div>
                </div>
              </td>
              <td>
                {_id}
                <br />
                
              </td>
             
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

export default CheckOrderCard;
