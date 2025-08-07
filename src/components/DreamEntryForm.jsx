import { useState } from "react";

const dreamCorpus = [
  "A flying toaster soars above the ocean of stars.",
  "The talking cat whispers secrets in the rainbow forest.",
  "Endless staircases spiral through melting clocks.",
  "Cloud castles drift past the singing moon.",
  "Dancing shadows leap across floating islands.",
  "Whispering winds guide a time-traveling train.",
  "A giant teacup sails over a mirror maze.",
  "Invisible bridges connect glowing jellyfish cities."
];

function buildMarkovChain(corpus) {
  const chain = {};
  corpus.forEach(sentence => {
    const words = sentence.split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
      const key = words[i];
      if (!chain[key]) chain[key] = [];
      chain[key].push(words[i + 1]);
    }
  });
  return chain;
}

function generateMarkovPrompt(chain, minLength = 7, maxLength = 16) {
  const keys = Object.keys(chain);
  let word = keys[Math.floor(Math.random() * keys.length)];
  let result = [word.charAt(0).toUpperCase() + word.slice(1)];
  let length = minLength + Math.floor(Math.random() * (maxLength - minLength));
  for (let i = 1; i < length; i++) {
    const nextWords = chain[word];
    if (!nextWords || nextWords.length === 0) break;
    word = nextWords[Math.floor(Math.random() * nextWords.length)];
    result.push(word);
  }
  let sentence = result.join(" ");
  if (!/[.!?]$/.test(sentence)) sentence += ".";
  return sentence;
}

const dreamFragments = [
  "flying toaster",
  "ocean of stars",
  "talking cat",
  "endless staircase",
  "melting clocks",
  "cloud castles",
  "singing moon",
  "rainbow forest",
  "mirror maze",
  "dancing shadows",
  "floating islands",
  "whispering winds",
  "giant teacup",
  "invisible bridge",
  "glowing jellyfish",
  "time-traveling train"
];

const markovChain = buildMarkovChain(dreamCorpus);

function generatePrompt() {
  return generateMarkovPrompt(markovChain);
}

const forecastTemplates = [
  "Tonight you'll ride a {a} over the {b} {emoji}",
  "Your dreams will be filled with {a} and {b} {emoji}",
  "Expect to meet a {a} in a {b} {emoji}",
  "You will discover a {a} beneath the {b} {emoji}",
  "A {a} will guide you through the {b} {emoji}"
];
const forecastEmojis = ["🌊", "🍞", "🌙", "🦄", "✨", "☁️", "🌀", "💤", "🦋", "🧚"];

function generateForecast() {
  const a = dreamFragments[Math.floor(Math.random() * dreamFragments.length)];
  let b = dreamFragments[Math.floor(Math.random() * dreamFragments.length)];
  while (b === a) b = dreamFragments[Math.floor(Math.random() * dreamFragments.length)];
  const emoji = forecastEmojis[Math.floor(Math.random() * forecastEmojis.length)];
  const template = forecastTemplates[Math.floor(Math.random() * forecastTemplates.length)];
  return template.replace('{a}', a).replace('{b}', b).replace('{emoji}', emoji);
}

function analyzeDreamCategory(dreamText) {
  const text = dreamText.toLowerCase();
  const words = text.split(/\s+/);
  
  // Define category keywords
  const categories = {
    'Nightmare': ['scary', 'fear', 'terror', 'horror', 'monster', 'chase', 'escape', 'dark', 'shadow', 'death', 'dying', 'falling', 'drowning', 'trapped', 'lost', 'alone', 'abandoned', 'attack', 'violence', 'blood', 'pain', 'scream', 'cry', 'panic', 'anxiety', 'stress'],
    'Lucid': ['aware', 'conscious', 'control', 'realize', 'know', 'dream', 'flying', 'float', 'soar', 'teleport', 'magic', 'powers', 'supernatural', 'impossible', 'fantasy', 'wake', 'lucid'],
    'Adventure': ['explore', 'journey', 'travel', 'discover', 'adventure', 'quest', 'mission', 'treasure', 'map', 'island', 'forest', 'mountain', 'cave', 'castle', 'dungeon', 'sword', 'hero', 'battle', 'fight', 'victory', 'win', 'challenge', 'obstacle'],
    'Romantic': ['love', 'romance', 'kiss', 'hug', 'partner', 'boyfriend', 'girlfriend', 'spouse', 'marriage', 'wedding', 'date', 'romantic', 'passion', 'intimate', 'relationship', 'heart', 'soulmate'],
    'Work': ['work', 'job', 'office', 'meeting', 'boss', 'colleague', 'project', 'deadline', 'presentation', 'interview', 'career', 'business', 'client', 'workplace', 'desk', 'computer', 'phone', 'email'],
    'Family': ['family', 'parent', 'mother', 'father', 'mom', 'dad', 'sister', 'brother', 'child', 'baby', 'grandparent', 'cousin', 'aunt', 'uncle', 'home', 'house', 'dinner', 'gathering', 'reunion'],
    'School': ['school', 'class', 'teacher', 'student', 'homework', 'exam', 'test', 'study', 'library', 'campus', 'college', 'university', 'graduation', 'diploma', 'degree', 'assignment', 'project'],
    'Travel': ['travel', 'trip', 'vacation', 'airport', 'plane', 'train', 'car', 'road', 'hotel', 'beach', 'foreign', 'country', 'city', 'tourist', 'sightseeing', 'passport', 'luggage'],
    'Nature': ['nature', 'forest', 'ocean', 'mountain', 'river', 'lake', 'beach', 'garden', 'flower', 'tree', 'animal', 'bird', 'fish', 'sunset', 'sunrise', 'weather', 'rain', 'snow', 'storm'],
    'Fantasy': ['magic', 'wizard', 'witch', 'dragon', 'unicorn', 'fairy', 'elf', 'dwarf', 'kingdom', 'princess', 'prince', 'knight', 'spell', 'wand', 'crystal', 'mythical', 'legendary', 'enchanted'],
    'Sci-Fi': ['space', 'planet', 'alien', 'robot', 'spaceship', 'future', 'technology', 'computer', 'virtual', 'digital', 'cyber', 'time', 'machine', 'laser', 'beam', 'portal', 'dimension'],
    'Social': ['friend', 'party', 'celebration', 'dance', 'music', 'concert', 'crowd', 'people', 'group', 'social', 'network', 'community', 'neighbor', 'acquaintance', 'stranger']
  };
  
  // Count matches for each category
  const categoryScores = {};
  Object.keys(categories).forEach(category => {
    categoryScores[category] = 0;
    categories[category].forEach(keyword => {
      if (text.includes(keyword)) {
        categoryScores[category]++;
      }
    });
  });
  
  // Find the category with the highest score
  let bestCategory = 'Other';
  let highestScore = 0;
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  });
  
  // If no strong matches, return 'Other'
  return highestScore > 0 ? bestCategory : 'Other';
}

export default function DreamEntryForm({ onAddDream }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [prompt, setPrompt] = useState(generatePrompt());
  const [forecast, setForecast] = useState(generateForecast());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    // Auto-analyze and categorize the dream
    const analyzedCategory = analyzeDreamCategory(text);
    
    onAddDream({
      id: Date.now(),
      text,
      date,
      emoji: ["🌙", "✨", "☁️", "💤", "🌀"][Math.floor(Math.random() * 5)],
      category: category.trim() || analyzedCategory
    });
    setText("");
    setCategory("");
    setDate(new Date().toISOString().slice(0, 10));
    setPrompt(generatePrompt());
    setForecast(generateForecast());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{
        background: "rgba(126,91,239,0.12)",
        borderRadius: "10px",
        padding: "12px 16px",
        marginBottom: "12px",
        fontWeight: 500,
        fontSize: "1.13em",
        color: "#7e5bef",
        boxShadow: "0 2px 12px #c1e7f799, 0 0 8px #7e5bef33"
      }}>
        <span role="img" aria-label="crystal ball">🔮</span> <span style={{fontStyle:'italic'}}>{forecast}</span>
        <button
          type="button"
          onClick={() => setForecast(generateForecast())}
          style={{
            marginLeft: 12,
            background: "#e0c3fc",
            border: "none",
            borderRadius: "6px",
            padding: "2px 10px",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          New Forecast
        </button>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.6)",
        borderRadius: "8px",
        padding: "10px 14px",
        marginBottom: "8px",
        fontStyle: "italic",
        fontSize: "1.1em",
        boxShadow: "0 2px 8px #e0c3fc44"
      }}>
        <span role="img" aria-label="sparkle">✨</span> {prompt}
        <button
          type="button"
          onClick={() => setPrompt(generatePrompt())}
          style={{
            marginLeft: 12,
            background: "#f8e1f4",
            border: "none",
            borderRadius: "6px",
            padding: "2px 10px",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          New Prompt
        </button>
      </div>
      <label style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 6, display: 'block', color: '#7e5bef' }}>
        Write your dream
      </label>
      <textarea
        placeholder="Write your dream here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{ width: "100%", padding: "18px", fontSize: "1.35rem", borderRadius: "10px", border: "1.5px solid #e0c3fc", marginBottom: 0, marginTop: 0, fontFamily: 'Quicksand, Comfortaa, cursive, sans-serif', fontWeight: 500, background: 'rgba(255,255,255,0.95)' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e0c3fc', fontFamily: 'inherit', fontSize: '1em' }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e0c3fc', fontFamily: 'inherit', fontSize: '1em', minWidth: 120 }}
        >
          <option value="">AI will suggest category</option>
          <option value="Nightmare">Nightmare</option>
          <option value="Lucid">Lucid</option>
          <option value="Adventure">Adventure</option>
          <option value="Romantic">Romantic</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="School">School</option>
          <option value="Travel">Travel</option>
          <option value="Nature">Nature</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" style={{
          background: '#7e5bef',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 18px',
          fontWeight: 700,
          fontSize: '1em',
          boxShadow: '0 1px 6px #e0c3fc33',
          cursor: 'pointer',
          marginLeft: 'auto'
        }}>Save Dream</button>
      </div>
    </form>
  );
}
