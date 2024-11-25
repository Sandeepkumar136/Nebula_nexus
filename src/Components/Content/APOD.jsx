import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const APOD = () => {
  const [apod, setApod] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatDate = (date)=> format(date, "yyyy-MM-dd");
  
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_NASA_API_KEY;
    const fetchApod = async () => {
      try {
        const dateStr = formatDate(selectedDate);
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?date=${dateStr}&api_key=${API_KEY}`
        );
        setApod(response.data);
      } catch (error) {
        console.error("Failed to fetch APOD. Please try again later:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchApod();
  }, [selectedDate]);

  if(loading) return <Loader loading={loading}/>

  return (
    <>

    <div className="apod-contain">
      {
        apod.media_type === 'image' ? (
          <img src={apod.url} className="apod-iframe" alt={apod.title} />
        ): (
          <iframe src={apod.url} frameborder="0" title={apod.title} allowFullScreen className="apod-iframe"></iframe>
        )
      }
      <h1 className="apod-heading">{apod.title}</h1>
      <p className="apod-date">{apod.date}</p>
      <p className="apod-desc">{apod.explanation}</p>
    </div>
    <div className="apod-date-contain">
      <h3 className="date-desc">Select a Date for APOD:</h3>
      <DatePicker className="datepicker" selected={selectedDate} onChange={(date)=> setSelectedDate(date)} dateFormat="yyyy/MM/dd" maxDate={new Date()} />
    </div>
    </>
  )
};

export default APOD;
