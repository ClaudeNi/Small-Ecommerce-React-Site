import React from "react";
import Btn from "../Btn/Btn";
import "./gameInputForm.css";

class GameInputForm extends React.Component {
    nameRef = React.createRef();
    ratingRef = React.createRef();
    priceRef = React.createRef();
    imgUrlRef = React.createRef();
    quantityRef = React.createRef();

    inputHandle = ({ target: { value } }, type) => {
        this.props.changeInputsState(value, type);
    };

    handleButton1 = (inputRefs) => {
        this.props.handleButton1(inputRefs);
        this.clearInputs();
    };

    handleButton2() {
        this.props.handleButton2();
        this.clearInputs();
    }

    clearInputs = () => {
        this.props.clearInputs();
    };

    render() {
        const inputRefs = [
            [this.nameRef.current, "name"],
            [this.ratingRef.current, "rating"],
            [this.priceRef.current, "price"],
            [this.imgUrlRef.current, "imgUrl"],
            [this.quantityRef.current, "quantity"],
        ];
        return (
            <div className="input-container">
                <div className="input-item">
                    Name:{" "}
                    <input
                        ref={this.nameRef}
                        onChange={(e) => this.inputHandle(e, "name")}
                        value={this.props.inputs.name}
                    ></input>
                </div>
                <div className="input-item">
                    Rating:{" "}
                    <input
                        ref={this.ratingRef}
                        onChange={(e) => this.inputHandle(e, "rating")}
                        value={this.props.inputs.rating}
                    ></input>
                </div>
                <div className="input-item">
                    Price:{" "}
                    <input
                        ref={this.priceRef}
                        type={"number"}
                        onChange={(e) => this.inputHandle(e, "price")}
                        value={this.props.inputs.price}
                    ></input>
                </div>
                <div className="input-item">
                    Image Url:{" "}
                    <input
                        ref={this.imgUrlRef}
                        onChange={(e) => this.inputHandle(e, "imgUrl")}
                        value={this.props.inputs.imgUrl}
                    ></input>
                </div>
                <div className="input-item">
                    Quantity:{" "}
                    <input
                        ref={this.quantityRef}
                        type={"number"}
                        onChange={(e) => this.inputHandle(e, "quantity")}
                        value={this.props.inputs.quantity}
                    ></input>
                </div>
                <div className="input-btns">
                    <Btn
                        text="Add"
                        clickHandle={() => {
                            this.handleButton1(inputRefs);
                        }}
                    />
                    <Btn
                        text="Cancel"
                        clickHandle={() => {
                            this.handleButton2();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default GameInputForm;
