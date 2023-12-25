import {
  useEffect,
  useState,
} from "react"
import { ThemeContext } from "./ThemeContext";
import {ThemeMode} from "../util/ThemeUtil"

const ThemeContextDefaultProvider = (props: any) => {
  const [userThemeMode, setUserThemeMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const colorScheme: ThemeMode = "dark";
   setUserThemeMode(colorScheme);
  }, []);


  useEffect(() => {
    if (userThemeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
  }, [userThemeMode]);

  const toggleUserThemeMode = () => {
   //no toggle
  };

  return (
    <>
      <ThemeContext.Provider value={{
      themeMode:userThemeMode,
      toggleThemeMode: toggleUserThemeMode,
      }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextDefaultProvider;
