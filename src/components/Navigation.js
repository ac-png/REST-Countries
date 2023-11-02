import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countries = response.data;
        const uniqueRegions = [...new Set(countries.map((country) => country.region))].filter(Boolean);
        setRegions(uniqueRegions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="m-4 text-center">REST Countries</h1>
      <Navbar className="mx-5" expand="lg">
        <Link className="nav-link bg-primary p-2 rounded text-bg-primary" to={`/`}>Home</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {regions.map((region, index) => (
                <Link key={index} to={`/region/${region}`} className="nav-link">{region}</Link>
            ))}
          </Nav>  
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default Navigation;
