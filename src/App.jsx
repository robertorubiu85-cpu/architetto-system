import { useState, useEffect } from "react";

export default function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    const savedXp = localStorage.getItem("xp");
    const savedLevel = localStorage.getItem("level");
    const savedName = localStorage.getItem("name");

    if (savedXp) setXp(Number(savedXp));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
    localStorage.setItem("name", name);
  }, [xp, level, name]);

  const addXp = () => {
    let newXp = xp + 10;

    if (newXp >= 100) {
      setLevel(level + 1);
      newXp = 0;
      alert("⚡ LEVEL UP ⚡");
    }

    setXp(newXp);
  };

  if (!name) {
    return (
      <div style={styles.container}>
        <h1>🟣 SISTEMA DELL'ARCHITETTO</h1>
        <p>Se pensi di essere degno inserisci il tuo nome</p>
        <input
          style={styles.input}
          placeholder="Il tuo nome"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🟣 Sistema Attivo</h1>
      <h2>{name}</h2>

      <p>Livello: {level}</p>
      <p>XP: {xp} / 100</p>

      <button style={styles.button} onClick={addXp}>
        Completa Missione (+10 XP)
      </button>
    </div>
  );
}

const styles = {
  container: {
    background: "black",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
  },
  input: {
    marginTop: "10px",
    padding: "10px",
  },
};
