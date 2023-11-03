import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Spinner, Row } from "react-bootstrap";

import CountryCard from "../components/CountryCard";

const SingleCountry = () => {
    let { name } = useParams();

    const apiKey = 'PXfAC8GxmippAeSgmYc20Du6lGzdxAX2';

    const [country, setCountry] = useState(null);
    const [cityList, setCityList] = useState(null);
    const [borders, setBorders] = useState(null);

    const [hoveredCity, setHoveredCity] = useState(null);
    const handleMouseOver = (cityIndex) => {
        setHoveredCity(cityIndex);
    };
    const handleMouseOut = () => {
        setHoveredCity(null);
    };

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/all`)
            .then((response) => {
                const countryData = response.data.filter((result) => result.name.common == name);
                const borderData = [];
                setCountry(countryData[0]);

                if (countryData[0].borders) {
                    countryData[0].borders.forEach((border) => {
                        borderData.push(response.data.filter((result) => result.cca3 == border))
                    });
    
                    setBorders(borderData);
                } else {
                    setBorders([])
                }

                const countryCca2 = countryData[0].cca2;
                axios
                    .get(`https://dataservice.accuweather.com/locations/v1/cities/${countryCca2}?apikey=${apiKey}`)
                    .then((cityResponse) => {
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
        <Container className="mb-4">
            <h2 className="text-center m-2">{country.flag} {country.name.common} {country.flag}</h2>
            <ul className="mt-4 list-group">
                {country.name?.nativeName &&
                    Object.keys(country.name.nativeName).map(language => {
                    if (language !== 'eng') {
                        const nativeName = country.name.nativeName[language];
                        return (
                            <>
                                <li className="list-group-item"><b>Native Names ({language}):</b>
                                    <ul>
                                        <li>Official: {nativeName.official}</li>
                                        <li>Common: {nativeName.common}</li>
                                    </ul>
                                </li>
                            </>
                    );
                }
                return null;
                })}
                <li className="list-group-item"><b>Top-Level-Domain: </b>{country.tld}</li>
                <li className="list-group-item"><b>Country Codes: </b>{country.cca2}, {country.ccn3}, {country.cioc}</li>
                <li className="list-group-item"><b>Capital: </b>{country.capital[0]}</li>
                <li className="list-group-item"><b>Region: </b> {country.region}</li>
                <li className="list-group-item"><b>Subregion: </b>{country.subregion}</li>
                <li className="list-group-item"><b>Languages: </b>{Object.values(country.languages).join(', ')}</li>
                <li className="list-group-item"><b>Population: </b>~ {country.population} people</li>
                <li className="list-group-item"><b>Area: </b>~ {country.area} square kilometers</li>
                <li className="list-group-item"><b>Currency: </b>{Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</li>
                <li className="list-group-item"><b>Timezones: </b>{country.timezones.join(', ')}</li>
                <li className="list-group-item"><b>Continent: </b>{country.continents.join(', ')}</li>
                <li className="list-group-item"><b>Maps:</b>
                    <ul>
                        <li><b>Google Maps: </b><a href={country.maps.googleMaps}>Open in Google Maps</a></li>
                        <li><b>OpenStreetMaps: </b><a href={country.maps.openStreetMaps}>Open in OpenStreetMaps</a></li>
                    </ul>
                </li>
                
                <li className="list-group-item mb-2"><b>Flag: </b><img className="mt-2 border" style={{ maxHeight: '50px' }} src={country.flags.png} alt="flag" /></li>
                <li className="list-group-item"><b>Geographical Coordinates: </b>
                    <ul>
                        <li><b>{country.name.common}: </b>Latitude {country.latlng[0]}, Longitude {country.latlng[1]}</li>
                        <li><b>{country.capital} (Capital): </b>Latitude {country.capitalInfo.latlng[0]}, Longitude {country.capitalInfo.latlng[1]}</li>
                    </ul>
                </li>
                <li className="list-group-item">
                    <b>Cities: </b>
                    <ul style={{ maxHeight: '200px', overflowY: 'auto' }} className="mt-2 list-group">
                        {cityList && cityList.length > 0 ? (
                            cityList.map((city, i) => (
                                <li
                                className="list-group-item"
                                key={i}
                                onMouseOver={() => handleMouseOver(i)}
                                onMouseOut={handleMouseOut}
                                style={{ backgroundColor: hoveredCity === i ? 'lightblue' : 'transparent' }}
                                ><Link to={`/city/${city.EnglishName}`} className="text-reset text-decoration-none">{city.EnglishName}</Link></li>
                            ))
                        ) : (
                            <p>No cities available</p>
                        )}
                    </ul>
                </li>
            </ul>
            <div className="p-4">
                <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                    {borders.map((borderCountry, i) => (
                        <CountryCard
                            key={i}
                            flag={borderCountry[0].flags.png}
                            name={borderCountry[0].name.common}
                            region={borderCountry[0].region}
                            population={borderCountry[0].population}
                            capital={borderCountry[0].capital}
                        />
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default SingleCountry;