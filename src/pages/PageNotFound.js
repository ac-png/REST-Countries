import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const PageNotFound = () => {

    let location = useLocation();

    return (
        <Container>
            <h1 className='mt-5 text-center fw-bolder text-danger display-1'>Sorry, 404 the page {location.pathname} was not found</h1>
        </Container>
    );
};

export default PageNotFound;