/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UserAxiosSecure from "./useAxiosSecure";


const userAdmin = () => {
    const {user} = UseAuth();
    const axiosSecure = UserAxiosSecure()
   const {data: isAdmin} = useQuery({
    queryKey:[user?.email, 'isAdmin'],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/usInfo/admin/${user.email}`);
        return res.data?.admin;
    }
   })
   return [isAdmin]
};

export default userAdmin;