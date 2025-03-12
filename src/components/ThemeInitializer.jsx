"use client";
import { useEffect } from "react";

export default function ThemeInitializer() {
    // We run this effect in a try-catch to prevent client errors
    useEffect(() => {
        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            try {
                let defaultTheme = 'dark'; // Default fallback

                // Try to get user preference
                if (typeof window !== 'undefined') {
                    // Check localStorage first
                    try {
                        const storedTheme = localStorage.getItem('theme');
                        if (storedTheme) {
                            defaultTheme = storedTheme;
                        } else {
                            // If no stored theme, check system preference
                            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            defaultTheme = prefersDark ? 'dark' : 'light';
                        }
                    } catch (storageErr) {
                        console.error('LocalStorage access error:', storageErr);
                    }

                    // Apply theme
                    document.documentElement.setAttribute('data-theme', defaultTheme);

                    // Setup listener for system theme changes
                    try {
                        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                        const handleChange = (e) => {
                            // Only auto-switch if user hasn't manually set preference
                            if (!localStorage.getItem('theme')) {
                                document.documentElement.setAttribute(
                                    'data-theme',
                                    e.matches ? 'dark' : 'light'
                                );
                            }
                        };

                        // Use the appropriate event listener method
                        if (mediaQuery.addEventListener) {
                            mediaQuery.addEventListener('change', handleChange);
                        } else if (mediaQuery.addListener) {
                            // Older browsers
                            mediaQuery.addListener(handleChange);
                        }

                        // Return cleanup function
                        return () => {
                            if (mediaQuery.removeEventListener) {
                                mediaQuery.removeEventListener('change', handleChange);
                            } else if (mediaQuery.removeListener) {
                                mediaQuery.removeListener(handleChange);
                            }
                        };
                    } catch (mediaErr) {
                        console.error('Media query error:', mediaErr);
                    }
                }
            } catch (mainErr) {
                console.error('Theme initialization error:', mainErr);
            }
        }, 10); // Small delay

        return () => clearTimeout(timer);
    }, []);

    return null; // Component doesn't render anything visible
}
