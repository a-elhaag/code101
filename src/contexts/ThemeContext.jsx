"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: null,
    setTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        // Initialize theme on mount
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "dark" : "light";
                setTheme(newTheme);
                document.documentElement.setAttribute("data-theme", newTheme);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const updateTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
