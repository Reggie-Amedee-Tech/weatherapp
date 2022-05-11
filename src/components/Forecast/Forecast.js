import React, { useState } from 'react'

const Forecast = () => {

    const [responseObj, setResponseObj] = useState({});
    function getForecast() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': '909ed7d47fmsh758052f9d9e6720p16464cjsn5487e271f380'
            }
        };
        
        fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=seattle', options)
            .then(response => response.json())
            .then(response => {
                setResponseObj(response)
            })
            .catch(err => console.error(err));
    }

    return <>
    <h2>Find Current weather conditions</h2>
    <div>
        {JSON.stringify(responseObj)}
        <button onClick={getForecast}>Get Forecast</button>
    </div>
    
    </>
}

export default Forecast;