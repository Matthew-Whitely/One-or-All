import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";
const Database = () => {
  const [data, SetData] = useState([]);
  const [ranNum, setRanNum] = useState([]);
  const [count, setCount] = useState(0);
  const [lengthofData, setLengthofData] = useState(0);
  const [usedRanNum, setUsedRanNum] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const doingNum = () => {
    setCount((prevCount) => prevCount + 1);

    setUsedRanNum(ranNum[count]);

    console.log(usedRanNum);
    setStartGame(true);
  };
  const randomizeDeckOrder = () => {
    let nums = [];
    let min = 0;
    let max = lengthofData;
    let range = max - min;
    for (let i = 0; i < lengthofData; i++) {
      let rnd = Math.floor(Math.random() * range) + min;
    }
    while (nums.length < lengthofData) {
      let rnd = Math.floor(Math.random() * range) + min;
      if (!nums.includes(rnd)) {
        nums.push(rnd);
      } else {
        console.log("duplicate");
      }
    }
    setRanNum(nums);
    console.log(ranNum);
    setCount(0);
    setStartGame(false);
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
      //this is how many quetsions we have in the database
      setLengthofData(dataSet[0].dataSet.length);
    });

    // setRanNum(randoSequence(1, 3));

    // generate();

    // doingNum();
  }, []);

  return (
    <div>
      {startGame === false || count === lengthofData + 1
        ? console.log("sort the deck")
        : data.map((e) => {
            // return console.log(e.dataSet[`${randomNum()}`].quetsion);

            return (
              <div>
                <p>{e.dataSet[`${usedRanNum}`].question}</p>
                <p>
                  {e.dataSet[`${usedRanNum}`].answer.map((element) => {
                    return <p>{element}</p>;
                  })}
                </p>
              </div>
            );
          })}

      <button
        onClick={() => {
          doingNum();
        }}
      >
        Random sequence of nums
      </button>
      <button
        onClick={() => {
          randomizeDeckOrder();
        }}
      >
        deck order
      </button>
      <h1>HELLO</h1>
    </div>
  );
};
export default Database;
