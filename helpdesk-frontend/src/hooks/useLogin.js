import Swal from 'sweetalert2';
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
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back, ' + response.data.user.Fullname,
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#f0f9ff',
                    color: '#0f172a'
                });

                setUser(response.data.user);
                setToken(response.data.token);

                // Delay navigation until after popup
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter valid credentials!',
                background: '#fef2f2',
                color: '#7f1d1d'
            });
        }
    }

    const logout = () => {
        localStorage.clear();
        Swal.fire({
            icon: 'success',
            title: 'Logged out!',
            text: 'You have been successfully logged out.',
            showConfirmButton: false,
            timer: 1500,
            background: '#ecfdf5',
            color: '#065f46'
        }).then(() => {
            window.location.href = '/';
        });
    }

    return { login, logout };
}

export default useAuth;
