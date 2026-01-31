import { useContext, createContext, useState, useEffect } from "react";

const themeContext = createContext();

export const useTheme = () => {
  return useContext(themeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

   const [isOpen, setIsOpen] = useState(false);//navbar 

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  return (
    <themeContext.Provider value={{ theme, toggleTheme,isOpen,setIsOpen }}>
      {children}
    </themeContext.Provider>
  );
};
