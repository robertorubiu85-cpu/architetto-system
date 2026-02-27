import { useState } from 'react'

export default function App() {
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)

  const addXp = () => {
    const newXp = xp + 20
    if (newXp >= 100) {
      setLevel(level + 1)
      setXp(0)
      alert("LEVEL UP!")
    } else {
      setXp(newXp)
    }
  }

  return (
    <div style={{
      color: "white",
      fontFamily: "sans-serif",
      textAlign: "center",
      paddingTop: "100px"
    }}>
      <h1>ARCHITETTO SYSTEM</h1>
      <h2>Livello: {level}</h2>
      <h3>XP: {xp}/100</h3>
      <button onClick={addXp} style={{
        padding: "10px 20px",
        fontSize: "18px",
        background: "purple",
        color: "white",
        border: "none",
        borderRadius: "10px"
      }}>
        Completa missione
      </button>
    </div>
  )
}
