import { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [page, setPage] = useState("stato");

  const [user, setUser] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    lastLogin: null,
    missions: {
      allenamento: false,
      lavoro: false,
      disciplina: false
    }
  });

  // CARICA DATI
  useEffect(() => {
    const saved = localStorage.getItem("architetto");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // SALVA DATI
  useEffect(() => {
    localStorage.setItem("architetto", JSON.stringify(user));
  }, [user]);

  // RESET GIORNALIERO + PENALITÀ
  useEffect(() => {
    const today = new Date().toDateString();

    if (user.lastLogin && user.lastLogin !== today) {
      const allDone = Object.values(user.missions).every(v => v);

      if (!allDone) {
        setUser(prev => ({
          ...prev,
          xp: Math.max(0, prev.xp - 30),
          streak: 0
        }));
      } else {
        setUser(prev => ({
          ...prev,
          streak: prev.streak + 1
        }));
      }

      setUser(prev => ({
        ...prev,
        missions: {
          allenamento: false,
          lavoro: false,
          disciplina: false
        },
        lastLogin: today
      }));
    }

    if (!user.lastLogin) {
      setUser(prev => ({ ...prev, lastLogin: today }));
    }
  }, []);

  const addXP = (amount, key) => {
    if (user.missions[key]) return;

    let newXp = user.xp + amount;
    let newLevel = user.level;

    if (newXp >= 100) {
      newXp -= 100;
      newLevel++;
      alert("LEVEL UP");
    }

    setUser(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      missions: { ...prev.missions, [key]: true }
    }));
  };

  const rank =
    user.level < 5 ? "E" :
    user.level < 10 ? "D" :
    user.level < 20 ? "C" :
    user.level < 30 ? "B" :
    user.level < 50 ? "A" : "S";

  return (
    <div className="app">

      {/* STATO */}
      {page === "stato" && (
        <div className="card">
          <h1>ARCHITETTO SYSTEM</h1>
          <h2>Livello {user.level} - Rank {rank}</h2>

          <div className="xp-bar">
            <div style={{ width: `${user.xp}%` }}></div>
          </div>

          <p>XP: {user.xp}/100</p>
          <p>Streak: {user.streak} 🔥</p>
        </div>
      )}

      {/* MISSIONI */}
      {page === "missioni" && (
        <div className="card">
          <h2>Missioni</h2>

          <button onClick={() => addXP(20, "allenamento")}>
            {user.missions.allenamento ? "✅" : "Allenamento"}
          </button>

          <button onClick={() => addXP(30, "lavoro")}>
            {user.missions.lavoro ? "✅" : "Lavoro"}
          </button>

          <button onClick={() => addXP(50, "disciplina")}>
            {user.missions.disciplina ? "✅" : "Disciplina"}
          </button>
        </div>
      )}

      {/* STATS */}
      {page === "stats" && (
        <div className="card">
          <h2>Statistiche</h2>
          <p>Forza: {user.level * 2}</p>
          <p>Disciplina: {user.level * 3}</p>
          <p>Mente: {user.level * 2}</p>
        </div>
      )}

      {/* NAVBAR */}
      <div className="nav">
        <button onClick={() => setPage("stato")}>Stato</button>
        <button onClick={() => setPage("missioni")}>Missioni</button>
        <button onClick={() => setPage("stats")}>Stats</button>
      </div>

    </div>
  );
}
