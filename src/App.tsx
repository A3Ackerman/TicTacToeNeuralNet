import React, {Component} from 'react'
import './App.css'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

interface IAppProps {
}
interface IAppState {
  console: string
}

declare global {
  interface Window {
    languagePluginLoader: any
    app: App
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i: number) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props)
    this.state = {console: "Initializing Python 3.8\n"}
  }

  updateConsole(str: string) {
    this.setState({
      console: this.state.console + str + "\n"
    })
  }

  componentDidMount(){
      window.languagePluginLoader.then(() => {
      this.setState({console: this.state.console + 'Python Loaded!\n'})
    })
  }

  render() {
    return (
      <div className="App">        
          <textarea id='python-console' value={this.state.console} readOnly/>
          <Game />
      </div>
    
    )
  }
}



// ========================================

export default App;