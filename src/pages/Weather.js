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
        .get(`http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apiKey}`)
        .then((response) => {
            console.log(response.data);
            setWeather(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container>
            <h1>This is the Weather Page.</h1>
        </Container>
    );
};

export default Weather;
