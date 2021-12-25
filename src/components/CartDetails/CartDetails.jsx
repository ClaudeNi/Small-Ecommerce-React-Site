import React from "react";
import "./cartDetails.css";

const CartDetails = (props) => {
    return (
        <div className="cart-details">
            <img src={props.imgUrl} alt={props.name} />
            <div className="cart-middle">
                <span className="cart-middle-top">{props.name}</span>
                <div className="cart-middle-bottom">
                    <div className="bottom-left">
                        <span className="sub-title">Quantity</span>
                        <div>
                            <span role={"button"} onClick={() => {props.decreaseHandle(props.gameId)}} className="quantity-left">{"<"}</span>
                            <span>{props.counter}</span>
                            <span role={"button"} onClick={() => {props.increaseHandle(props.gameId)}} className="quantity-right">{">"}</span>
                        </div>
                    </div>
                    <div className="bottom-right">
                        <span className="sub-title">Delete</span>
                        <div>
                            <span role={"button"} onClick={() => {props.deleteHandle(props.gameId)}} className="item-delete">{"x"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-right"></div>
        </div>
    );
};

export default CartDetails;
