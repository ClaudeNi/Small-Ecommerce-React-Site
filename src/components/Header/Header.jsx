import React from "react";
import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";
import "./header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <Link to="/">
                    <Btn text="Homepage" classes="header-item" />
                </Link>
                <Link to="/games">
                    <Btn text="Games" classes="header-item" />
                </Link>
            </div>
            <div className="header-right">
                <Link to="/cart">
                    <Btn text="Cart" classes="header-item" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
