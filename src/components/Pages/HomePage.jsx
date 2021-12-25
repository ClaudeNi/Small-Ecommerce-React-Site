import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    componentDidMount() {
        const myStorage = window.localStorage;
        if (myStorage.cart === undefined) {
            myStorage.setItem("cart", []);
        }
    }

    render() {
        return (
            <div className="homepage">
                <span className="title">Welcome to Ni Store</span>
                <Link to="/games">
                    <img
                        src="https://cdn.discordapp.com/attachments/905481762925338714/924400295214202900/homepage.jpg"
                        alt="advertisement cover"
                    />
                </Link>
            </div>
        );
    }
}

export default HomePage;
