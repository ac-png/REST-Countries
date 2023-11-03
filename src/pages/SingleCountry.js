import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Spinner, Image, Dropdown } from "react-bootstrap";

const SingleCountry = () => {
    let { name } = useParams();

    const apiKey = 'PXfAC8GxmippAeSgmYc20Du6lGzdxAX2';

    const [country, setCountry] = useState(null);
    const [cityList, setCityList] = useState(null);

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((response) => {
                const countryData = response.data[0];
                setCountry(countryData);

                const countryCca2 = countryData.cca2;
                axios
                    .get(`https://dataservice.accuweather.com/locations/v1/cities/${countryCca2}?apikey=${apiKey}`)
                    .then((cityResponse) => {
                        console.log(cityResponse.data);
                        setCityList(cityResponse.data);
                    })
                    .catch((cityError) => {
                        console.log(cityError);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [name, apiKey]);

    if (!country || cityList === null) {
        return <Spinner animation="grow" />;
    }

    return (
        <>
            <Row className="m-4">
                <Col>
                    <Image style={{ height: '200px' }} src={country?.flags?.png} />
                </Col>
                <Col>
                    <h2 className="fw-bolder mb-4">{country.name?.common}</h2>
                    <p><b>Official Name: </b>{country.name?.official}</p>
                    <p><b>Population: </b>{country.population}</p>
                    <p><b>Region: </b>{country.region}</p>
                    <p><b>Subregion: </b>{country.subregion}</p>
                    <p><b>Capital: </b>{country.capital}</p>
                    <p style={{ float: 'left' }}>
                        <b>Weather in City: </b>
                        <Dropdown style={{ float: 'right', marginLeft: '10px' }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Cities
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {cityList.map((city, i) => (
                                    <Col key={i}>
                                        <Dropdown.Item key={i}>{city.EnglishName}</Dropdown.Item>
                                    </Col>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default SingleCountry;