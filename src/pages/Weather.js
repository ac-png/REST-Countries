import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Weather = () => {
    let { englishName, Key } = useParams();
    const apiKey = 'PXfAC8GxmippAeSgmYc20Du6lGzdxAX2';

    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${Key}?apikey=${apiKey}&details=true&metric=true`)
            .then((response) => {
                setWeather(response.data.DailyForecasts[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Container>
            <h1>{englishName} - Weather Details</h1>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li>Temperature: {weather.Temperature?.Minimum?.Value}°{weather.Temperature?.Minimum?.Unit} - {weather.Temperature?.Maximum?.Value}°{weather.Temperature?.Minimum?.Unit}</li>
                            <li>Weather: {weather.Day?.IconPhrase}</li>
                            <li>Wind Speed: {weather.Day?.Wind?.Speed?.Value} {weather.Day?.Wind?.Speed?.Unit}</li>
                            <li>Cloud Cover: {weather.Day?.CloudCover}%</li>
                        </ul>
                    </Card.Text>
                    <Card.Title>Air and Pollen</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Air Quality: {weather?.AirAndPollen && weather.AirAndPollen.find(item => item.Name === 'AirQuality')?.Category}</li>
                            <li>Mold: {weather?.AirAndPollen && weather.AirAndPollen.find(item => item.Name === 'Mold')?.Category}</li>
                            <li>UV Index: {weather?.AirAndPollen && weather.AirAndPollen.find(item => item.Name === 'UVIndex')?.Category}</li>
                        </ul>
                    </Card.Text>
                    <Card.Title>Probabilities</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Precipitation: {weather?.Day?.PrecipitationProbability}%</li>
                            <li>Thunderstorm: {weather?.Day?.ThunderstormProbability}%</li>
                            <li>Rain: {weather?.Day?.RainProbability}%</li>
                            <li>Snow: {weather?.Day?.SnowProbability}%</li>
                            <li>Ice: {weather?.Day?.IceProbability}%</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Weather;
