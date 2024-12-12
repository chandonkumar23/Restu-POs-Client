import axios from "axios";

const axiposUser = axios.create({
    baseURL :'https://restupos-server.vercel.app' 
})
const UserAxios = () => {
     return axiposUser;
};

export default UserAxios;