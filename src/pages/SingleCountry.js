import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

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
                
                <li className="list-group-item mb-2"><b>Flag: </b><img className="mt-2 border" style={{ maxHeight: '50px' }} src={country.flags.png} alt="Iceland Flag" /></li>
                <li className="list-group-item"><b>Geographical Coordinates: </b>
                    <ul>
                        <li><b>{country.name.common}: </b>Latitude {country.latlng[0]}, Longitude {country.latlng[1]}</li>
                        <li><b>{country.capital} (Capital): </b>Latitude {country.capitalInfo.latlng[0]}, Longitude {country.capitalInfo.latlng[1]}</li>
                    </ul>
                </li>
            </ul>
        </Container>
    );
};

export default SingleCountry;

// Name: Iceland (Ísland in Icelandic)
// Top-Level Domain: .is
// Country Codes: IS, 352, ISL
// Capital: Reykjavik
// Region: Europe
// Subregion: Northern Europe
// Languages: Icelandic
// Population: Approximately 366,425 people
// Area: 103,000 square kilometers
// Currency: Icelandic króna (ISK), symbolized as "kr"
// Flag: 🇮🇸
// Timezones: UTC
// Continent: Europe
// Google Maps: Iceland Google Maps
// OpenStreetMaps: Iceland OpenStreetMaps
// Coat of Arms: Coat of Arms of Iceland
// Flag Images: Available in PNG and SVG formats: Iceland Flag, Iceland Flag SVG
// Geographical Coordinates:
// Iceland: Latitude 65.0, Longitude -18.0
// Capital Reykjavik: Latitude 64.15, Longitude -21.95
// Postal Code Format: Three digits (e.g., "###")