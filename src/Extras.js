import { useState, useEffect, useRef } from "react";

function Extras() {
  const [dice, setDice] = useState("");

  const diceRoll = () => {
    const randomNumber = Math.floor(Math.random() * 7);
    if (randomNumber <= 5) {
      setDice("Name 1 thing");
    } else {
      setDice("Name ALL things");
    }
  };
  //
  const [num, setNum] = useState(100);
  const [pause, setPause] = useState(false);

  let intervalRef = useRef();

  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    setPause(false);
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };
  return (
    <>
      <button onClick={diceRoll}>DICE ROLL</button>
      <p>{dice}</p>
      {/*  */}
      <div>{num}</div>
      <button onClick={handleClick}>{pause ? "Run" : "Pause"}</button>
    </>
  );
}
export default Extras;
