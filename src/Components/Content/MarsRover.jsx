import axios from "axios";
import React, { useState } from "react";

const MarsRover = () => {
  const [rover, setRover] = useState("curiosity");
  const [date, setDate] = useState("");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = true;
  const API_KEY = process.env.REACT_APP_NASA_API_KEY;
  const Items_par_page = 25;

  const fetchPhotos = async (page = 1) => {
    setLoading(true);
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
    const params = {
      earth_date: date,
      camera: camera || undefined,
      page,
      api_key: API_KEY,
    };
    try {
      const response = await axios.get(url, {params});
      const data= response.data.photos;
      setPhotos(data);
      setPhotos(Math.ceil(data.length / Items_par_page));
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }finally{
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = (e) =>{
    e.preventDefault();
    if(!date){
      alert("please select a date");
      return;
    }
    fetchPhotos(1);
    setCurrentPage(0);
  }

  // Handle Page Change for Pagination
  const handlePageChange = ({selected})=>{
    const nextPage = selected +1;
    setCurrentPage(selected);
    fetchPhotos(nextPage);
  };

  return (
    <>
    <div className="Search-contain-mars">
      <h1>Mars Rover Photo Viewer</h1>
      <form className="mars-form" onSubmit={handleSearch} >
        <label htmlFor=""></label>

      </form>
    </div>
    </>
  );
};

export default MarsRover;
