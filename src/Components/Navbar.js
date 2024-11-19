import React, { useEffect, useState } from "react";

const Navbar = () => {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkmode");
    return savedTheme === "true";
  });

  const screenModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkmode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  // Scroll Effect
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll=()=>{
      if(window.scrollY>50){
        setIsScrolled(true);
      }else{
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return ()=> window.removeEventListener('scroll', handleScroll);

  }, []);
  

  return (
    <div>
      <nav className={`nav ${isScrolled ? 'scrolled': ''}`}>
        <div className="nav-toggle">
          <div className="logo">
            <span className="logo-title">Nebula Nexus</span>
          </div>
          <i id="toggle-btn" className="bx bx-chevron-right"></i>
        </div>
        <ul className="nav-list">
          <li className="nav-items nav-item-logo" title="Search">
            <i className="bx bx-search-alt"></i>
          </li>
          <li className="nav-items nav-item-logo" title="Categories">
            <i className="bx bx-category-alt"></i>
          </li>
          <li className="nav-items nav-item-logo" title="Explore">
            <i className="bx bx-compass"></i>
          </li>
          <li
            className="nav-items nav-item-logo"
            onClick={screenModeToggle}
            title="Theme"
          >
            {darkMode ? (
              <i className="bx bx-moon"></i>
            ) : (
              <i className="bx bx-sun"></i>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
