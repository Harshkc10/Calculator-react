import React, { useState } from "react";
import "./calculator.css";


const Calculator = () => {
    
    const [operator, setOperator] = useState("");
    const [currentVal, setCurrentVal] = useState("");
    const [previousVal, setPreviousVal] = useState("");

    const buttons = [
    "7","8","9","AC",
    "4","5","6","+",
    "1","2","3","-",
    "0","/","*","^",
    ".","00","del","="
    ];
    
    const calculation = (a,b,op) => {
        a = Number(a);
        b = Number(b);

        switch(op){
            case "+":return a+b ;
            case "-":return a-b ;
            case "*":return a*b ;
            case "/":return b===0 ?'error': a/b ;
            case "^":return a**b ;
            default: return;
        }
    }     

    const handleClick = (key) => {

        if (key === "AC"){
            setCurrentVal("");
            setOperator(null);
            setPreviousVal("");
            return;
        }
        if (key ==='del'){
            if (currentVal !== ""){
            setCurrentVal(currentVal.slice(0,-1));
            return;
            }
            if (currentVal === "" && operator ){
                setOperator(null);
                setCurrentVal(previousVal);
                setPreviousVal("");
                return;
            }
            return;
        }
        if (!isNaN(key)||key ==='.'){
            if (key === "." && currentVal.includes(".")) {
                return;
            }
            setCurrentVal(currentVal + key); 
            return ;
        }
        if (['+','-','*','/','^'].includes(key)){

            if (previousVal !== "" && currentVal !==""){
                const result = calculation(previousVal,currentVal,operator);
                setPreviousVal(result);
                setCurrentVal("");
                setOperator(key);
                return;
            }

            if (currentVal !== ""){
                setPreviousVal(currentVal);
                setCurrentVal("");
                setOperator(key);
            }
            return;
        }
        if(key === "="){
            if (previousVal === ""|| operator ===null || currentVal==="")
                return;
        
            const result= calculation(previousVal,currentVal,operator);

            setCurrentVal(String(result));
            setPreviousVal("");
            setOperator(null);
        }  
    };  

  return (
    <div id="Main-container">

        <div className="title">
            <h1>Calculator</h1> 
        </div>

        <div className="calci-upper">
            <input 
            className="display"
            type="text" 
            placeholder="Enter......" 
            value={currentVal} 
            readOnly />

        </div>
        <div className="keys-container">
            <div className="calci-keys">
                {buttons.map((key) => (
                <button key={key} onClick={() => handleClick(key)}>
                    {key}
                </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Calculator;
