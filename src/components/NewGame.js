import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";

export function NewGame() {
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  function handlePlayerSelection(player) {
    // Toggle player selection for the first team
    if (team1Players.includes(player)) {
      setTeam1Players(team1Players.filter(p => p !== player));
    } else {
      setTeam1Players([...team1Players, player]);
    }

    // Remove player from the second team if already selected
    setTeam2Players(team2Players.filter(p => p !== player));
  }

  function handlePlayer2Selection(player) {
    // Toggle player selection for the second team
    if (team2Players.includes(player)) {
      setTeam2Players(team2Players.filter(p => p !== player));
    } else {
      setTeam2Players([...team2Players, player]);
    }

    // Remove player from the first team if already selected
    setTeam1Players(team1Players.filter(p => p !== player));
  }

  function handleNextClick() {
    // TODO: Go to the next step of the game setup
  }

  const allPlayers = [
    { id: 1, name: 'LeBron James' },
    { id: 2, name: 'Stephen Curry' },
    { id: 3, name: 'Kevin Durant' },
    { id: 4, name: 'James Harden' },
    { id: 5, name: 'Giannis Antetokounmpo' },
    // Add more players here...
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Glenarden Rec', "Ardmore's Court", 'Kentland Rec', 'Lake Arbor Rec'];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="newgame">
      <Home />
      <div style={{ width: "80vw", marginLeft: "auto", marginRight: "auto", paddingTop: "4vh" }}>
        <div className="row">
          <div className="col-md-6">
            <h2>What type of game are you planning?</h2>
            <form>
              <label><input type="radio" />1 versus 1</label><br />
              <label><input type="radio" />2 versus 2</label><br />
              <label><input type="radio" />3 versus 3</label><br />
              <label><input type="radio" />4 versus 4</label><br />
              <label><input type="radio" />5 versus 5</label><br />
            </form>
            <br />
          </div>

          <div className="col-md-6">
            {/* ############################   SELECT TARGET SCORE  ########################################## */}

            <h4>What is the target score? (Points needed to win)</h4>
            <input type="text" />
            <button style={{ display: "inline", marginLeft: "10px", backgroundColor: "#1469f6", color: "white" }}>  Set target score</button>
            <br /><br />
            <h4>Where are you playing? (Court Location)</h4>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ############################   SELECT TEAM 1  ########################################## */}

        <h2 className="mb-4" style={{ marginLeft: "38%" }}>Select Players</h2>

        <div className="row">
          <div className="col-md-6">
            <h3 style={{ color: "blue" }}>Team 1</h3>
            <ul className="list-group mb-3" style={{ width: "80%" }}>
              {allPlayers.map(player => (
                <li
                  key={player.id}
                  className={`list-group-item ${team1Players.includes(player) ? 'active' : ''}`}
                  onClick={() => handlePlayerSelection(player)}
                >
                  {player.name}
                </li>
              ))}
            </ul>
          </div>

          {/* ############################   SELECT TEAM 2  ########################################## */}

          <div className="col-md-6">
            <h3 style={{ color: "red" }}>Team 2</h3>
            <ul className="list-group mb-3" style={{ width: "80%" }}>
              {allPlayers.map(player => (
                <li
                  key={player.id}
                  className={`list-group-item ${team2Players.includes(player) ? 'active' : ''}`}
                  onClick={() => handlePlayer2Selection(player)}
                >
                  {player.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="btn btn-primary float-end" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}