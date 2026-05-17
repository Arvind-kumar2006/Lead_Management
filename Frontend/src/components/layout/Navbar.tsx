import { useAuthStore } from "../../store/authStore";

function Navbar() {
  const { user, logout, isDarkMode, toggleDarkMode } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-500/30">
              ⚡
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-lg">SmartLeads</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 block -mt-1">Lead Management</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {user.name}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    }`}
                  >
                    {user.role === "admin" ? "👑 Admin" : "💼 Sales"}
                  </span>
                </div>
              </div>
            )}

            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <button
              id="logout-button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 transition-all duration-200"
            >
              <span>→</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
