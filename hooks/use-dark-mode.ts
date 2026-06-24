"use client";

import { useEffect, useState } from "react";

/**
 * Shared dark-mode hook. Reads/writes the "theme" key in localStorage
 * and toggles the "dark" class on <html>, matching the CSS variables
 * already defined in globals.css (@custom-variant dark (&:is(.dark *))).
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored === "dark";
    // Hydrating UI state from a browser-only source right after mount is
    // the correct place for this; there's no prop/derived-state alternative.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return { isDark, toggle };
}