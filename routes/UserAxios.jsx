import axios from "axios";

const axiosPublic = axios.create({
    baseURL :'https://restupos-server.vercel.app' 
})
const UserAxios = () => {
    return axiosPublic;
};

export default UserAxios;