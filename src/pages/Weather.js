import { Container } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Weather = () => {
    let { englishName, Key } = useParams();
    const apiKey = 'PXfAC8GxmippAeSgmYc20Du6lGzdxAX2';

    const [weather, setWeather] = useState([]);

    useEffect(() => {
        axios
        .get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${Key}?apikey=${apiKey}&details=true`)
        .then((response) => {
            console.log(response.data.DailyForecasts[0]);
            setWeather(response.data.DailyForecasts[0]);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container>
            <h1>{weather.Date}</h1>
        </Container>
    );
};

export default Weather;
