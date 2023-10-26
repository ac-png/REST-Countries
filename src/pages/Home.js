import axios from "axios";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import CountryCard from '../components/CountryCard';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
            console.log(response.data);
            setCountriesList(response.data)
        })
        .catch((error) => {
        console.log(error);
        });
    }, []);

    let countriesCards = countriesList.map((country, i) => {
        return <CountryCard key={i} flag={country.flags.png} name={country.name.official} region={country.region} />
    });

    return (
        <Row md={3} xs={1}>
            {countriesCards}
        </Row>
    );
}

export default Home;
