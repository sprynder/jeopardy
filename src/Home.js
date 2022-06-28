import "./App.css";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import generate from "./questionGenerator.js";
import { useNavigate } from "react-location";

const Home = () => {
  const navigate = useNavigate();

  const initiateGame = async () => {
    // 1. Generate Questions
    const { questions } = await generate();
    console.log(`questions are ${JSON.stringify(questions)}`);

    // Create Game Doc
    console.log("Initiating game!");
    const gameRef = await addDoc(collection(db, "games"), {
      questions,
    });
    console.log("Game id is: ", gameRef.id);

    navigate(`/play/${gameRef.id}`);

    // route to /play/:gameId url

    //  /games
    //    game1id
    //      questions[]
    //
    //    game2id

    // 3. Begin game (routing? set state?)
  };

  return (
    <button className="center container" onClick={initiateGame}>
      Click here to load game! It may take a second or two to load.
    </button>
  );
};

export default Home;
