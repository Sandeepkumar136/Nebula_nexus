import React from 'react'
import FeaturedSection from './FeaturedSection';

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="home-middle-contain">
        <h3 className="heading-main">
        Explore the Cosmos with NASA.
        </h3>
        <button type="button" className="main-btn">Explore</button>
        </div>
      </div>
      <FeaturedSection/>
    </div>
  )
}

export default Home;
