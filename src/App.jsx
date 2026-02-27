import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [missions, setMissions] = useState([
    { text: "Allenati 30 minuti", done: false },
    { text: "Studia / Lavora 2 ore concentrate", done: false },
    { text: "Zero distrazioni inutili", done: false }
  ]);

  const completeMission = (index) => {
    const updated = [...missions];
    if (!updated[index].done) {
      updated[index].done = true;
      setXp(xp + 20);
    }
    setMissions(updated);
  };

  useEffect(() => {
    if (xp >= 100) {
      setLevel(level + 1);
      setXp(0);
      setMissions(missions.map(m => ({ ...m, done: false })));
    }
  }, [xp]);

  if (!started) {
    return (
      <div style={styles.container}>
        <h1>SISTEMA DELL'ARCHITETTO</h1>
        <input
          placeholder="Inserisci il tuo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => setStarted(true)}>Attiva Sistema</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🟣 Sistema Attivo</h1>
      <h2>{name}</h2>

      <p>Livello: {level}</p>
      <p>XP: {xp} / 100</p>

      <h3>Missioni giornaliere</h3>

      {missions.map((m, i) => (
        <div key={i} style={styles.mission}>
          <span>
            {m.done ? "✅" : "❌"} {m.text}
          </span>
          {!m.done && (
            <button onClick={() => completeMission(i)}>
              Completa
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  mission: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  }
};
