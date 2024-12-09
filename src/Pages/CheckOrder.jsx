
import CheckOrderCard from "./CheckOrderCard";
import ChartBar from "./Chart";



const CheckOrder = () => {
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:5000/Order")
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, []);
 
  
  
  
  return (
    <div>
      <div className="overflow-x-auto">
        <CheckOrderCard></CheckOrderCard>
      <ChartBar></ChartBar>
      </div>
     
    </div>
  )
};

export default CheckOrder;
