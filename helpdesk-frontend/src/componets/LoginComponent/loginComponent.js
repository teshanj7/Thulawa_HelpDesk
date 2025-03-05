import React, { useState } from 'react';
import LoginImage from '../../images/loginimage.png';
import useAuth from '../../hooks/useLogin';

export default function LoginPage() {

  const { login } = useAuth();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await login(Email, Password); 
    } catch (error) {
        setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Right Side */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img src={LoginImage} alt="Login screen illustration" className="object-cover w-full h-full"/>
      </div>
      {/* Left Side */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST" onSubmit={handleLogin}>
          <div className="mb-4">
            <label for="username" className="block text-gray-600">Email</label>
            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label for="password" className="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
            <label for="remember" className="text-gray-600 ml-2">Remember Me</label>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
      </div>
    </div>
  );
}
