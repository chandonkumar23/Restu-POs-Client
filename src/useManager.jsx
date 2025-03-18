/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UserAxiosSecure from "./useAxiosSecure";


const useManager = () => {
    const {user} = UseAuth();
    const axiosSecure = UserAxiosSecure()
   const {data: isManager} = useQuery({
    queryKey:[user?.email, 'isManager'],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/usInfo/manager/${user.email}`);
        return res.data?.manager;
    }
   })
   return [isManager]
};

export default useManager;