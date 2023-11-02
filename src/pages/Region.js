import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import CountryCard from '../components/CountryCard';

const Region = () => {
    const { regionName } = useParams();

    const [region, setRegion] = useState(null);

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/region/${regionName}`)
        .then((response) => {
            console.log(response.data);
            setRegion(response.data)
        })
        .catch((error) => {
        console.log(error);
        });
    }, [regionName]);

    if (!region) {
        return (
            <Spinner animation="grow" />
        );
    }

    return (
        <div className=" bg-light p-4">
            <Row>
                {region.map((country, i) => (
                    <Col key={i} sm={12} md={6} lg={3}>
                        <CountryCard flag={country.flags.png} name={country.name.common} region={country.region} population={country.population} capital={country.capital} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}


export default Region;