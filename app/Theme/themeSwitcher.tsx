"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DarkThemeIcon from "./darkIcon";
import LightThemeIcon from "./lightIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      className="p-0"
    >
      {theme === "light" ? (
        <div className="hover:bg-light-bg200 p-2 rounded-lg">
          <DarkThemeIcon size={20} color={theme === "light" ? "#5c5c5c" : ""} />
        </div>
      ) : (
        <div className="hover:bg-dark-bg200 p-2 rounded-lg">
          <LightThemeIcon size={20} color="#FB923C" />
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
