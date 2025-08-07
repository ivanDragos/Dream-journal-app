import React, { useEffect, useRef, useState } from "react";

const dreamEmojis = ["🌙", "✨", "☁️", "💤", "🌀"];

function generateAdvancedAISummary(dreamText, category) {
  category = category || "Other";
  const text = dreamText.toLowerCase();
  const feelings = [
    'mystery', 'wonder', 'curiosity', 'adventure', 'serenity', 'excitement',
    'anxiety', 'joy', 'fear', 'hope', 'longing', 'confusion', 'peace', 'anticipation', 'melancholy', 'delight', 'surprise', 'awe'
  ];
  const feeling = feelings[Math.floor(Math.random() * feelings.length)];

  // Poetic sentence templates
  const templates = [
    `This dream, tinged with ${feeling}, explores the realm of ${category.toLowerCase()}.`,
    `A journey through ${category.toLowerCase()}, where ${feeling} lingers in the air.`,
    `In this vision, ${feeling} weaves through the tapestry of ${category.toLowerCase()} and memory.`,
    `A surreal tale of ${category.toLowerCase()}, colored by ${feeling} and imagination.`,
    `Your subconscious conjures a world of ${category.toLowerCase()}, echoing with ${feeling}.`,
    `A night’s passage through ${category.toLowerCase()}, where ${feeling} is your companion.`,
    `A dreamscape of ${category.toLowerCase()} and ${feeling}, painted in the colors of your mind.`,
    `This dream reveals your inner ${category.toLowerCase()}, wrapped in ${feeling}.`
  ];
  const poetic = templates[Math.floor(Math.random() * templates.length)];

  // Add a second sentence with a gentle interpretation
  const interpretations = [
    `Perhaps your mind is seeking new meaning or release.`,
    `This may reflect your current hopes, fears, or desires.`,
    `It could be a sign to embrace change or face hidden emotions.`,
    `Your subconscious might be processing recent events or memories.`,
    `Maybe you are searching for balance, adventure, or connection.`,
    `This dream invites you to reflect on your waking life.`,
    `It’s a gentle nudge from your inner self to listen more closely.`,
    `Let this dream inspire you to explore new paths or ideas.`
  ];
  const interpretation = interpretations[Math.floor(Math.random() * interpretations.length)];

  return `${poetic} ${interpretation}`;
}

export default function DreamList({ dreams, onDeleteDream, onEditDream }) {
  const listRef = useRef([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    listRef.current.forEach((el, i) => {
      if (el) {
        el.classList.remove("fade-in");
        // Trigger reflow for restart animation
        void el.offsetWidth;
        el.classList.add("fade-in");
      }
    });
  }, [dreams]);

  const startEditing = (dream) => {
    setEditingId(dream.id);
    setEditText(dream.text);
    setEditCategory(dream.category || "");
  };

  const saveEdit = (dreamId) => {
    if (editText.trim()) {
      onEditDream(dreamId, {
        text: editText.trim(),
        category: editCategory.trim() || "Uncategorized"
      });
      setEditingId(null);
      setEditText("");
      setEditCategory("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditCategory("");
  };

  if (dreams.length === 0) {
    return <p>No dreams logged yet. 🌙</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {dreams.map((dream, i) => {
        const emoji = dream.emoji || dreamEmojis[Math.floor(Math.random() * dreamEmojis.length)];
        const aiSummary = generateAdvancedAISummary(dream.text, dream.category);
        const isEditing = editingId === dream.id;
        
        return (
          <li
            key={dream.id}
            ref={el => listRef.current[i] = el}
            className="dream-entry dream-card"
            style={{
              marginBottom: "16px",
              padding: "16px 14px 14px 14px",
              background: "linear-gradient(120deg, #f8e1f4cc 0%, #c1e7f7cc 100%)",
              borderRadius: "16px",
              boxShadow: "0 4px 20px #e0c3fc44, 0 1px 6px #7e5bef22",
              border: "2px solid #e0c3fc",
              position: "relative",
              overflow: "visible",
              fontFamily: "'Comfortaa', 'Quicksand', cursive, sans-serif",
              transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s"
            }}
            onMouseEnter={e => !isEditing && (e.currentTarget.style.transform = "translateY(-6px) scale(1.025)")}
            onMouseLeave={e => !isEditing && (e.currentTarget.style.transform = "")}
          >
            <span
              className="dream-emoji-overlay"
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                fontSize: "1.4rem",
                filter: "drop-shadow(0 2px 8px #e0c3fc88)",
                zIndex: 2,
                background: "rgba(255,255,255,0.8)",
                borderRadius: "50%",
                padding: "4px 8px",
                boxShadow: "0 2px 8px #e0c3fc44"
              }}
            >
              {emoji}
            </span>
            
            {/* Edit and Delete buttons */}
            <div style={{ position: "absolute", bottom: "12px", right: "16px", display: "flex", gap: "8px", zIndex: 3 }}>
              <button
                onClick={() => startEditing(dream)}
                style={{
                  background: "#7e5bef",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  boxShadow: "0 1px 6px #e0c3fc33"
                }}
                title="Edit dream"
                aria-label="Edit dream"
              >
                ✏️
              </button>
              <button
                onClick={() => onDeleteDream(dream.id)}
                style={{
                  background: "#ffb3b3",
                  color: "#a00",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "0 1px 6px #e0c3fc33"
                }}
                title="Delete dream"
                aria-label="Delete dream"
              >
                ×
              </button>
            </div>

            <div style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#7e5bef",
              marginBottom: 4,
              letterSpacing: 1.2
            }} className="dream-date">
              {dream.date}
            </div>

            {isEditing ? (
              <div style={{ marginBottom: 8 }}>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #e0c3fc",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                    resize: "vertical",
                    minHeight: "60px"
                  }}
                  placeholder="Edit your dream..."
                />
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Category"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    marginTop: "4px",
                    borderRadius: "6px",
                    border: "1px solid #e0c3fc",
                    fontFamily: "inherit",
                    fontSize: "0.9rem"
                  }}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    onClick={() => saveEdit(dream.id)}
                    style={{
                      background: "#7e5bef",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      fontSize: "0.9rem",
                      cursor: "pointer"
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      background: "#ccc",
                      color: "#333",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      fontSize: "0.9rem",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  fontSize: "1.25rem",
                  color: "#23213a",
                  textShadow: "0 1px 8px #e0c3fc33",
                  marginBottom: 6,
                  fontWeight: 400,
                  fontFamily: "'Quicksand', 'Comfortaa', cursive, sans-serif"
                }} className="dream-text">
                  {dream.text}
                </div>
                <div style={{
                  fontSize: "0.95rem",
                  color: "#7e5bef",
                  fontStyle: "italic",
                  marginBottom: 6,
                  opacity: 0.8,
                  borderTop: "1px solid #e0c3fc44",
                  paddingTop: 8
                }} className="ai-summary">
                  <span role="img" aria-label="brain">🧠</span> {aiSummary}
                </div>
                {dream.category && (
                  <div style={{
                    marginTop: 4,
                    fontStyle: "italic",
                    color: "#7e5bef",
                    fontSize: "0.98rem",
                    letterSpacing: 1.1
                  }} className="dream-category">
                    [{dream.category}]
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
  