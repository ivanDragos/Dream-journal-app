import { useState } from "react";

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

export default function DreamForecast() {
  const [forecast, setForecast] = useState(generateForecast());

  return (
    <div className="dream-forecast" style={{
      background: "rgba(126,91,239,0.12)",
      borderRadius: "10px",
      padding: "12px 16px",
      marginBottom: "18px",
      fontWeight: 500,
      fontSize: "1.13em",
      color: "#7e5bef",
      boxShadow: "0 2px 12px #c1e7f799, 0 0 8px #7e5bef33",
      display: "flex",
      alignItems: "center"
    }}>
      <span role="img" aria-label="crystal ball" style={{fontSize: "1.3em", marginRight: 8}}>🔮</span>
      <span style={{fontStyle:'italic', flex: 1}}>{forecast}</span>
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
  );
}