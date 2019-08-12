import React from "react";

export default class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Session",
      break: 5,
      session: 25,
      current: 1500,
      isRunning: false
    };
  }

  handleStartStop = () =>  {
    this.setState(prevState => {
      if(prevState.isRunning) {
        clearInterval(this.clock);
      } else {
        this.clock = setInterval(this.handleDecrement, 1000);
      }
      return {isRunning: !prevState.isRunning}
    })
  }

  handleDecrement = () => {
    this.setState(prevState => {
      // Temporary for testing purposes.
      if (prevState.current === 1) { clearInterval(this.clock)};
      return {
      current: prevState.current - 1
       }
    });
  } 

  handleReset = () => {
    clearInterval(this.clock)
    this.setState({
      type: "Session",
      break: 5,
      session: 25,
      current: 1500,
      isRunning: false
    })
  }

  handleSetLength(isIncrementing, type){
    if (this.state.isRunning) return;
    // If decrementing set length and length of either type is 1 return
    if (!isIncrementing && this.state[type] === 1) return;
    // If incremeanting set length and length of either type is 60 return
    if (isIncrementing && this.state[type] === 60) return;
    this.setState(prevState => ({
      [type]: prevState[type] + (isIncrementing ? 1 : -1)
    }))
  }

  handleTimeFormat(){
    const time = this.state.type === "Session" ? this.state.session * 60 : this.state.break * 60;
    const minutes = String(Math.floor(time / 60)).padStart(2,"0");
    const seconds = String(time % 60).padStart(2,"0");
    return `${minutes}:${seconds}`
  }

  render() {
    return (
      <div id="main">
        <div className={""} id="break-label">Break</div>
        <div className={"buttons"} id="break-decrement" onClick={() => this.handleSetLength(false, "break")}>-</div>
        <div className={"buttons"} id="break-increment" onClick={() => this.handleSetLength(true, "break")}>+</div>
        <div className={""} id="break-length">{this.state.break}</div>
        <div className={""}id="session-label">Session</div>
        <div className={"buttons"}id="session-decrement" onClick={() => this.handleSetLength(false, "session")}>-</div>
        <div className={"buttons"}id="session-increment" onClick={() => this.handleSetLength(true, "session")}>+</div>
        <div className={""}id="session-length">{this.state.session}</div>
        <div className={""}id="timer-label">{this.state.type}</div>
        <div className={""}id="time-left">{this.handleTimeFormat()}</div>
        <div className={""}id="start_stop" onClick={this.handleStartStop}>
          Start Stop
        </div>
        <div id="reset" onClick={this.handleReset}>
          Reset
        </div>
      </div>
    );
  }
}
