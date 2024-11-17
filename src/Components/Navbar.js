import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <div className="nav-toggle">
        <div className="logo">
            <span className="logo-title">Nebula nexus</span>
        </div>
        <i id="toggle-btn" class='bx bx-chevron-right'></i>
        </div>
        <ul className="nav-list">
            <li className="nav-items nav-item-logo" title='Search'><i class='bx bx-search-alt' ></i></li>
            <li className="nav-items nav-item-logo" title='Categories'><i class='bx bx-category-alt' ></i></li>
            <li className="nav-items nav-item-logo" title='Explore'><i class="fa-regular fa-compass"></i></li>
            <li className="nav-items nav-item-logo" title='Saved'><i class="bx bx-moon"></i></li>

        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
