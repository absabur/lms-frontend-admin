import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-none shadow-xl relative flex items-center justify-center w-16 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg cursor-pointer overflow-hidden"
    >
      {/* Sliding circle */}
      <span
        className={`absolute top-0.3 left-0.5 w-7 h-7 bg-light1 dark:bg-dark1 rounded-full shadow-md transition-transform duration-500 ease-in-out ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      />

      {/* Icons container */}
      <div className="relative w-full flex justify-around text-dark2 dark:text-light2 select-none pointer-events-none gap-1">
        <IoSunnyOutline
          className={`transition-all duration-500 relative left-[1px] ${
            isDark
              ? "rotate-90 scale-75"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <IoMoonOutline
          className={`transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-75"
          }`}
        />
      </div>
    </button>
  );
}
