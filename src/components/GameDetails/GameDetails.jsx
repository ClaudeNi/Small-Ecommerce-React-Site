import React from "react";
import "./gameDetails.css";

const GameDetails = (props) => {
    return (
        <div className="game-details-container">
            <img src={props.imgUrl} alt={props.name} />
            <span className="game-details-name">{props.name}</span>
            <span className="game-details-price">{props.price} &#8362;</span>
        </div>
    );
};

export default GameDetails;
