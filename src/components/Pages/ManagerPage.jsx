import React from "react";
import GameManagerCard from "../GameManagerCard/GameManagerCard";
import GameInputForm from "../GameInputForm/GameInputForm";
import Spinner from '../Spinner/Spinner';
import niStore from "../../api/niStore";

class ManagerPage extends React.Component {
    state = {
        gameList: [],
        isEditing: false,
        inputs: {
            name: "",
            rating: "",
            price: "",
            imgUrl: "",
            quantity: "",
        },
        spinner: false,
    };

    componentDidMount() {
        this.fetchGames();
    }

    fetchGames = async () => {
        this.setState({spinner: true})
        try {
            const games = await niStore.get("games");
            this.setState({ gameList: games.data, spinner: false });
        } catch (e) {
            console.log(e);
        }
    };

    fetchGame = async (id) => {
        const game = await niStore.get(`games/${id}`);
        this.setState({
            inputs: {
                name: game.data.name,
                rating: game.data.rating,
                price: game.data.price,
                imgUrl: game.data.imgUrl,
                quantity: game.data.quantity,
            },
        });
    };

    displayGames = () => {
        return this.state.gameList.map((game, i) => {
            return (
                <GameManagerCard
                    key={i}
                    id={game.id}
                    name={game.name}
                    imgUrl={game.imgUrl}
                    handleChangeEdit={this.startEditing}
                    handleButton2={this.handleDelete}
                />
            );
        });
    };

    handleButton1 = (inputRefs) => {
        const newGame = {};
        for (let data of inputRefs) {
            newGame[data[1]] = data[0].value;
        }
        if (!this.state.isEditing) {
            this.addToApi(newGame);
        } else {
            this.updateApi(newGame, this.state.currentGame);
            this.stopEditing();
        }
    };

    handleDelete = (id) => {
        this.deleteFromApi(id);
    };

    startEditing = (id) => {
        console.log("started editing");
        console.log(id);
        this.setState({ isEditing: true, currentGame: id });
        this.fetchGame(id);
    };

    stopEditing = () => {
        this.setState({ isEditing: false });
    };

    addToApi = async (newGame) => {
        try {
            await niStore.post("games", newGame);
            this.fetchGames();
        } catch (e) {
            console.log(e);
        }
    };

    deleteFromApi = async (id) => {
        try {
            await niStore.delete(`games/${id}`);
            const data = this.state.gameList.filter((game) => game.id !== id);
            this.setState({ gameList: data });
        } catch (e) {
            console.log(e);
        }
    };

    updateApi = async (newGame, id) => {
        try {
            await niStore.put(`games/${id}`, newGame);
            const newList = [...this.state.gameList];
            const index = this.state.gameList.findIndex(
                (game) => game.id === id
            );
            newGame.id = id;
            newList[index] = newGame;
            console.log(newGame);
            this.setState({ gameList: newList });
        } catch (e) {
            console.log(e);
        }
    };

    changeInputsState = (value, type) => {
        this.setState({ inputs: { [type]: value } });
    };

    clearInputs = () => {
        this.setState({
            inputs: {
                name: "",
                rating: "",
                price: "",
                imgUrl: "",
                quantity: "",
            },
        });
    };

    render() {
        if (this.state.spinner) {
            return <Spinner />
        } else
        return (
            <div className="manager-page-container">
                <div className="manager-page-input-container">
                    <GameInputForm
                        handleButton1={this.handleButton1}
                        handleButton2={this.stopEditing}
                        currentGame={this.state.currentGame}
                        changeInputsState={this.changeInputsState}
                        clearInputs={this.clearInputs}
                        inputs={this.state.inputs}
                    />
                </div>
                <div className="manager-pages-items-container">
                    {this.displayGames()}
                </div>
            </div>
        );
    }
}

export default ManagerPage;
