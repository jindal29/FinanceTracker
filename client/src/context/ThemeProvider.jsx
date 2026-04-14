import { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
       document.documentElement.classList.add('dark');
       localStorage.setItem('theme', 'dark');
    } else {
       document.documentElement.classList.remove('dark');
       localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
       {children}
     </ThemeContext.Provider>
  );
};

export default ThemeProvider;
