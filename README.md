# 🌙 Dream Journal App

A beautiful, interactive web application for recording and analyzing your dreams with AI-powered insights and visualizations.

## ✨ Features

### 🎯 Core Functionality
- **Dream Recording**: Capture your dreams with rich text descriptions
- **Smart Categorization**: AI automatically categorizes dreams (Nightmare, Lucid, Adventure, Romance, etc.)
- **Date Tracking**: Organize dreams by date with calendar integration
- **Dream Streaks**: Track consecutive days of dream logging with fire emoji motivation

### 🤖 AI-Powered Insights
- **Dream Analysis**: Advanced AI generates poetic summaries and interpretations
- **Category Detection**: Automatically analyzes dream content to suggest appropriate categories
- **Dream Forecasts**: Playful AI-generated predictions for future dreams
- **Writing Prompts**: Markov chain-generated creative prompts to inspire dream recall

### 📊 Visualizations
- **Word Cloud**: Interactive visualization of your most frequent dream words
- **Filtering System**: Filter dreams by category, date, or content
- **Floating Animations**: Dreamy particle effects with stars, orbs, and clouds

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between beautiful gradient themes
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Local Storage**: Your dreams are saved locally in your browser

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dream-journal-app.git
   cd dream-journal-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using the app

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 19.1.0 with Hooks
- **Build Tool**: Vite 7.0.6
- **Styling**: Custom CSS with CSS-in-JS patterns
- **Fonts**: Google Fonts (Quicksand, Comfortaa)
- **State Management**: React useState with custom localStorage hook
- **Linting**: ESLint with React plugins

## 📁 Project Structure

```
src/
├── components/
│   ├── DreamEntryForm.jsx    # Main form for adding dreams
│   ├── DreamList.jsx         # Display and manage dream entries
│   ├── WordCloud.jsx         # Word frequency visualization
│   └── DreamFilter.jsx       # Filter components (legacy)
├── hooks/
│   └── useLocalStorage.js    # Custom hook for browser storage
├── App.jsx                   # Main application component
├── main.jsx                  # React app entry point
└── index.css                 # Global styles and themes
```

## 🎮 Usage Guide

### Recording a Dream
1. Click the "New Forecast" button for inspiration
2. Use the writing prompt if you need creative guidance
3. Write your dream in the text area
4. Select a category (or let AI suggest one)
5. Choose the date and click "Save Dream"

### Managing Dreams
- **Edit**: Click the ✏️ button on any dream entry
- **Delete**: Click the × button to remove a dream
- **Filter**: Use the category dropdown and date picker to filter entries
- **Clear All**: Use the "Clear All Dreams" button to reset your journal

### Viewing Insights
- **Word Cloud**: See your most common dream themes at the top
- **AI Analysis**: Each dream gets a poetic AI-generated interpretation
- **Dream Streaks**: Track your consistency with the streak counter

## 🎨 Customization

### Themes
The app supports both light and dark modes with beautiful gradient backgrounds:
- **Light Mode**: Soft pastels (pink, blue, cream)
- **Dark Mode**: Deep purples and blues with glowing effects

### Categories
Default categories include:
- Nightmare, Lucid, Adventure, Romantic
- Work, Family, School, Travel
- Nature, Fantasy, Sci-Fi, Social, Other

### AI Features
- Markov chain text generation for prompts
- Keyword-based category detection
- Poetic dream interpretation templates


## 🙏 Acknowledgments

- Inspired by the fascinating world of dream analysis and psychology
- Beautiful gradient designs inspired by dreamy, ethereal aesthetics
- AI analysis concepts based on natural language processing techniques
- Community feedback and suggestions for feature improvements

## 🐛 Known Issues

- Dreams are stored locally in browser storage (not synced across devices)
- Word cloud may not display properly with very few dreams
- Some AI categorizations may need manual adjustment

## 🔮 Future Features

- [ ] Cloud synchronization for cross-device access
- [ ] Advanced dream pattern analysis
- [ ] Social sharing capabilities
- [ ] Export dreams to PDF or JSON
- [ ] Advanced search and filtering
- [ ] Dream journal statistics and insights
- [ ] Integration with sleep tracking apps

---

**Sweet dreams! 🌙✨**

*Remember: The best way to remember your dreams is to write them down as soon as you wake up. Keep this app bookmarked and make dream journaling a daily habit!*
