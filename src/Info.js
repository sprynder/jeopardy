
import logo from './logo.svg';
import './App.css';
import React, { Component,useState } from 'react';
import questions from './components/questions.json'
import { ReactLocation, Router, Outlet, Link, useNavigate } from "react-location";
import Game from "./Game"

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
    <div>
      <h1>{el.questions[el.curQ].question}</h1>
      <h2><button onClick={()=>{alert(el.questions[el.curQ].answer);}}>{text}</button></h2>
      <Link to = "/">Go back to board</Link>
    </div>
  );
};
export default Info;

