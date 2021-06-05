import { useState, useEffect, useRef } from "react";

function DiceAndTimer(props) {
  const [dice, setDice] = useState("");
  const [num, setNum] = useState(5);
  const [hidden, setHidden] = useState(false);
  let intervalRef = useRef();

  const decreaseNum = () => setNum((prev) => prev - 1);

  const diceRoll = () => {
    const randomNumber = Math.floor(Math.random() * 7);
    if (randomNumber <= 5) {
      setDice("Name 1 of the");
    } else {
      setDice("Name ALL of the");
    }
    setTimeout(() => {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }, 3000);
    props.nextQuestion();
    toggleHidden();
  };

  if (num === 0) {
    clearInterval(intervalRef.current);
    setNum(5);
    setHidden(false);
  }
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <div className="right">Timer</div>
      <div className="right">{num}</div>
      <button
        onClick={() => {
          props.reset();
        }}
      >
        Reset
      </button>

      <button onClick={diceRoll} className={` ${hidden ? "hidden" : ""}`}>
        DICE ROLL
      </button>

      <p>{dice}</p>
    </>
  );
}
export default DiceAndTimer;
