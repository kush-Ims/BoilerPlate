import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const handleClick = () => {
    // logic before navigation (optional)
    navigate('./Dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: email.trim() === '',
      password: password.trim() === '',
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      toast.error('Please fill out all fields', { position: 'top-right' });
      return;
    }

    toast.success('Logged in successfully', { position: 'top-right' });
  };

  return (
    <div className="relative w-screen h-screen font-sans ">
      <Toaster />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray to-black opacity-70 mix-blend-overlay" />

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-4xl w-full max-w-sm space-y-6 transition-all"
        >
          <img
            src="src/assets/LOGO.png"
            alt="Logo"
            className="w-20 h-20 mx-auto drop-shadow-lg"
          />

          <h3 className="text-2xl text-white font-semibold text-center tracking-wide">UK Health Care</h3>

          {/* Email Input */}
          <div
            className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-150 ${errors.email
              ? 'border-red-500 ring-1 ring-red-400'
              : 'border-white/30 focus-within:ring-2 focus-within:ring-blue-400'
              }`}
          >
            <Mail className="h-5 w-5 text-white opacity-70" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="ml-3 bg-transparent outline-none w-full text-white text-sm placeholder-white/70"
            />
          </div>

          {/* Password Input */}
          <div
            className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-150 ${errors.password
                ? "border-red-500 ring-1 ring-red-400"
                : "border-white/30 focus-within:ring-2 focus-within:ring-blue-400"
              }`}
          >
            <Lock className="h-5 w-5 text-white opacity-70" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="ml-3 bg-transparent outline-none w-full text-white text-sm placeholder-white/70"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-white opacity-70" />
              ) : (
                <Eye className="w-5 h-5 text-white opacity-70" />
              )}
            </button>
          </div>

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-white hover:underline cursor-pointer transition-all"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            onClick={handleClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
