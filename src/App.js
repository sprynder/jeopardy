import logo from './logo.svg';
import './App.css';
import React, { Component,useState } from 'react';
import questions from './components/questions.json'
import { ReactLocation, Router, Outlet, Link, useNavigate, useMatch } from "react-location";
import Info from "./Info";
import Game from "./Game";


const location = new ReactLocation();

const routes = [
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "/",
    element: <Game />,
  }
];


const Quest =() => {
  const params = useMatch().params;

  return (
    <div>
        Question page: {}
    </div>
  )
}

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    questions: questions.jeo,
    curQ: -1
  };
}

handleSetToTrue = (id) => {
  this.setState( prevState => {
    return{
      questions: prevState.questions.map( question =>{
        if(id!==question.id)
        {
          return {question}
        }
        else{
          return{
            id:  question.id,
            question: question.question,
            answer: question.answer,
            played: true,
            price:  question.price
          }
        }
      }),
      curQ: id
    };
  });
}

render(){
  return (
    <div><button onClick={()=>{window.sessionStorage.clear(); window.location.reload();}}> Clear Memory</button>
    <Router routes={routes} location={location}>
         <Outlet />
      </Router>
      </div>
  );
        }
}

export default App;
