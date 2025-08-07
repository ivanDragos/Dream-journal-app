import DreamEntryForm from "./components/DreamEntryForm";
import DreamList from "./components/DreamList";
import WordCloud from "./components/WordCloud";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState, useMemo, useEffect } from "react";
import "./index.css";

function FloatingParticles() {
  // Simple SVG-based floating particles (stars, orbs, clouds)
  const particles = Array.from({ length: 18 }).map((_, i) => {
    const type = i % 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 18 + Math.random() * 12;
    const size = 18 + Math.random() * 32;
    const opacity = 0.3 + Math.random() * 0.5;
    if (type === 0) {
      // Star
      return (
        <svg key={i} style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, width: size, height: size, opacity, animation: `floatY ${duration}s linear infinite` }} viewBox="0 0 24 24" fill="#fff8">
          <polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10" />
        </svg>
      );
    } else if (type === 1) {
      // Orb
      return (
        <div key={i} style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, width: size, height: size, borderRadius: '50%', background: 'radial-gradient(circle, #fff8 60%, #7e5bef33 100%)', opacity, filter: 'blur(1.5px)', animation: `floatY ${duration}s linear infinite` }} />
      );
    } else {
      // Cloud
      return (
        <svg key={i} style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, width: size * 1.5, height: size, opacity, animation: `floatY ${duration}s linear infinite` }} viewBox="0 0 64 32" fill="#fff6">
          <ellipse cx="20" cy="20" rx="20" ry="12" />
          <ellipse cx="40" cy="16" rx="16" ry="10" />
        </svg>
      );
    }
  });
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden>
      {particles}
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-60px); }
        }
      `}</style>
    </div>
  );
}

function DreamStreak({ dreams }) {
  const streak = useMemo(() => {
    if (dreams.length === 0) return 0;
    
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    let currentStreak = 0;
    let currentDate = new Date();
    
    // Check if there's a dream today
    const hasDreamToday = dreams.some(dream => {
      const dreamDate = new Date(dream.date).toDateString();
      return dreamDate === today;
    });
    
    if (!hasDreamToday) return 0;
    
    // Count consecutive days backwards
    for (let i = 0; i < 365; i++) { // Max 1 year
      const checkDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000).toDateString();
      const hasDreamOnDate = dreams.some(dream => {
        const dreamDate = new Date(dream.date).toDateString();
        return dreamDate === checkDate;
      });
      
      if (hasDreamOnDate) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  }, [dreams]);

  if (streak === 0) return null;

  return (
    <div style={{
      background: "rgba(126,91,239,0.15)",
      borderRadius: "12px",
      padding: "8px 16px",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 2px 8px #e0c3fc44"
    }}>
      <span role="img" aria-label="fire">🔥</span>
      <span style={{ fontWeight: 600, color: "#7e5bef" }}>
        {streak} day{streak !== 1 ? 's' : ''} dream streak!
      </span>
    </div>
  );
}

export default function App() {
  const [dreams, setDreams] = useLocalStorage("dreams", []);
  const [filters, setFilters] = useState({ date: "", category: "" });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const addDream = (dream) => {
    setDreams([dream, ...dreams]);
  };

  const deleteDream = (id) => {
    setDreams(dreams.filter(d => d.id !== id));
  };

  const editDream = (id, updates) => {
    setDreams(dreams.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  const clearDreams = () => {
    if (window.confirm("Are you sure you want to clear all dreams?")) {
      setDreams([]);
    }
  };

  const categories = useMemo(() => {
    const cats = dreams.map((d) => d.category || "Uncategorized");
    return Array.from(new Set(cats));
  }, [dreams]);

  const filteredDreams = useMemo(() => {
    return dreams.filter((dream) => {
      const matchDate = !filters.date || dream.date === filters.date;
      const matchCategory = !filters.category || dream.category === filters.category;
      return matchDate && matchCategory;
    });
  }, [dreams, filters]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", position: 'relative', zIndex: 1 }}>
      <FloatingParticles />
      <h1 style={{ textAlign: "center" }}>🌙 Dream Journal</h1>
      <DreamStreak dreams={dreams} />
      <WordCloud dreams={dreams} />
      <button
        className="dark-toggle-btn"
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <DreamEntryForm onAddDream={addDream} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 8px 0', flexWrap: 'wrap' }}>
        <select
          value={filters.category || ''}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e0c3fc', fontFamily: 'inherit', fontSize: '1em', minWidth: 120, background: 'rgba(255,255,255,0.8)', color: '#7e5bef' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={filters.date || ''}
          onChange={e => setFilters({ ...filters, date: e.target.value })}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e0c3fc', fontFamily: 'inherit', fontSize: '1em', background: 'rgba(255,255,255,0.8)', color: '#7e5bef' }}
        />
        <button
          onClick={clearDreams}
          style={{
            background: "#ffb3b3",
            color: "#a00",
            border: "none",
            borderRadius: "16px",
            padding: "8px 18px",
            fontWeight: 700,
            fontSize: "1em",
            boxShadow: "0 1px 6px #e0c3fc33",
            cursor: "pointer"
          }}
        >
          Clear All Dreams
        </button>
      </div>
      <DreamList dreams={filteredDreams} onDeleteDream={deleteDream} onEditDream={editDream} />
    </div>
  );
}
