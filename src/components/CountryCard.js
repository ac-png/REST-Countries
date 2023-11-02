import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CountryCard = (props) => {
    return (
        <Card className="d-flex flex-column justify-content-between h-100 p-3 border-opacity-10 shadow-sm rounded-0">
            <Card.Img src={props.flag} className="rounded-5" />

            <Card.Body className="flex-grow-0">
                <Card.Text>
                    <b>
                        <Link className="text-decoration-none text-reset" to={`/country/${props.name}`}>
                            {props.name}
                        </Link>
                    </b>
                </Card.Text>
                <Card.Text className="mb-0">
                    <b>Population:&nbsp;</b>
                    {props.population}
                </Card.Text>
                <Card.Text className="mb-0">
                    <b>Region:&nbsp;</b>
                    {props.region}
                </Card.Text>
                <Card.Text className="mb-0">
                    <b>Capital:&nbsp;</b>
                    {props.capital}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;
