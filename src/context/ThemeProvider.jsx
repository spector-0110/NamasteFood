import { useContext, useEffect, createContext, useState } from "react";

// Provide default values in context creation
export const ThemeContext = createContext({
    theme: 'system',
    toggleTheme: () => {}
});

const ThemeProvider = ({children}) => {
    // Initialize theme from localStorage or default to system
    const [theme, setTheme] = useState(() => 
        localStorage.getItem("theme") || "system"
    );

    // Handle theme changes and system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const applyTheme = () => {
            const isDark = 
                theme === 'dark' || 
                (theme === 'system' && mediaQuery.matches);
            
            // Set the data-theme attribute instead of class
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        };

        // Apply theme immediately
        applyTheme();

        // Handle system theme changes
        const handleSystemThemeChange = () => {
            if (theme === 'system') {
                applyTheme();
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        // Cleanup listener
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]);

    const toggleTheme = (newTheme) => {
        if (!['light', 'dark', 'system'].includes(newTheme)) {
            return; // Invalid theme value
        }
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ 
            theme: theme === 'system' 
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : theme, 
            toggleTheme 
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;