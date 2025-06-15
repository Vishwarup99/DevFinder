import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);


    const fetchUser = async () => {
        if (userData) {
            return;
        }
        try {
            const user = await axios.get(`${BASE_URL}/profile/view`, {withCredentials: true});
            dispatch(addUser(user.data));
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            }
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
            fetchUser();
    },[])

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body;