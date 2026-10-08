import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  loginUser,
  resetState,
  selectAuthError,
  selectAuthLoading,
  selectAuthMessage,
  selectAuthUser,
} from "../../slices/authSlice";
import { fetchStudents } from "../../slices/studentSlice";
import { fetchCompanies } from "../../slices/companySlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectAuthUser);
  const message = useSelector(selectAuthMessage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function checkProfile() {
      if (user?.role === "student") {
        try {
          const resAction = await dispatch(fetchStudents());
          if (
            fetchStudents.fulfilled.match(resAction) &&
            Array.isArray(resAction.payload)
          ) {
            const profileExists = resAction.payload.some(
              (profile) => profile.userId === user._id
            );

            navigate(profileExists ? "/student/dashboard" : "/student/studentProfile");
          } else {
            navigate("/student/dashboard");
          }
        } catch {
          navigate("/student/dashboard");
        }
      } else if (user?.role === "company") {
        try {
          const resAction = await dispatch(fetchCompanies());
          if (
            fetchCompanies.fulfilled.match(resAction) &&
            Array.isArray(resAction.payload)
          ) {
            const profileExists = resAction.payload.some(
              (profile) => profile.user === user._id
            );

            navigate(profileExists ? "/company/dashboard" : "/company/companyProfile");
          } else {
            navigate("/company/dashboard");
          }
        } catch {
          navigate("/company/dashboard");
        }
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
      }
    }

    if (user) checkProfile();
  }, [user, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(message || "Login failed, please try again.");
    }
  }, [error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#111c33] relative overflow-hidden p-6">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-violet-600/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg">
            P
          </div>
          <span className="text-white font-bold text-lg">PlacementMS</span>
        </div>

        <h2 className="text-2xl font-bold text-center text-white">Welcome back</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* error */}
          {error && message && (
            <div className="text-center text-sm text-red-400 bg-red-500/10 border border-red-500/20 py-2 rounded-xl">
              {message}
            </div>
          )}

          {/* button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;