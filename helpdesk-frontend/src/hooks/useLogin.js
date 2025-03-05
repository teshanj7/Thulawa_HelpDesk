import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from '../ContextComponent/ContextComponent';

const useAuth = () => {

    const navigate = useNavigate();
    const { setUser, setToken } = useContext(UserContext);

    const login = async (Email, Password) => {
        try {
            const response = await axios.post('http://localhost:8070/auth/login', {
                Email,
                Password
            });
            if (response.status === 200) {
                alert("Login Successfully...!");
                setUser(response.data.user);
                setToken(response.data.token);
                navigate('/home');
            } 
        } catch (error) {
            alert("Please Enter Valid Credentials..!");
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return { login, logout };
}

export default useAuth;