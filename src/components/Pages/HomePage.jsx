import React from "react";

class HomePage extends React.Component {

    componentDidMount() {
        const myStorage = window.localStorage;
        if (myStorage.cart === undefined) {
            myStorage.setItem("cart", []);
        }
    }

    render() {
    return <div>Welcome to Ni Store</div>
    }
};

export default HomePage;
