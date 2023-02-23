import React from 'react'

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#fff'
    }
  return (
    <div 
        className='dice_face' 
        style={styles} 
        onClick={props.holdDice}
    >
        <h2 className='dice_num'>{props.value}</h2>
    </div>
  )
}

export default Die