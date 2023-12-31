import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import CountryCard from '../components/CountryCard';

const Region = () => {
    const { regionName } = useParams();

    const [region, setRegion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/region/${regionName}`)
            .then((response) => {
                const sortedCountries = [...response.data].sort((a, b) => a.name.common.localeCompare(b.name.common));
                setRegion(sortedCountries);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [regionName]);

    if (!region) {
        return <Spinner animation="grow" />;
    }

    const filteredCountries = region.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search for a country"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '50%' }}
                />
            </Form.Group>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {filteredCountries.map((country, i) => (
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

export default Region;
