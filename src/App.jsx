import { useState } from "react";
import "./style.css";

export default function App() {
  const [page, setPage] = useState("stato");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const addXP = (amount) => {
    let newXp = xp + amount;
    if (newXp >= 100) {
      setLevel(level + 1);
      newXp = newXp - 100;
    }
    setXp(newXp);
  };

  return (
    <div className="app">

      {/* CONTENUTO */}
      {page === "stato" && (
        <div className="card">
          <h1>ARISE SYSTEM</h1>
          <h2>Livello {level}</h2>
          <p>XP: {xp} / 100</p>

          <div className="xp-bar">
            <div style={{ width: `${xp}%` }}></div>
          </div>
        </div>
      )}

      {page === "missioni" && (
        <div className="card">
          <h2>Missioni</h2>

          <button onClick={() => addXP(10)}>Allenamento (+10 XP)</button>
          <button onClick={() => addXP(20)}>Lavoro (+20 XP)</button>
          <button onClick={() => addXP(30)}>Disciplina (+30 XP)</button>
        </div>
      )}

      {page === "stats" && (
        <div className="card">
          <h2>Statistiche</h2>
          <p>Forza: {level * 2}</p>
          <p>Intelligenza: {level * 2}</p>
          <p>Disciplina: {level * 3}</p>
        </div>
      )}

      {page === "rank" && (
        <div className="card">
          <h2>Rank</h2>
          <p>{level < 5 ? "E" : level < 10 ? "D" : "C"}</p>
        </div>
      )}

      {/* NAVBAR */}
      <div className="nav">
        <button onClick={() => setPage("stato")}>Stato</button>
        <button onClick={() => setPage("missioni")}>Missioni</button>
        <button onClick={() => setPage("stats")}>Stats</button>
        <button onClick={() => setPage("rank")}>Rank</button>
      </div>

    </div>
  );
}
