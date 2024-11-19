import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Neo = () => {
  const [neObjects, setneObjects] = useState(null);
  const apiKey = process.env.REACT_APP_NASA_API_KEY;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const fetchNeoData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`
      );
      setneObjects(response.data);
    } catch (error) {
      console.error("Error fetching NEO data:", error);
    }
  };

  useEffect(() => {
    fetchNeoData();
  }, []);

  if (!neObjects || !neObjects.near_earth_objects) {
    return <div>Loading...</div>;
  }

  // Flatten the near_earth_objects into a single array
  const neoArray = Object.values(neObjects.near_earth_objects).flat();

  // Paginate the flattened array
  const offset = currentPage * itemsPerPage;
  const currentItems = neoArray.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(neoArray.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="neo-container">
        <div className="paginated-cards">
          <div className="ast-contain">
            <div className="neo-fact">
              <h2>Asteroids Nearby</h2>
              <p>Check out the nearest asteroid to Earth!</p>
            </div>
            <div className="ast-base-contain">
              {currentItems.map((element) => (
                <div key={element.id} className="ast-details">
                  <h3 className="ast-heading">{element.name}</h3>
                  <p className="ast-p">
                    Estimated Diameter:
                    <span className="ast-span">
                      {
                        element.estimated_diameter.kilometers
                          .estimated_diameter_min
                      }{" "}
                      Km -{" "}
                      {
                        element.estimated_diameter.kilometers
                          .estimated_diameter_max
                      }{" "}
                      Km
                    </span>
                  </p>
                  <p className="ast-p">
                    Close Approach Date:
                    <span className="ast-span">
                      {
                        element.close_approach_data[0]?.close_approach_date_full
                      }
                    </span>
                  </p>
                  <p className="ast-p">
                    Miss Distance:
                    <span className="ast-span">
                      {
                        element.close_approach_data[0]?.miss_distance
                          .kilometers
                      }{" "}
                      Km
                    </span>
                  </p>
                  <p className="ast-p">
                    Velocity:
                    <span className="ast-span">
                      {
                        element.close_approach_data[0]?.relative_velocity
                          .kilometers_per_hour
                      }{" "}
                      Km/h
                    </span>
                  </p>
                  <p className="ast-p">
                    Is Potentially Hazardous:
                    <span className="ast-span">
                      {element.is_potentially_hazardous_asteroid
                        ? "Yes"
                        : "No"}
                    </span>
                  </p>
                  <a
                    href={element.nasa_jpl_url}
                    className="ast-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Info
                  </a>
                </div>
              ))}
            </div>
          </div>
          <ReactPaginate
            previousLabel={<i className='bx bx-left-arrow-alt'></i>}
            nextLabel={<i className='bx bx-right-arrow-alt'></i>}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default Neo;
