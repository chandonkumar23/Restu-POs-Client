import { useEffect, useState } from "react";
import PurchesReportingCard from "./PurchesReportingCard";

const PurchesReporting = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    fetch("https://restupos-server.vercel.app/addPurches")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);


  return (
    <div className="bg-white text-black">

      <h1 className="text-2xl font-bold">Purchase report: </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

            </tr>
          </thead>
          <tbody>

            {datas?.map((items) => (
              <PurchesReportingCard key={items._id} items={items}></PurchesReportingCard>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default PurchesReporting;