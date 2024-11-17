import axios from 'axios';
import React, { useState , useEffect } from 'react'

const Neo = () => {
    const [neObjects, setneObjects] = useState(null);
    const apiKey = process.env.REACT_APP_NASA_API_KEY;

    const FatchNeoData = async () => {
        try {
            const response = await axios.get(
                `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`
            );
            setneObjects(response.data);
        } catch (error) {
            console.error('Error fetching NEO data:', error)
        }
    }
    useEffect(() => {
      FatchNeoData();
    }, [])
    

    return (
        <>
            <div className="neo-container">
                {
                    neObjects && neObjects.near_earth_objects && (
                        <div className="ast-contain">
                            <div className="neo-fact">
                                <h2>Asteroids Nearby</h2>
                                <p>Check out the nearest asteriod to Earth!</p>
                            </div>
                            <div className="ast-base-contain">
                                {
                                    Object.values(neObjects.near_earth_objects)
                                    .flat().map((element)=>(
                                        <div key={element.id} className="ast-details">
                                            <h3 className="ast-heading">
                                                {element.name}
                                            </h3>
                                            <p className="ast-p">
                                                Estimated Diameter: 
                                                <span className='ast-span'>
                                                    {element.estimated_diameter.kilometers.estimated_diameter_min} Km- {
                                                        element.estimated_diameter.kilometers.estimated_diameter_max
                                                    } Km
                                                    </span>
                                            </p>
                                            <p className="ast-p">
                                                Close Approach Date:
                                                <span className="ast-span">
                                                    {element.close_approach_data[0]?.close_approach_date_full }
                                                </span>
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Neo;
