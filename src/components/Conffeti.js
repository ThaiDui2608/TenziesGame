import React, { useEffect, useState } from 'react'
import ReactConffeti from 'react-confetti'

const Conffeti = () => {
    
    const [windowDimen, setWindowDimen] = useState({width: window.innerWidth, height: window.innerHeight})
    function SetSize(){
        setWindowDimen({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', SetSize)
        return () => {
            window.removeEventListener('resize', SetSize)
        }
    }, [windowDimen])

  return (
    <div>
        <ReactConffeti
            width={windowDimen.width}
            height={windowDimen.height}
        />
    </div>
  )
}

export default Conffeti