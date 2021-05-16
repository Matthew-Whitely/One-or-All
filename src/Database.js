import "./App.css";
import { useEffect, useState } from "react";
import UserInput from "./UserInput";
import firebase from "./firebase";
const Database = () => {
  const [data, SetData] = useState([]);
  const [deckOrder, setDeckOrder] = useState([]);
  const [count, setCount] = useState(-1);
  const [lengthofData, setLengthofData] = useState(4);
  //THIS takes the array of numbers from deck order and goes through them individually

  const [startGame, setStartGame] = useState(false);
  const [userAnswer, setUserAnswer] = useState("Answers Appear here");
  const [realAnswer, SetRealAnswer] = useState([]);

  //these are the states that are taking the shuffled data pushing to firebase then grabing from firebase
  const [firebaseQuestions, setFirebaseQuestions] = useState([]);
  //random question
  const [displayQuestion, setDisplayQuestion] = useState([]);
  const [userQ, setUserQ] = useState("");

  //getting the data from data state
  useEffect(() => {
    data.map((e) => {
      return setFirebaseQuestions(e.dataSet);
    });
  }, [data]);

  //Randomizing the array of quetsions from firebase then pushing the new array back into firebase under GamePlay

  //clicking this button will randomize and update firebase
  const newGame = () => {
    setStartGame(false);
    setCount(-1);
    setDisplayQuestion([]);

    for (let i = firebaseQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = firebaseQuestions[i];
      firebaseQuestions[i] = firebaseQuestions[j];
      firebaseQuestions[j] = temp;
    }
    console.log(firebaseQuestions);

    const mainDB = firebase.database().ref();
    mainDB.off();
    const dbRef = firebase.database().ref("GamePlay");
    dbRef.remove();
    dbRef.push(firebaseQuestions);
  };

  // triggers when firebase is randomized again
  useEffect(() => {
    const dbRef = firebase.database().ref("GamePlay");
    dbRef.on("value", (response) => {
      const randomDataSet = [];
      const randomData = response.val();
      for (let key in randomData) {
        randomDataSet.push({
          key: key,
          randomDataSet: randomData[key],
        });
      }
      setDisplayQuestion(randomDataSet);
    });
  }, [firebaseQuestions]);

  const reset = () => {
    const dbRef = firebase.database().ref("GamePlay");
    dbRef.remove();
  };

  const nextQuestion = () => {
    setStartGame(true);
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const dataSet = [];

      const data = response.val();

      for (let key in data) {
        dataSet.push({
          key: key,
          dataSet: data[key],
        });
        SetData(dataSet);
      }
    });
  }, []);

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (realAnswer.includes(userAnswer)) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
  };

  return (
    <div>
      {startGame === false || count === 4
        ? console.log("sort the deck")
        : displayQuestion.map((e) => {
            return <p>{e.randomDataSet[count].question}</p>;
          })}

      <button
        onClick={() => {
          nextQuestion();
        }}
      >
        Next Quetsions
      </button>

      <button
        onClick={() => {
          newGame();
        }}
      >
        New Game
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
      <h1>HELLO</h1>
      <h2>{userAnswer}</h2>
      <UserInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={userAnswer}
      />
    </div>
  );
};
export default Database;
