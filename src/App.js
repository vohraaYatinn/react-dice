import React, { useState } from "react";
import Dice from "react-dice-roll";
import "./index.css";

export default function App({ handlerKey }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [cheatValue, setCheatValue] = useState(null);


  const handleCheckboxChange = (e) => {
    const num = parseInt(e.target.name);
    const isChecked = e.target.checked;
  
    if (isChecked) {
      // Add the selected value to the cheatValue
      setCheatValue(num);
    } else {
      // If unchecking, check if there are other selected values
      const remainingValues = selectedValues.filter((value) => value !== num);
      if (remainingValues.length > 0) {
        // Set cheatValue to one of the remaining selected values
        const randomIndex = Math.floor(Math.random() * remainingValues.length);
        setCheatValue(remainingValues[randomIndex]);
      } else {
        // No values selected, reset cheatValue
        setCheatValue(null);
      }
    }
  
    // Update selectedValues state based on checkbox changes
    if (isChecked) {
      setSelectedValues((prevSelected) => [...prevSelected, num]);
    } else {
      setSelectedValues((prevSelected) =>
        prevSelected.filter((value) => value !== num)
      );
    }
  };
  ;

  const handleDiceRoll = () => {
    if (selectedValues.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedValues.length);
      const newCheatValue = selectedValues[randomIndex];
      setCheatValue(newCheatValue);
    } else {
      setCheatValue(null);
    }
  };

  return (
    <div className="App" style={{
      height:"100vh", display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"
    }}>
     
      <Dice cheatValue={cheatValue} onRoll={handleDiceRoll} />
      <div className="checkboxes">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="numbers">
            <label htmlFor={num}>{num}</label>
            <input
              type="checkbox"
              name={num.toString()}
              id={num.toString()}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
