import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const FeaturedSection = () => {
  const [apod, setApod] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [asteroidFact, setAsteroidFact] = useState(null);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const apiKey = process.env.REACT_APP_NASA_API_KEY;
  const photosPerPage = 4;

  // Fetch Astronomy Picture of the Day (APOD)
  const fetchAPOD = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      setApod(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  // Fetch Mars Rover Photos
  const fetchMarsPhotos = async (page) => {
    try {
      setLoading(true);
      const sol = 1000;
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&page=${page + 1}&api_key=${apiKey}`
      );
      setMarsPhotos(response.data.photos || []);
      setTotalPhotos(response.data.photos.length);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Asteroid Facts
  const fetchAsteroidFact = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`
      );
      setAsteroidFact(response.data);
    } catch (error) {
      console.error("Error fetching asteroid data:", error);
    }
  };

  // Fetch data on mount and page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAPOD();
      await fetchMarsPhotos(currentPage);
      await fetchAsteroidFact();
      setLoading(false);
    };
    fetchData();
  }, [currentPage, apiKey]);

  // Handle pagination page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Photos to display for the current page
  const displayPhotos = marsPhotos.slice(
    currentPage * photosPerPage,
    currentPage * photosPerPage + photosPerPage
  );

  return (
    <div className="featured-section">
      {loading && <p>Loading...</p>}

      {/* Astronomy Picture of the Day */}
      {apod && (
        <div className="apod">
          <h2>Astronomy Picture of the Day</h2>
          <h3>{apod.title}</h3>
          <img src={apod.url} alt={apod.title} />
          <p>{apod.explanation}</p>
        </div>
      )}

      {/* Mars Rover Photos with Pagination */}
      {marsPhotos.length > 0 && (
        <div className="mars-photos">
          <h2>Mars Rover Photos</h2>
          <div className="carousel">
            {displayPhotos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <img src={photo.img_src} alt="Mars Rover" />
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(totalPhotos / photosPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}

      {/* Asteroid Facts */}

      {asteroidFact && asteroidFact.near_earth_objects && (
        <div className="asteroid-fact">
          <h2>Asteroids Nearby</h2>
          <p>Check out the nearest asteroid to Earth!</p>
          <div className="astroid-contain">
            {Object.values(asteroidFact.near_earth_objects).flat().map((asteroid) => (
              <div key={asteroid.id} className="asteroid-details">
                <h3 className='ast-heading'>{asteroid.name}</h3>
                <p className='ast-dia'><strong>Estimated Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km</p>//
                <p className='ast-dia'><strong>Close Approach Date:</strong> {asteroid.close_approach_data[0]?.close_approach_date_full}</p>
                <p className='ast-dia'><strong>Miss Distance:</strong> {asteroid.close_approach_data[0]?.miss_distance.kilometers} km</p>
                <p className='ast-dia'><strong>Velocity:</strong> {asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour} km/h</p>
                <p className='ast-dia'><strong>Is Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                <a href={asteroid.nasa_jpl_url} className='ast-btn' target="_blank" rel="noopener noreferrer">More Info</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedSection;
