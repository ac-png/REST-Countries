import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
