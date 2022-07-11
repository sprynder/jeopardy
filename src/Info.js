import "./App.css";
import React, { Component, useState } from "react";
import questions from "./components/questions.json";
import {
  ReactLocation,
  Router,
  Outlet,
  Link,
  useNavigate,
} from "react-location";
import Game from "./Home";
import "./Info.css";

const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: <Game />,
  },
];

const Info = (props) => {
  var text = "See Answer";
  const item = window.sessionStorage.getItem("state");
  const id = JSON.parse(window.sessionStorage.getItem("gameID"));
  //console.log(item);
  const el = JSON.parse(item);
  return (
    <div className="min-h-screen flex items-center ">
      <div className="center container">
        <ul className="center">
          <li>{el.question}</li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="sm:grid-cols-6 md:grid-cols-6">
          <li className="outline">
            <button
              onClick={() => {
                alert(el.answer);
              }}
            >
              {text}
            </button>
          </li>
          <li className="outline">
            <Link to={`/play/${id}`}>Go back to board</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Info;
