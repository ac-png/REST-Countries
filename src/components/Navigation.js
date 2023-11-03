import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const [regions, setRegions] = useState([]);
  const location = useLocation();

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
      <h1 className="display-4 m-4 text-center">REST Countries</h1>
      <Navbar className="mx-5" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Nav.Link>
            {regions.map((region, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  as={Link}
                  to={`/region/${region}`}
                  className={location.pathname === `/region/${region}` ? 'active' : ''}
                >
                  {region}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
