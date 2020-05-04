import React from "react";
import {Link} from "react-router-dom";
import "../App.css";

function Navbar(){

    return(
        <nav>
            <li><Link to="/">Store</Link></li>
            <li><Link to="/Cart">Cart</Link></li>
            <li> <Link to="/Admin">Admin</Link></li>
            <li> <Link to="/Edit">Edit</Link></li>


        </nav>

    )
}

export default Navbar;
