import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Row, Col, Spinner, Image } from "react-bootstrap";

const SingleCountry = () => {
    let { name } = useParams();

    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
            console.log(response.data[0]);
            setCountry(response.data[0])
        })
        .catch((error) => {
        console.log(error);
        });
    }, []);

    if (!country) {
        return (
            <Spinner animation="grow" />
        );
    }

    return (
        <Row className="m-4">
            <Col>
                <Image style={{ height: '200px' }}  src={country.flags.png} />
            </Col>
            <Col>
                <h2 className="fw-bolder mb-4">{country.name.common}</h2>
                <p><b>Official Name: </b>{country.name.official}</p>
                <p><b>Population: </b>{country.population}</p>
                <p><b>Region: </b>{country.region}</p>
                <p><b>Subregion: </b>{country.subregion}</p>
                <p><b>Capital: </b>{country.capital}</p>
            </Col>
        </Row>
    );
}

export default SingleCountry;