import './App.css';
import React, { Component,useState } from 'react';
import questions from './components/questions.json'
import { ReactLocation, Router, Outlet, Link, useNavigate } from "react-location";
import Game from "./Game"
import './Info.css';

const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: <Game />,
  }
];


const Info = (props) => {
  var text = "See Answer"
  const el = JSON.parse(window.sessionStorage.getItem('state'));
  return (
    <div className="min-h-screen flex items-center ">
    <div className="center container">
      <ul className = "center">
        <li>{el.questions[el.curQ].question}</li>
      </ul>
    </div>
    <div className="bottom">
        <ul className="sm:grid-cols-6 md:grid-cols-6">
        <li className="outline"><button onClick={()=>{alert(el.questions[el.curQ].answer);}}>{text}</button></li>
        <li className="outline"><Link to = "/">Go back to board</Link></li>
      </ul>
      </div>
    </div>
  );
};
export default Info;

