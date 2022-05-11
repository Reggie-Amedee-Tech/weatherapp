import React, { useState } from 'react'
import Conditions from '../Conditions/Conditions';

const Forecast = () => {
    const [responseObj, setResponseObj] = useState({});
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('imperial');

    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault()
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': '909ed7d47fmsh758052f9d9e6720p16464cjsn5487e271f380'
            }
        };
        
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, options)
            .then(response => response.json())
            .then(response => {
                setResponseObj(response)
            })
            .catch(err => console.error(err));

            console.log(responseObj)
    }

    return <>
    <h2>Find Current weather conditions</h2>
    <div>
        <form onSubmit={getForecast}>
            <input
            type="text"
            placeholder='Enter City'
            maxLength='50'
            value={city}
            onChange={(e) => setCity(e.target.value)}>
            </input>
            <label>
                <input
                type="radio"
                name='units'
                checked={unit === 'imperial'}
                value='imperial'
                onChange={(e) => setUnit(e.target.value)}>
                </input>
            </label>
            <label>
                <input
                type="radio"
                name="units"
                checked={unit === 'metric'}
                value="metric"
                onChange={(e) => setUnit(e.target.value)}>
                </input>
            </label>
            <button type="submit">Get Forecast</button>
        </form>
        <Conditions responseObj={responseObj}/>
    </div>

    
    
    </>
}

export default Forecast;