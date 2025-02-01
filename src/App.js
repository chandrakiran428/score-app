import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]); // List of players
  const [newPlayer, setNewPlayer] = useState(''); // Input for new player name
  const [scores, setScores] = useState({}); // Scores for each player
  const [cutoffScore, setCutoffScore] = useState(null); // Cutoff score
  const [scoreInputs, setScoreInputs] = useState({}); // Input fields for each player

  // Add a new player
  const addPlayer = () => {
    if (newPlayer.trim() === '') return; // Prevent empty names
    if (!players.includes(newPlayer)) {
      setPlayers([...players, newPlayer]);
      setScores({ ...scores, [newPlayer]: [] }); // Initialize scores for the new player
      setScoreInputs({ ...scoreInputs, [newPlayer]: '' }); // Initialize input field as empty
    }
    setNewPlayer(''); // Clear input
  };

  // Remove a player
  const removePlayer = (player) => {
    const updatedPlayers = players.filter((p) => p !== player);
    const updatedScores = { ...scores };
    const updatedInputs = { ...scoreInputs };
    delete updatedScores[player]; // Remove the player's scores
    delete updatedInputs[player]; // Remove the player's input field
    setPlayers(updatedPlayers);
    setScores(updatedScores);
    setScoreInputs(updatedInputs);
  };

  // Add a score for a specific player
  const addScore = (player) => {
    const score = scoreInputs[player];
    if (isNaN(score) || score === '') {
      alert('Please enter a valid number.'); // Show alert if input is invalid
      return;
    }
    const updatedScores = { ...scores, [player]: [...scores[player], parseInt(score)] };
    setScores(updatedScores);
    setScoreInputs({ ...scoreInputs, [player]: '' }); // Reset input field to empty
  };

  // Calculate the total score for a player
  const calculateTotal = (player) => {
    return scores[player].reduce((total, score) => total + score, 0);
  };

  // Clear all scores for all players
  const clearAllScores = () => {
    const resetScores = {};
    players.forEach((player) => {
      resetScores[player] = [];
    });
    setScores(resetScores);
  };

  // Set the cutoff score
  const setCutoff = () => {
    const score = parseInt(prompt('Enter the cutoff score:'));
    if (!isNaN(score)) {
      setCutoffScore(score);
    }
  };

  // Get the last 5 scores for a player
  const getLastFiveScores = (player) => {
    return scores[player].slice(-5); // Slice the last 5 scores
  };

  return (
    <div className="App">
      {/* Main Content */}
      <div className="content">
        <h1>Group Score Tracker</h1>

        {/* Add Player Section */}
        <div className="add-player">
          <input
            type="text"
            placeholder="Enter player name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
          <button onClick={addPlayer}>Add Player</button>
        </div>

        {/* Cutoff Score Button */}
        <div className="cutoff-section">
          <button onClick={setCutoff}>Set Cutoff Score</button>
          {cutoffScore !== null && <p>Cutoff Score: {cutoffScore}</p>}
        </div>

        {/* Clear All Scores Button */}
        <div className="clear-scores">
          <button onClick={clearAllScores}>Clear All Scores</button>
        </div>

        {/* Display Players and Scores */}
        <div className="players-list">
          {players.map((player, index) => (
            <div key={index} className="player">
              <h3>
                {player}{' '}
                <button onClick={() => removePlayer(player)} className="remove-player">
                  Remove
                </button>
              </h3>
              <div className="scores">
                {getLastFiveScores(player).map((score, idx) => (
                  <span key={idx}>{score}</span>
                ))}
              </div>
              <div className="score-input">
                <input
                  type="number"
                  placeholder="Enter number"
                  value={scoreInputs[player]}
                  onChange={(e) =>
                    setScoreInputs({ ...scoreInputs, [player]: e.target.value })
                  }
                />
                <button onClick={() => addScore(player)}>Submit</button>
              </div>
              <p>Total: {calculateTotal(player)}</p>
              <button
                className={`in-game-button ${
                  cutoffScore !== null && calculateTotal(player) >= cutoffScore ? 'eliminated' : ''
                }`}
              >
                {cutoffScore !== null && calculateTotal(player) >= cutoffScore
                  ? 'Eliminated'
                  : 'In-Game'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>Love from MANU PG Bangalore</p>
        <p>&copy; 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;