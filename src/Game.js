import "./App.css";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, addDoc, collection, setDoc, onSnapshot } from "firebase/firestore";
import { ReactLocation, useNavigate, useMatch } from "react-location";
import Home from "./Home";

const location = new ReactLocation();

const routes = [
  {
    path: "/info",
    element: <div>QUESTION Page</div>, //<Info />,
  },
  {
    path: "/",
    element: <div>Home Page</div>, //<Info />,
  },
];

const Categories = (props) => {
  return (
    <li className="bg-white rounded-lg shadow-xl ">
      {" "}
      {props.category}
      <div class="h-24"></div>
    </li>
  );
};

const NewTile = (props) => {
  const navigate = useNavigate();

  return (
    <li
      className="bg-white rounded-lg shadow-xl hover:bg-sky-700"
      onClick={() => {
        props.onClick(props.id);
        navigate({ to: `./info/${props.id}`, replace: true });
      }}
    >
      <div class="h-24">{props.price}</div>
    </li>
  );
};

const UsedTile = (props) => {
  return (
    <li className="bg-black rounded-lg shadow-xl ">
      <div class="h-24"></div>
    </li>
  );
};

// class Game extends React.Component {
const Game = () => {
  const {
    params: { gameId },
  } = useMatch();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(-1);

  const unsub = onSnapshot(doc(db,'games',`${gameId}`), (docSnap)=>{
    setQuestions(docSnap.data().questions);
    setCurrent(docSnap.data().current);
    window.sessionStorage.setItem("gameID",JSON.stringify(gameId));
  }, [gameId]);


  // useEffect(() =>{
  //   doc(db,"games",`${gameId}`).onSnapshot(docSnap => {
  //     setQuestions(docSnap.data().questions);
  //     setCurrent(docSnap.data().current);
  //     window.sessionStorage.setItem("gameID",JSON.stringify(gameId));
  // });
  // });

  useEffect(() => {
     getDoc(doc(db, `/games/${gameId}`)).then((docSnap) => {
      setQuestions(docSnap.data().questions);
      setCurrent(docSnap.data().current);
      window.sessionStorage.setItem("gameID",JSON.stringify(gameId));
    });
  }, [gameId]);


  //console.log(questions.questions);
  const handleSetToTrue = async (id) => {
    const newQ =  questions.map((question) => {
      if (id !== question.id) {
        return question;
      } else {
        const newState = {
          id: question.id,
          question: question.question,
          answer: question.answer,
          played: true,
          price: question.price,
        };
        return newState;
      }
    })
    setQuestions(newQ);
    setCurrent(id);
    //console.log(questions[id]);
    window.sessionStorage.setItem("state",JSON.stringify(questions[id]));
   await setDoc(doc(db, `games`, `${[gameId]}`), {questions: newQ, curQ:id});
   const testRef =  await getDoc(doc(db, `/games/${gameId}`));

   //console.log(questions);
   //console.log(testRef.data());
  };
 // console.log("Questions are: ");
 // console.log(questions);
  return (
    <div>
      <button
        onClick={() => {
          window.sessionStorage.clear();
          window.location.reload();
        }}
      >
        {" "}
        Reset Game
      </button>
      <div className="min-h-screen flex items-center bg-purple-500">
        <div className="flex-1 max-w-4xl mx-auto p-10">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-6 md:grid-cols-6 md:gap-4">
            {questions.map((question) => {
              if (question.id % 6 === 0) {
                return <Categories category={question.category} />;
              } else {
                if (question.played === false) {
                  return (
                    // <div>
                    <NewTile
                      onClick={handleSetToTrue}
                      name={question.price}
                      answer={question.answer}
                      used={question.played}
                      price={question.price}
                      id={question.id}
                    />
                    //<Link to = "/Info"> See Card</Link></div>
                  );
                } else {
                  return (
                    <UsedTile
                      name={question.question}
                      answer={question.answer}
                      used={question.played}
                      price={question.price}
                      id={question.id}
                    />
                  );
                }
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
