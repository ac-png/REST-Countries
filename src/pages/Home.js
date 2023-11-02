import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import CountryCard from '../components/CountryCard';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10; // Number of items per page

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/all??per_page=${perPage}&page=${currentPage}`)
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
        <div className="bg-light p-2">
            <Row>
                {countriesList.map((country, i) => (
                    <Col key={i} sm={12} md={6} lg={3}>
                        <CountryCard flag={country.flags.png} name={country.name.common} region={country.region} population={country.population} capital={country.capital} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
