import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import CountryCard from '../components/CountryCard';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
            setCountriesList(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
    <div className="bg-light p-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {countriesList.map((country, i) => (
                <Col key={i}>
                    <CountryCard
                        flag={country.flags.png}
                        name={country.name.common}
                        region={country.region}
                        population={country.population}
                        capital={country.capital}
                    />
                </Col>
            ))}
        </Row>
    </div>
    );
}

export default Home;
