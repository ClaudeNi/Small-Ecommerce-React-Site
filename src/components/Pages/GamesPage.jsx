import React from "react";
import { Link } from "react-router-dom";
import GameDetails from "../GameDetails/GameDetails";
import Spinner from "../Spinner/Spinner";
import niStore from "../../api/niStore";

class GamesPage extends React.Component {
    state = { gamesList: [], spinner: false };

    componentDidMount() {
        this.fetchGames();
    }

    fetchGames = async () => {
        this.setState({spinner: true})
        try {
            const gamesList = await niStore.get("games");
            this.setState({ gamesList: gamesList.data, spinner: false });
        } catch (e) {
            console.log(e);
        }
    };

    displayGames = () => {
        return this.state.gamesList.map((game) => {
            return (
                <Link
                    key={game.id}
                    to={`${this.props.location.pathname}/${game.id}`}
                >
                    <GameDetails
                        name={game.name}
                        imgUrl={game.imgUrl}
                        price={game.price}
                    />
                </Link>
            );
        });
    };

    render() {
        if (this.state.spinner) {
            return <Spinner />
        }
        return (
            <div className="games-page-container">
                <div className="games-pages-items-container">
                    {this.displayGames()}
                </div>
            </div>
        );
    }
}

export default GamesPage;
