import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import type { LoginPayload } from "../types";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [apiError, setApiError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    setApiError("");
    try {
      const response = await loginUser(data);
      setAuth(response.token, response.user);
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50 dark:from-[#0a0a0f] dark:via-[#0d0d1a] dark:to-[#0a0a0f]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-300/20 dark:bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-violet-300/20 dark:bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white dark:bg-[#13131f] rounded-3xl shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-white/5 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center text-3xl shadow-lg shadow-indigo-500/30">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Sign in to your SmartLeads account
            </p>
          </div>

          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 animate-fade-in">
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className={inputClass}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;