import React, { useEffect, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
const DarkMode: React.FC = () => {
  const [isCurrentDarkmode, setIsCurrentDarkmode] = useState<boolean>(() => {
    const darkModeWasSet = localStorage.getItem("darkmode");
    if (darkModeWasSet) return true;
    else return false;
  });
  const toggleDarkMode = () => {
    setIsCurrentDarkmode((prevState) => !prevState);
  };

  useEffect(() => {
    const html = document.querySelector<HTMLHtmlElement>("html")!;
    if (isCurrentDarkmode) {
      html.classList.add("dark");
      localStorage.setItem("darkmode", "true");
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#0f172a");
    } else {
      html.classList.remove("dark");
      localStorage.removeItem("darkmode");
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#e2e8f0");
    }
  }, [isCurrentDarkmode]);

  return (
    <button
      className="flex items-center justify-between"
      style={{marginRight:20}}
      onClick={toggleDarkMode}
    >
      <div className="w-14 h-5 bg-yellow-600 rounded-full px-0.5 dark:bg-yellow-700/[.3] relative flex items-center dark:justify-end">
        <div className="flex items-center justify-between rounded-full bg-violet-600 absolute"><Brightness4Icon sx={{color:"#FBAF43"}}/></div>
      </div>
    </button>
  );
};

export default React.memo(DarkMode);
