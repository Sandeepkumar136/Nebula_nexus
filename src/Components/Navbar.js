import React, { useEffect, useState } from "react";
import DialogueBox from "./Dialog/DialogueBox";
import DialogueContents from "./Dialog/DialogueContents";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);


  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkmode");
    return savedTheme === "true";
  });
  // Sidebar

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  // Dark Mode

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

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

  return (
    <div>
      <nav className='nav'>
        <div className="nav-toggle">
          <div className="logo">
            <Link to="/" className="logo-title">Nebula Nexus</Link>
          </div>
          <i id="toggle-btn" onClick={toggleSidebar} className="bx bx-chevron-right"></i>
        </div>
        <ul className="nav-list">
          <li
            className="nav-items nav-item-logo"
            onClick={handleOpenDialog}
            title="Search"
          >
            <i className="bx bx-search-alt"></i>
          </li>
          <li className="nav-items nav-item-logo" title="Categories">
            <i className="bx bx-category-alt"></i>
          </li>
          <li className="nav-items nav-item-logo" title="Explore">
            <i className="bx bx-compass"></i>
          </li>
          <li
            className="nav-items nav-item-logo" id="theme"
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

      <aside className={`sidebar ${isSidebarOpen ? 'collapsed' : ''}`}>
        <div className="sidebar-top">
          <div className="logo-side">
            <Link to='/' onClick={toggleSidebar} className="logo-title-side">Nebula Nexus</Link>
            <i id="toggle-btn" onClick={toggleSidebar} className="bx bx-chevron-left"></i>
          </div>
          <ul className="sidebar-items">
            <Link to="/apod" className="sidebar-list" onClick={toggleSidebar}>Astronomy Picture of the Day</Link>
            <Link to='/marsrover' className="sidebar-list" onClick={toggleSidebar}>Mars Rover Photos</Link>
            <Link to='/asteroidnearearth' className="sidebar-list" onClick={toggleSidebar}>Asteroids Near Earth</Link>
            <Link to='/spacemission' className="sidebar-list" onClick={toggleSidebar}>Space Missions</Link>
            <Link to='exoplanets' className="sidebar-list" onClick={toggleSidebar}>Exoplanets Exploration</Link>
            <Link to='/donki' className="sidebar-list" onClick={toggleSidebar}>DONKI</Link>
          </ul>
        </div>
        <div className="bottom-sidebar">
          <li className="side-bottom-items" onClick={()=>{handleOpenDialog(); toggleSidebar()}}>
            <i className="bx bx-search-alt"></i>
          </li>
          <li className="side-bottom-items">
            <i className="bx bx-category-alt"></i>
          </li>
          <li className="side-bottom-items">
            <i className="bx bx-compass"></i>
          </li>
          <li id="theme" className="side-bottom-items" onClick={()=> {screenModeToggle(); toggleSidebar();}} >
          {darkMode ? (
              <i className="bx bx-moon"></i>
            ) : (
              <i className="bx bx-sun"></i>
            )}          </li>
        </div>
      </aside>

      <DialogueBox isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <DialogueContents />
      </DialogueBox>
    </div>
  );
};

export default Navbar;
