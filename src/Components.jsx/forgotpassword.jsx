import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError(true);
      toast.error('Please enter your email', { position: 'top-right' });
      return;
    }

    setError(false);
    toast.success('Password reset link sent to your email', { position: 'top-right' });

    // Example: simulate navigation after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  return (
    <div className="relative w-screen h-screen font-sans">
      <Toaster />

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray to-black opacity-70 mix-blend-overlay" />

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-4xl w-full max-w-sm space-y-6 transition-all"
        >
          <img
            src="src/assets/LOGO.png"
            alt="Logo"
            className="w-20 h-20 mx-auto drop-shadow-lg"
          />

          <h3 className="text-2xl text-white font-semibold text-center tracking-wide">
            Forgot Password
          </h3>
          <p className="text-sm text-white/70 text-center">
            Enter your email and we’ll send you a reset link.
          </p>

          {/* Email Input */}
          <div
            className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-150 ${
              error
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

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200  hover:shadow-lg"
          >
            Send Reset Link
          </button>

          <p
            onClick={() => navigate('/')}
            className="text-sm text-white text-center hover:underline cursor-pointer "
          >
            Back to Login
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
