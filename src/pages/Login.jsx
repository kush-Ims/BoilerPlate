import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before continuing", { position: "top-right" });
      return;
    }

    toast.success("Login successful!", { position: "top-right" });

    setTimeout(() => {
      navigate("/layout"); // Redirect to layout
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Toaster />
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-sm border border-white/20">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login to Dashboard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2 ${
                errors.email ? "border-red-500 ring-1 ring-red-400" : "border-white/30"
              }`}
            >
              <Mail className="h-5 w-5 text-white opacity-70" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-3 bg-transparent outline-none w-full text-white placeholder-white/70"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2 ${
                errors.password ? "border-red-500 ring-1 ring-red-400" : "border-white/30"
              }`}
            >
              <Lock className="h-5 w-5 text-white opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 bg-transparent outline-none w-full text-white placeholder-white/70"
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
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
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
