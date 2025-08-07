import React, { useMemo } from 'react';

function WordCloud({ dreams }) {
  const wordData = useMemo(() => {
    if (dreams.length === 0) return [];
    
    // Common words to exclude
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs',
      'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'if', 'then', 'else', 'when', 'where', 'why', 'how', 'what', 'which', 'who', 'whom',
      'so', 'because', 'as', 'since', 'while', 'before', 'after', 'during', 'until',
      'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once',
      'here', 'there', 'whence', 'wherever', 'now', 'then', 'here', 'there', 'anywhere', 'everywhere',
      'very', 'too', 'also', 'just', 'only', 'even', 'still', 'again', 'ever', 'never',
      'much', 'many', 'few', 'little', 'some', 'any', 'all', 'both', 'each', 'every',
      'no', 'yes', 'not', 'yes', 'no', 'okay', 'ok', 'sure', 'certainly', 'definitely',
      'well', 'good', 'bad', 'great', 'nice', 'fine', 'okay', 'ok', 'sure', 'certainly',
      'like', 'love', 'hate', 'want', 'need', 'get', 'got', 'getting', 'gets',
      'see', 'saw', 'seen', 'seeing', 'look', 'looked', 'looking', 'looks',
      'go', 'went', 'gone', 'going', 'goes', 'come', 'came', 'coming', 'comes',
      'make', 'made', 'making', 'makes', 'take', 'took', 'taken', 'taking', 'takes',
      'say', 'said', 'saying', 'says', 'tell', 'told', 'telling', 'tells',
      'know', 'knew', 'known', 'knowing', 'knows', 'think', 'thought', 'thinking', 'thinks',
      'feel', 'felt', 'feeling', 'feels', 'seem', 'seemed', 'seeming', 'seems',
      'try', 'tried', 'trying', 'tries', 'find', 'found', 'finding', 'finds',
      'give', 'gave', 'given', 'giving', 'gives', 'show', 'showed', 'shown', 'showing', 'shows',
      'let', 'lets', 'letting', 'put', 'puts', 'putting', 'set', 'sets', 'setting',
      'keep', 'kept', 'keeping', 'keeps', 'hold', 'held', 'holding', 'holds',
      'bring', 'brought', 'bringing', 'brings', 'carry', 'carried', 'carrying', 'carries',
      'turn', 'turned', 'turning', 'turns', 'move', 'moved', 'moving', 'moves',
      'run', 'ran', 'running', 'runs', 'walk', 'walked', 'walking', 'walks',
      'sit', 'sat', 'sitting', 'sits', 'stand', 'stood', 'standing', 'stands',
      'lie', 'lay', 'lain', 'lying', 'lies', 'sleep', 'slept', 'sleeping', 'sleeps',
      'wake', 'woke', 'woken', 'waking', 'wakes', 'dream', 'dreamed', 'dreaming', 'dreams',
      'time', 'times', 'day', 'days', 'night', 'nights', 'morning', 'evening',
      'year', 'years', 'month', 'months', 'week', 'weeks', 'hour', 'hours',
      'minute', 'minutes', 'second', 'seconds', 'moment', 'moments',
      'place', 'places', 'room', 'rooms', 'house', 'houses', 'home', 'homes',
      'thing', 'things', 'way', 'ways', 'part', 'parts', 'side', 'sides',
      'world', 'worlds', 'life', 'lives', 'people', 'person', 'persons',
      'man', 'men', 'woman', 'women', 'boy', 'boys', 'girl', 'girls',
      'child', 'children', 'kid', 'kids', 'baby', 'babies',
      'family', 'families', 'friend', 'friends', 'love', 'loves', 'loved', 'loving',
      'work', 'works', 'worked', 'working', 'job', 'jobs', 'school', 'schools',
      'car', 'cars', 'road', 'roads', 'street', 'streets', 'way', 'ways',
      'water', 'waters', 'air', 'airs', 'fire', 'fires', 'earth', 'earths',
      'light', 'lights', 'dark', 'darks', 'color', 'colors', 'red', 'blue', 'green', 'yellow',
      'big', 'bigger', 'biggest', 'small', 'smaller', 'smallest',
      'long', 'longer', 'longest', 'short', 'shorter', 'shortest',
      'high', 'higher', 'highest', 'low', 'lower', 'lowest',
      'new', 'newer', 'newest', 'old', 'older', 'oldest',
      'good', 'better', 'best', 'bad', 'worse', 'worst',
      'first', 'second', 'third', 'last', 'next', 'previous',
      'same', 'different', 'other', 'others', 'another', 'each', 'every',
      'some', 'any', 'all', 'none', 'many', 'much', 'few', 'little',
      'more', 'most', 'less', 'least', 'enough', 'too', 'very', 'quite',
      'really', 'actually', 'probably', 'maybe', 'perhaps', 'possibly',
      'definitely', 'certainly', 'surely', 'obviously', 'clearly',
      'right', 'wrong', 'correct', 'incorrect', 'true', 'false',
      'yes', 'no', 'not', 'never', 'always', 'sometimes', 'often', 'rarely',
      'now', 'then', 'here', 'there', 'where', 'when', 'why', 'how',
      'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
      'before', 'after', 'during', 'while', 'since', 'until',
      'because', 'since', 'as', 'though', 'although', 'unless', 'if', 'else',
      'and', 'or', 'but', 'nor', 'yet', 'so', 'for', 'with',
      'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
      'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
      'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside',
      'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out',
      'outside', 'over', 'past', 'since', 'through', 'throughout', 'to', 'toward',
      'under', 'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'
    ]);
    
    // Extract all words from dreams
    const allWords = dreams.flatMap(dream => 
      dream.text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => 
          word.length > 2 && 
          !stopWords.has(word) && 
          !/^\d+$/.test(word)
        )
    );
    
    // Count word frequencies
    const wordCount = {};
    allWords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Convert to array and sort by frequency
    const wordArray = Object.entries(wordCount)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Top 30 words
    
    // Calculate font sizes based on frequency
    const maxCount = wordArray[0]?.count || 1;
    const minSize = 8; // smaller
    const maxSize = 20; // smaller
    
    return wordArray.map(({ word, count }) => ({
      word,
      count,
      size: minSize + ((count / maxCount) * (maxSize - minSize))
    }));
  }, [dreams]);

  if (wordData.length === 0) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.7)",
        borderRadius: "12px",
        padding: "10px",
        textAlign: "center",
        color: "#7e5bef",
        fontStyle: "italic",
        fontSize: "0.95em"
      }}>
        Add some dreams to see your word cloud! 🌙
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.8)",
      borderRadius: "12px",
      padding: "10px",
      marginBottom: "10px",
      boxShadow: "0 2px 8px #e0c3fc22"
    }}>
      <h3 style={{ 
        margin: "0 0 8px 0", 
        color: "#7e5bef", 
        textAlign: "center",
        fontSize: "1em"
      }}>
        🌟 Your Dream Words
      </h3>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60px"
      }}>
        {wordData.map(({ word, count, size }, index) => (
          <span
            key={word}
            style={{
              fontSize: `${size}px`,
              fontWeight: count > 2 ? "bold" : "normal",
              color: count > 3 ? "#7e5bef" : count > 1 ? "#a18cd1" : "#c1e7f7",
              opacity: 0.7 + (count / 10),
              cursor: "default",
              transition: "all 0.2s ease",
              padding: "1px 3px",
              borderRadius: "4px",
              backgroundColor: count > 3 ? "rgba(126,91,239,0.08)" : "transparent"
            }}
            title={`"${word}" appears ${count} time${count !== 1 ? 's' : ''}`}
            onMouseEnter={e => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.opacity = "1";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "scale(1)";
              e.target.style.opacity = 0.7 + (count / 10);
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default WordCloud; 