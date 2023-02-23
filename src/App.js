import './App.css';
import React, { useState, useEffect } from 'react'
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Conffeti from './components/Conffeti';

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  //count rolled times
  const [clickedCount, setClickedCount] = useState(0)

  //times clicked on roll button
  function countClicked(){
    if(!tenzies){
      setClickedCount(prevCount => prevCount + 1)
    } else{
      setClickedCount(prevCount => prevCount = 0)
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)

    if(allHeld && allValue){
      setTenzies(true)
      setIsRunning(false)
    }
  }, [dice])

    //count time of game
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const handleStart = () => {
      if(!tenzies){
        setIsRunning(true)
      } else{
        setIsRunning(false)
      }
    }

    useEffect(() => {
      let intervalId

        if(isRunning){
          intervalId = setInterval(() => {
            setTime(prevTime => prevTime + 1)
          }, 1000)
        } 
      return () => clearInterval(intervalId)
    }, [isRunning])

    function handleResetTime(){
      setIsRunning(false)
      setTime(0)
    }

  function generateNewDice(){
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDice())
    }
    return newDice
  }

  const dice_element = dice.map(dice => 
      <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)}
    />)

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die : generateNewDice()
      }))
    } else{
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  function holdDice(id){
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
  }

  return (
    <main className='container'>
      {tenzies ? <Conffeti/> : ''}
      <div className='dice_container'>
        {dice_element}
      </div>
      <button className='roll_dice' onClick={function(event){
        rollDice();
        countClicked();
        {tenzies ? handleResetTime() : handleStart()}
      }}>
          {tenzies ? 'New Game' : 'Roll Dice'}
        </button>
        <p>Times rolled: {clickedCount}</p>
        <p>Time playing: {time}</p>
    </main>
  );
}

export default App;
