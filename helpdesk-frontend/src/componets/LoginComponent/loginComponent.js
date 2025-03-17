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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
      {/* Left Side Image */}
      <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
        <img 
          src={LoginImage} 
          alt="Login Illustration" 
          className="object-cover w-full h-full rounded-l-3xl shadow-2xl" 
        />
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white border-opacity-30 transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-extrabold text-white text-center mb-6">Welcome Back!</h1>
          <p className="text-center text-white text-opacity-80 mb-8">Login to your account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-30 text-white placeholder-white placeholder-opacity-80 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-30 text-white placeholder-white placeholder-opacity-80 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
                placeholder="Enter your password"
                autoComplete="off"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 rounded"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forget-password" className="text-blue-200 hover:text-white transition duration-300">Forgot password?</a>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-300 text-sm text-center">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <span className="h-px w-16 bg-white bg-opacity-40"></span>
              <span className="text-white text-sm opacity-80">or continue with</span>
              <span className="h-px w-16 bg-white bg-opacity-40"></span>
            </div>

            {/* Social Login (Optional) */}
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-white bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
              </button>
              <button className="bg-white bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-6 h-6" />
              </button>
              <button className="bg-white bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
