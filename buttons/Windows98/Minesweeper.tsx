import React from "react";

class MineSweeper extends React.Component {
  render() {
    const rows = 9;
    const cols = 9;
    const count = rows * cols;

    return (
      <form className="minesweeperMain" onClick={(e) => {e.stopPropagation()}}>
        {Array.from({ length: count }, (v, i) => i + 1).map((i) => (
          <React.Fragment key={i}>
            <input type="checkbox" id={`c${i}`} />
            <input type="checkbox" id={`f${i}`} />
          </React.Fragment>
        ))}
        <input type="radio" name="mode" id="modeMine" defaultChecked />
        <input type="radio" name="mode" id="modeFlag" />
        <div className="actionSelector">
          <label htmlFor="modeMine">⛏</label>
          <label htmlFor="modeFlag">🚩</label>
        </div>
        <div className="grid">
          {Array.from({ length: count }, (v, i) => i + 1).map((i) => (
            <label key={i} htmlFor={`c${i}`} />
          ))}
        </div>
        <div className="flags">
          {Array.from({ length: count }, (v, i) => i + 1).map((i) => (
            <label key={i} htmlFor={`f${i}`} />
          ))}
        </div>
        <button className="victory" type="reset" tabIndex={-1}>
          Click to restart
        </button>
        {/* <div className="infos">
          <div className="counter" />
          <div className="timer">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="digit" />
            ))}
            <div className="separator" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="digit" />
            ))}
          </div>
        </div> */}
      </form>
    );
  }
}

export default MineSweeper;
