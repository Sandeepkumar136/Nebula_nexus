import React, { useState } from "react";
import axios from "axios";
import ImageResults from "./ImageResults";
import MarsRoverResult from "./MarsRoverResult";
import AsteroidResults from "./AsteroidResults";
import ExoplanetResults from "./ExoplanetResults";
import ApodResult from "./ApodResult";
import AstrobiologyResults from "./AstrobiologyResults";
import WorldWindResults from "./WorldWindResults";

const DialogueContents = () => {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("images");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_NASA_API_KEY;

  const fetchData = async () => {
    if (!query.trim()) return; // Prevent API call if the query is empty
    setLoading(true);
    setError(""); // Clear previous errors
    setResults([]); // Clear previous results
    let endpoint = "";

    try {
      switch (tab) {
        case "images":
          endpoint = `https://images-api.nasa.gov/search?q=${query}`;
          break;
        case "marsRover":
          endpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${query}&api_key=${API_KEY}`;
          break;
        case "asteroids":
          endpoint = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${query}&end_date=${query}&api_key=${API_KEY}`;
          break;
        case "exoplanets":
          endpoint = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_orbper&where=pl_name+like+'%${query}%'`;
          break;
        case "apod":
          endpoint = `https://api.nasa.gov/planetary/apod?date=${query}&api_key=${API_KEY}`;
          break;
        case "astrobiology":
          endpoint = `https://api.nasa.gov/astrobiology?search=${query}&api_key=${API_KEY}`;
          break;
        case "worldWind":
          setLoading(false);
          setResults([]);
          return; // No data fetching needed for World Wind
        default:
          throw new Error("Invalid tab selection");
      }

      const response = await axios.get(endpoint);

      // Handle results based on the tab
      switch (tab) {
        case "images":
          setResults(response.data.collection?.items || []);
          break;
        case "marsRover":
          setResults(response.data.photos || []);
          break;
        case "asteroids":
          setResults(response.data.near_earth_objects[query] || []);
          break;
        case "exoplanets":
          setResults(response.data || []);
          break;
        case "apod":
          setResults([response.data]); // APOD returns a single object
          break;
        case "astrobiology":
          setResults(response.data || []);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="dia-heading">Search Now</h2>
      <div className="search-contain">
        <input
          type="text"
          placeholder={`Enter ${
            tab === "images"
              ? "keywords"
              : tab === "marsRover"
              ? "Earth date (YYYY-MM-DD)"
              : tab === "asteroids"
              ? "start date (YYYY-MM-DD)"
              : tab === "apod"
              ? "date (YYYY-MM-DD)"
              : "search query"
          }`}
          name="search"
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchData} disabled={loading || !query}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="dia-tab-contain">
        <button onClick={() => setTab("images")}>NASA Images</button>
        <button onClick={() => setTab("marsRover")}>Mars Rover</button>
        <button onClick={() => setTab("asteroids")}>Asteroids</button>
        <button onClick={() => setTab("exoplanets")}>Exoplanets</button>
        <button onClick={() => setTab("apod")}>APOD</button>
        <button onClick={() => setTab("astrobiology")}>Astrobiology</button>
        <button onClick={() => setTab("worldWind")}>World Wind</button>
      </div>

      {/* Render results */}
      {tab === "images" && <ImageResults results={results} />}
      {tab === "marsRover" && <MarsRoverResult results={results} />}
      {tab === "asteroids" && <AsteroidResults results={results} />}
      {tab === "exoplanets" && <ExoplanetResults results={results} />}
      {tab === "apod" && <ApodResult results={results} />}
      {tab === "astrobiology" && <AstrobiologyResults results={results} />}
      {tab === "worldWind" && <WorldWindResults />}
    </>
  );
};

export default DialogueContents;
