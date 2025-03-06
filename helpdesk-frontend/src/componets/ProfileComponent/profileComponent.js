import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import UserContext from '../../ContextComponent/ContextComponent';
import usercardpic from '../../images/astronaut.jpg';

export default function Profile() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const { user } = useContext(UserContext);
    const userId = user._id;
    const userEmail = user.Email;
    const userRole = user.UserType;

    // Determine the correct name field based on role
    const userFullName = userRole === "admin" ? user?.Adminname : user?.Fullname;

    useEffect(() => {
        setFullName(userFullName);
        setEmail(userEmail);
    }, [userFullName, userEmail]);

    // Delete user function
    const deleteUser = async (_id) => {
        if (window.confirm("Do you want to delete your user account?")) {
            const res = await axios.delete(`https://localhost/auth/delete/${_id}`);
            if (res.status === 200) {
                window.location.href = ``;
                toast.error('User account deleted..!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <div className="min-h-screen text-white bg-gray-400">
            <div className="py-8 text-center">
                <h1 className="font-mono text-5xl text-black font-aldrich">Your User Profile</h1>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <img src={usercardpic} alt="Astronaut" className="object-cover w-full h-full" />
                        </div>
                        <div className="p-6 md:w-2/3">
                            <h3 className="mb-4 text-3xl font-bold text-black">{fullName}'s User Profile</h3>
                            <p className="mb-6 text-black">Your User Information is listed in this card accordingly, you can either update or delete your details respectively.</p>
                            
                            <h5 className="mb-2 text-xl font-bold text-black">👤 User's Full Name:</h5>
                            <p className="mb-4 text-black">▶ {fullName}</p>
                            
                            <h5 className="mb-2 text-xl font-bold text-black">📧 User's Email:</h5>
                            <p className="mb-4 text-black">▶ {email}</p>
                            
                            <h5 className="mb-2 text-xl font-bold text-black">@ User's Password:</h5>
                            <p className="mb-6 text-black">▶ ********</p>
                            
                            <div className="flex justify-around">
                                <button className="w-1/3 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                    Update Account
                                </button>
                                <button 
                                    className="w-1/3 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                                    onClick={() => deleteUser(userId)}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}