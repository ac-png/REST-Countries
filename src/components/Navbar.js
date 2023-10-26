import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Navbar = () => {
    return (
        <Link to="/"><Button className="m-3" as="input" type="button" value="Home" /></Link>
    );
}

export default Navbar;
