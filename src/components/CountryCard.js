import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CountryCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/country/${props.name}`} style={{ textDecoration: 'none' }}>
            <Card
                className="d-flex flex-column justify-content-between h-100 border-0"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                style={{
                    boxShadow: isHovered ? '0 4px 8px 0 rgba(0,0,0,0.2)' : 'none'
                }}
            >
                <Card.Img src={props.flag} style={{ height: '150px' }} className='rounded-0 rounded-top' />

                <Card.Body className="flex-grow-0">
                    <Card.Text>
                        <b>{props.name}</b>
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <b>Population:&nbsp;</b>
                        {props.population.toLocaleString()}
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <b>Capital:&nbsp;</b>
                        {props.capital}
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <b>Region:&nbsp;</b>
                        {props.region}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default CountryCard;
