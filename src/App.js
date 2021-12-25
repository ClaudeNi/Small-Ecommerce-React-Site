import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import GamesPage from "./components/Pages/GamesPage.jsx";
import GameDetailsPage from "./components/Pages/GameDetailsPage.jsx";
import CartPage from "./components/Pages/CartPage.jsx";
import PageNotFound from "./components/Pages/PageNotFound.jsx";
import "./App.css";
import "./components/Pages/pages.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/games" exact component={GamesPage} />
                        <Route
                            path="/games/:id"
                            exact
                            component={GameDetailsPage}
                        />
                        <Route path="/cart" exact component={CartPage} />
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
