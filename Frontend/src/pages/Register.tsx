import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth";
import type { RegisterPayload, UserRole } from "../types";

function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const onSubmit = async (data: RegisterPayload) => {
    setApiError("");
    setSuccessMsg("");
    try {
      await registerUser(data);
      setSuccessMsg("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 dark:from-[#0a0a0f] dark:via-[#0d0d1a] dark:to-[#0a0a0f]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-violet-300/20 dark:bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-indigo-300/20 dark:bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white dark:bg-[#13131f] rounded-3xl shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-white/5 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center text-3xl shadow-lg shadow-violet-500/30">
              🚀
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Join SmartLeads to manage your leads
            </p>
          </div>

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/30 animate-fade-in">
              ✅ {successMsg}
            </div>
          )}

          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 animate-fade-in">
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="register-name" className={labelClass}>Full Name</label>
              <input
                id="register-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                className={inputClass}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="register-email" className={labelClass}>Email address</label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="register-password" className={labelClass}>Password</label>
              <input
                id="register-password"
                type="password"
                placeholder="Min. 6 characters"
                className={inputClass}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="register-role" className={labelClass}>Role</label>
              <select
                id="register-role"
                className={inputClass}
                {...register("role")}
                defaultValue={"sales" as UserRole}
              >
                <option value="sales">💼 Sales User</option>
                <option value="admin">👑 Admin</option>
              </select>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                Admins can delete leads. Sales users can create &amp; edit.
              </p>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-violet-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;