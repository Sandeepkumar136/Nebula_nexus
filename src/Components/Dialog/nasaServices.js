import axios from "axios";

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

const fetchImageSearch = async (query) => {
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
    return response.data.collection.items || [];
}

const fetchAPOD = async () => {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    return [{ type: 'APOD', ...response.data }];
};

const fetchMarsRoverPhotos = async (query) => {
    const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${query}&api_key=${API_KEY}`
    );
    return response.data.photos || [];
};

const fetchEarthImagery = async (lat, lon) => {
    const response = await axios.get(
        `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.1&api_key=${API_KEY}`
    );
    return [{ type: 'Earth', ...response.data }];
};

const fetchExoplanets = async () => {
    const response = await axios.get(`https://api.nasa.gov/techtransfer/patent/?q=10&api_key=${API_KEY}`);
    return response.data.results || [];
};

export { fetchImageSearch, fetchAPOD, fetchMarsRoverPhotos, fetchEarthImagery, fetchExoplanets };