import React, { useState } from 'react'
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css'

const Forecast = () => {
    const [responseObj, setResponseObj] = useState({});
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('imperial');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault()
        if (city.length === 0) {
            return setError(true)
        }

        setError(false);
        setResponseObj({});
        setLoading(true)


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
            }
        };
        
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)
                setLoading(false)
            })
            .catch(err => {
                setError(true)
                setLoading(false)
                console.error(err)
            });

            console.log(responseObj)
    }

    return <>
    <div className={classes.Outershell}>
    <h2>Find current weather conditions</h2>
    <div>
        <form onSubmit={getForecast}>
            <input
            type="text"
            placeholder='Enter City'
            maxLength='50'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={classes.TextInput}>
            </input>
            <label className={classes.Radio}>
                <input
                type="radio"
                name='units'
                checked={unit === 'imperial'}
                value='imperial'
                onChange={(e) => setUnit(e.target.value)}
                >
                
                </input>
                Imperial
            </label>
            <label className={classes.Radio}>
                <input
                type="radio"
                name="units"
                checked={unit === 'metric'}
                value="metric"
                onChange={(e) => setUnit(e.target.value)}
                >
                    
                </input>
                Metric
            </label>
            <button 
            type="submit"
            className={classes.Button}
            >Get Forecast</button>
        </form>
        <Conditions 
        responseObj={responseObj}
        error={error}
        loading={loading}
        />
    </div>

    </div>
    
    </>
}

export default Forecast;