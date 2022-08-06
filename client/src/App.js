import React from "react";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail.jsx";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame.jsx";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/videogame/:id" component={VideogameDetail} />
          <Route path="/createvideogame" component={CreateVideogame} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
