import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedSection = () => {
  const [apod, setApod] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [asteroidFact, setAsteroidFact] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const apiKey = process.env.REACT_APP_NASA_API_KEY; // Get API key from the environment variable

  // Fetch APOD (Astronomy Picture of the Day)
  const fetchAPOD = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      setApod(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  // Fetch Mars Rover Photos (Perseverance Rover photos)
  const fetchMarsPhotos = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=1000&api_key=${apiKey}`);
      setMarsPhotos(response.data.photos || []);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
    }
  };

  // Fetch Asteroid Facts (Near-Earth Objects data)
  const fetchAsteroidFact = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`);
      setAsteroidFact(response.data);
    } catch (error) {
      console.error("Error fetching asteroid data:", error);
    }
  };

  // UseEffect to fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      await fetchAPOD();
      await fetchMarsPhotos();
      await fetchAsteroidFact();
      setLoading(false); // Set loading to false once all data is fetched
    };
    fetchData();
  }, [apiKey]); // Make sure the effect is triggered when the apiKey changes

  return (
    <div className="featured-section">
      {/* Show loading indicator if data is being fetched */}
      {loading && <p>Loading...</p>}

      {/* APOD: Astronomy Picture of the Day */}
      {apod && (
        <div className="apod">
          <h2>Astronomy Picture of the Day</h2>
          <h3>{apod.title}</h3>
          <img src={apod.url} alt={apod.title} />
          <p>{apod.explanation}</p>
        </div>
      )}

      {/* Mars Rover Photos */}
      {marsPhotos.length > 0 && (
        <div className="mars-photos">
          <h2>Mars Rover Photos</h2>
          <div className="carousel">
            {marsPhotos.slice(0, 5).map((photo) => (
              <img key={photo.id} src={photo.img_src} alt="Mars Rover" />
            ))}
          </div>
        </div>
      )}

      {/* Fun Space Facts or Asteroids Nearby */}
      {asteroidFact && asteroidFact.near_earth_objects && (
        <div className="asteroid-fact">
          <h2>Asteroids Nearby</h2>
          <p>Check out the nearest asteroid to Earth!</p>
          {Object.values(asteroidFact.near_earth_objects).flat().map((asteroid) => (
            <div key={asteroid.id} className="asteroid-details">
              <h3>{asteroid.name}</h3>
              <p><strong>Estimated Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km</p>
              <p><strong>Close Approach Date:</strong> {asteroid.close_approach_data[0]?.close_approach_date_full}</p>
              <p><strong>Miss Distance:</strong> {asteroid.close_approach_data[0]?.miss_distance.kilometers} km</p>
              <p><strong>Velocity:</strong> {asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour} km/h</p>
              <p><strong>Is Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
              <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedSection;
