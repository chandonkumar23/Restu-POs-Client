
import { useQuery } from "@tanstack/react-query";


import UseAuth from "../UseAuth";
import UserAxiosSecure from "../useAxiosSecure";


const useSellsMan = () => {
    const {user} = UseAuth();
    const axiosSecure = UserAxiosSecure()
   const {data: isSallsMan} = useQuery({
    queryKey:[user?.email, 'isSallsMan'],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/usInfo/sellsMan/${user.email}`);
        return res.data?.sellsMan;
    }
   })
   return [isSallsMan]
};

export default useSellsMan;