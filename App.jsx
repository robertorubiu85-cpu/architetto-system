import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("player");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name);
      setXp(data.xp);
      setLevel(data.level);
      setStreak(data.streak);
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    if (logged) {
      localStorage.setItem(
        "player",
        JSON.stringify({ name, xp, level, streak })
      );
    }
  }, [name, xp, level, streak, logged]);

  const completeMission = () => {
    saveHistory();
    const newXp = xp + 20;
    setXp(newXp);

    if (newXp >= level * 100) {
      setLevel(level + 1);
      alert("⚡ LEVEL UP ⚡");
    }

    setStreak(streak + 1);
  };

  const undo = () => {
    const last = history.pop();
    if (!last) return;
    setXp(last.xp);
    setLevel(last.level);
    setStreak(last.streak);
    setHistory([...history]);
  };

  const saveHistory = () => {
    setHistory([...history, { xp, level, streak }]);
  };

  if (!logged) {
    return (
      <div style={{padding:40, color:"white", background:"black", height:"100vh"}}>
        <h1>Se pensi di essere degno…</h1>
        <input
          placeholder="Il tuo nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => setLogged(true)}>Entra nel sistema</button>
      </div>
    );
  }

  return (
    <div style={{padding:20, color:"white", background:"black", height:"100vh"}}>
      <h2>Giocatore: {name}</h2>
      <p>Livello: {level}</p>
      <p>XP: {xp}</p>
      <p>Streak: {streak}</p>

      <button onClick={completeMission}>Completa Missione</button>
      <button onClick={undo}>Annulla ultima azione</button>
    </div>
  );
}
