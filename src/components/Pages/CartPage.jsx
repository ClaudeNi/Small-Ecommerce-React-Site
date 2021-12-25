import React from "react";
import CartDetails from "../CartDetails/CartDetails";
import Btn from "../Btn/Btn";
import niStore from "../../api/niStore";
import Spinner from "../Spinner/Spinner";

class CartPage extends React.Component {
    state = { cart: [], price: 0, spinner: false, bought: false, cantBuy: false };

    componentDidMount() {
        this.grabCartDetails();
    }

    displayCart = () => {
        return this.state.cart.map((item, i) => {
            return (
                <CartDetails
                    key={i}
                    gameId={item.id}
                    name={item.name}
                    counter={item.counter}
                    price={item.price}
                    imgUrl={item.imgUrl}
                    increaseHandle={this.handleIncrease}
                    decreaseHandle={this.handleDecrease}
                    deleteHandle={this.handleDelete}
                />
            );
        });
    };

    displayPrice = () => {
        let sum = 0;
        for (let game of this.state.cart) {
            for (let i = 0; i < game.counter; i++) {
                sum += +game.price;
            }
        }
        return <div>Price: {sum} &#8362;</div>;
    };

    grabCartDetails = () => {
        const cart = window.localStorage.getItem("cart").split(",");
        const cartCounter = {};
        for (let item of cart) {
            if (cartCounter[item] === undefined) {
                cartCounter[item] = 0;
            }
            cartCounter[item]++;
        }
        this.fetchGameData(Object.keys(cartCounter), cartCounter);
    };

    fetchGameData = async (ids, counters) => {
        this.setState({ spinner: true });
        try {
            const gamesData = await niStore.get(`games`);
            const filteredList = [];
            let index = 0;
            for (let game of gamesData.data) {
                for (let item of ids) {
                    if (game.id === item) {
                        filteredList.push(game);
                        filteredList[index].counter = counters[item];
                        index++;
                        continue;
                    }
                }
            }
            this.setState({ cart: filteredList, spinner: false });
        } catch (e) {
            console.log(e);
        }
    };

    handleIncrease = (id) => {
        const gameIndex = this.state.cart.findIndex((game) => game.id === id);
        const newCart = [...this.state.cart];
        newCart[gameIndex].counter++;
        this.setState({ cart: newCart });
        setTimeout(() => {
            this.updateCart();
        }, 0);
    };

    handleDecrease = (id) => {
        const gameIndex = this.state.cart.findIndex((game) => game.id === id);
        const newCart = [...this.state.cart];
        newCart[gameIndex].counter--;
        if (newCart[gameIndex].counter === 0) {
            this.handleDelete(id);
        } else {
            this.setState({ cart: newCart });
        }
        setTimeout(() => {
            this.updateCart();
        }, 0);
    };

    handleDelete = (id) => {
        const gameIndex = this.state.cart.findIndex((game) => game.id === id);
        const newCart = [...this.state.cart];
        newCart.splice(gameIndex, 1);
        this.setState({ cart: newCart });
        setTimeout(() => {
            this.updateCart();
        }, 0);
    };

    updateCart = () => {
        const myStorage = window.localStorage;
        const oldCart = [...this.state.cart];
        const newCart = [];
        for (let game of oldCart) {
            for (let i = 0; i < game.counter; i++) {
                newCart.push(game.id);
            }
        }
        myStorage.setItem("cart", newCart);
    };

    handleBuy = () => {
        if (this.state.cart.length !== 0) {
            this.setState({ cart: [], bought: true });
            window.localStorage.setItem("cart", []);
        } else {
            this.setState({cantBuy: true, bought: false})
        }
    };

    render() {
        if (this.state.spinner) {
            return <Spinner />;
        }
        return (
            <div className="cart-page">
                <h1>Cart</h1>
                {this.displayCart()}
                <div className="cart-bottom">
                    <Btn text="Buy now" clickHandle={this.handleBuy} />
                    {this.displayPrice()}
                </div>
                {this.state.bought && <div> Thank you for buying!</div>}
                {this.state.cantBuy && <div> You have nohting in your cart!</div>}
            </div>
        );
    }
}

export default CartPage;
