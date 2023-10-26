import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
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
        <Row>
            <Col>
                <Image src={country.flags.png} />
            </Col>
            <Col>
                <p><b>Common Name: </b>{country.name.common}</p>
                <p><b>Official Name: </b>{country.name.official}</p>
                <p><b>Region: </b>{country.region}</p>
                <p><b>Subregion: </b>{country.subregion}</p>
                <p><b>Capital: </b>{country.capital}</p>
                <p><b>Currency: </b>{Object.values(country.currencies)[0].name}</p>
                <p><b>Native Name: </b>{Object.values(country.name.nativeName)[0].common}</p>
            </Col>
        </Row>
    );
}

export default SingleCountry;