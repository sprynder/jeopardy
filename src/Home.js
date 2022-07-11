import "./App.css";
import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
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
      questions: questions, curQ: -1
    });
    //const testRef =  await getDoc(doc(db, `/games/${gameRef.id}`));
   // console.log(testRef.data());
    console.log("Game id is: ", gameRef.id);
    navigate( {to : `/play/${gameRef.id}`});
    window.sessionStorage.setItem("gameID",JSON.stringify(gameRef.id));
    //navigate(`/game`);
    //navigate({ to: "./info", replace: true });
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
