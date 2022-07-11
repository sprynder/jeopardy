import logo from "./logo.svg";
import "./App.css";
import React from "react";
import questions from "./components/questions.json";
import { ReactLocation, Router, Outlet, useMatch } from "react-location";
import Info from "./Info";
import Home from "./Home";
import Game from "./Game";

const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play/:gameId/:info",
    element: <Info />,
  },
  {
    path: "/play/:gameId",
    element: <Game />,
  },
];

const App = () => {
  return (
    <Router routes={routes} location={location}>
      <Outlet />
    </Router>
  );
};

export default App;
