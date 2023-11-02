import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const CountryCard = (props) => {
    return (
        <Card style={{ height: '300px' }} className="border border-0 rounded-0 p-3 shadow-sm m-2">
            <Card.Img src={props.flag} className="rounded-5" />
            <Card.Body>
                <Card.Text><b><Link className="text-decoration-none text-reset" to={`/country/${props.name}`}>{props.name}</Link></b></Card.Text>
                <Card.Text className="mb-0"><b>Population:&nbsp;</b>{props.population}</Card.Text>
                <Card.Text className="mb-0"><b>Region:&nbsp;</b>{props.region}</Card.Text>
                <Card.Text className="mb-0"><b>Capital:&nbsp;</b>{props.capital}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CountryCard;
