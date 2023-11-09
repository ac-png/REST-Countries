import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Navigation from './components/Navigation';

import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import Region from './pages/Region';
import PageNotFound from "./pages/PageNotFound";
import Weather from "./pages/Weather";

const App = () => {  
  return (
    <Router>
      <>
        <Row>
          <Col>
            <Navigation />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/country/:name' element={<SingleCountry />} />
              <Route path='/region/:regionName' element={<Region />} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='/city/:englishName/:Key' element={<Weather />} />
            </Routes>
          </Col>
        </Row>
      </>
    </Router>
  );
}

export default App;
