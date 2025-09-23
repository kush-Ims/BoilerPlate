// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { Eye, EyeOff, User, Lock } from "lucide-react";
// import { login } from "../services/authService";
// import { useAuth } from "../Context/AuthContext";
// // import { AuthProvider } from "../Context/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const { handleLogin } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let newErrors = {};
//     if (!username.trim()) newErrors.username = "Username is required";
//     if (!password.trim()) newErrors.password = "Password is required";
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       toast.error("Please fix the errors before continuing", {
//         position: "top-right",
//       });
//       return;
//     }

//     try {
//       const response = await login(username, password);
//       const data = response.data;

//       if (data?.accessToken) {
//         const token = `Bearer ${data.accessToken}`;
//         localStorage.setItem("authToken", token);
//         localStorage.setItem("refreshToken", data.refreshToken);
//         localStorage.setItem("userInfo", JSON.stringify(data.user));

//         handleLogin(token);
//       }
//       toast.success("Login successful!", { position: "top-right" });
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error( error.response?.data?.message || "Invalid username or password",
//         { position: "top-right" }
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f3ed] px-4">
//       <Toaster />
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Login to Dashboard
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username Input */}
//           <div>
//             <div
//               className={`flex items-center border rounded-lg px-3 py-2 ${
//                 errors.username
//                   ? "border-red-500 ring-1 ring-red-400"
//                   : "border-gray-300"
//               }`}
//             >
//               <User className="h-5 w-5 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
//               />
//             </div>
//             {errors.username && (
//               <p className="text-red-500 text-xs mt-1">{errors.username}</p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div>
//             <div
//               className={`flex items-center border rounded-lg px-3 py-2 ${
//                 errors.password
//                   ? "border-red-500 ring-1 ring-red-400"
//                   : "border-gray-300"
//               }`}
//             >
//               <Lock className="h-5 w-5 text-gray-500" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="ml-2 focus:outline-none"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5 text-gray-500" />
//                 ) : (
//                   <Eye className="w-5 h-5 text-gray-500" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { login } from "../services/authService";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before continuing", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await login(username, password);
      const data = response.data;

      if (data?.accessToken) {
        const token = data.accessToken; // 🔹 CHANGED: keep token without "Bearer "
        const refreshToken = data.refreshToken; // 🔹 CHANGED
        const user = data.user; // 🔹 CHANGED: backend returns { id, username, ... }

        // Save to localStorage
        localStorage.setItem("authToken", token); // 🔹 CHANGED
        localStorage.setItem("refreshToken", refreshToken); // 🔹 CHANGED
        localStorage.setItem("userInfo", JSON.stringify(user)); // 🔹 CHANGED

        // Call AuthContext login (passes all 3 params now)
        handleLogin(token, refreshToken, user); // 🔹 CHANGED
      }

      toast.success("Login successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid username or password",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f3ed] px-4">
      <Toaster />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Dashboard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2 ${
                errors.username
                  ? "border-red-500 ring-1 ring-red-400"
                  : "border-gray-300"
              }`}
            >
              <User className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2 ${
                errors.password
                  ? "border-red-500 ring-1 ring-red-400"
                  : "border-gray-300"
              }`}
            >
              <Lock className="h-5 w-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;