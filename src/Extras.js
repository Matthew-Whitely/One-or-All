function Extras() {
  const diceRoll = () => {
    const randomNumber = Math.floor(Math.random() * 7);
    if (randomNumber <= 5) {
      return "Name 1";
    } else {
      return "Name All";
    }
  };

  return (
    <>
      <p>Dice Roll = {diceRoll()}</p>
      <p></p>
    </>
  );
}
export default Extras;
