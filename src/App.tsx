import './App.css'

import React, {useState, useEffect} from 'react'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

const dec = 4
let train_data = require('./train_data.json');
let test_data = require('./test_data.json');


declare global {

  interface pythonVars {
    WEIGHTS: number[][]
    BIASES: string[]
  }

  interface Pyodide {
    runPythonAsync: any
    globals: pythonVars
  }

  interface Window {
    languagePluginLoader: any
    pyodide: Pyodide
  }
}

function Intro() {
  return (
    <div>
      <h2>Welcome to the Tic Tac Toe Neural Net!</h2>
        <p>The networks consists of a single fully connected layer with a sigmoid activation function and cross-entropy loss function</p>
      <p>The goal of this project is to train a simple neural net to classify complete games of Tic Tac Toe as "X-Wins", "O-Wins", or "Draw".</p>
      <p>To expand the problem space beyond the finite number of possible 3x3 Tic Tac Toe boards, Xs and Os are represented by random values in the range (0, 0.5) and (0.5, 1) respectively.</p>
  </div>
  )
}

function Square({i, onClick}: {i: number, onClick: Function}) {
  const [dis, setDis] = useState(false)

  return (
    <button className="square" 
      disabled={dis} 
      onClick={() => {onClick(); setDis(true)}}
      style={i == null ? {background: "#fff"} : i > 0.5 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}
      >
      {i ? i.toFixed(dec): i}
    </button>
  )
}

function Board() {
  const [xNext, setXNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i: number){
    let sq: number[] = squares
    sq[i] = xNext ? Math.random()/2 : 0.5 + Math.random()/2
    setSquares(sq)
    setXNext(!xNext)
  }

  return (
    <div className="game-board">
      <div className="status">{xNext ? "Next player: X": "Next player: O"}</div>
      <div className="board-row">
        <Square i={squares[0]} onClick={() => handleClick(0)}/>
        <Square i={squares[1]} onClick={() => handleClick(1)}/>
        <Square i={squares[2]} onClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square i={squares[3]} onClick={() => handleClick(3)}/>
        <Square i={squares[4]} onClick={() => handleClick(4)}/>
        <Square i={squares[5]} onClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square i={squares[6]} onClick={() => handleClick(6)}/>
        <Square i={squares[7]} onClick={() => handleClick(7)}/>
        <Square i={squares[8]} onClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}

function Game(){
  return (
    <div className="game">
      <Board /> 
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function TrainingSquare(i: number) {

  return (
    <button className="training-square" style={i > 0.5 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}>
      {i.toFixed(dec)}
    </button>
  );
}

type boardArray = [number, number, number, number, number, number, number, number, number]

function TrainingBoard(board: boardArray) {

  return (
    <div className='training-board'>
      <div className="board-row">
        {TrainingSquare(board[0])}
        {TrainingSquare(board[1])}
        {TrainingSquare(board[2])}
      </div>
      <div className="board-row">
        {TrainingSquare(board[3])}
        {TrainingSquare(board[4])}
        {TrainingSquare(board[5])}
      </div>
      <div className="board-row">
        {TrainingSquare(board[6])}
        {TrainingSquare(board[7])}
        {TrainingSquare(board[8])}
      </div>
    </div>
  );
}


type json_board = {game: boardArray, class: number}

function ShowTrainingBoards({title, boards}: {title: string, boards: json_board[]}) {

  return (
    <table className='training-boards'>
      <thead>
        <tr><th><h3>{title}</h3></th></tr>
        <tr>
        <th id='board'>Input Board</th>
        <th id='label'>True Class</th>
        <th id='pred'>Predicted Class</th>
        </tr>
      </thead>
      <tbody>
        {boards.map((x, i) => <tr key={i}><td headers="board">{TrainingBoard(x.game)}</td><td headers='label'>{x.class}</td><td headers='pred'>None</td></tr>)} 
      </tbody>
    </table>
  )

}


type tableProps = {
  weights: number[][]
  bias: string[]
}

function Table({weights, bias} : tableProps) {
  const dec = 4
  
  let dataRows: JSX.Element[][] = []

  weights.forEach(
    (row, i) => {
      let cells: JSX.Element[] = []
      row.forEach((val, j) => {
        cells.push(
          <td headers='weights' key={i.toString().concat(j.toString())}>{val.toFixed(dec)}</td>
        )
      })
      dataRows.push(cells)

    }
  )
  let b0: string = bias[0] == null ? "" : parseFloat(bias[0]).toFixed(dec)
  let b1: string = bias[1] == null ? "" : parseFloat(bias[1]).toFixed(dec)
  let b2: string = bias[2] == null ? "" : parseFloat(bias[2]).toFixed(dec)

  return (
      <div>
      <table className='params-table'>
        <thead>
          <tr>
            <th id='bias'></th><th id='bias'>Bias</th><th id='weights'>Weights</th>
          </tr>
        </thead>
        <tbody>
          <tr key="0r"><th key="0h">Class X Wins</th><td headers='bias' key="0b">{b0}</td>{dataRows[0]}</tr>
          <tr key="1r"><th key="1h">Class Y Wins</th><td headers='bias' key='1b'>{b1}</td>{dataRows[1]}</tr>
          <tr key="2r"><th key="2h">Class Draw</th><td headers='bias' key='2b'>{b2}</td>{dataRows[2]}</tr>
        </tbody>
      </table>
    </div>
    )
}

async function loadNeuralNetScripts()  {
  let response = await fetch('./NeuralNet.py')
  let mlcode = await response.text()
  window.pyodide.runPythonAsync(mlcode)
}

async function delay(ms: number) {
  await new Promise<void>(resolve => setTimeout( () => resolve(), ms));
}

function App() {
  const [console, setConsole] = useState('Initializing Python 3.8\n')
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [weights, setWeights] = useState([[],[],[]] as number[][])
  const [bias, setBias] = useState([] as string[])



  //Initialize Python
  useEffect(() => {
      if(!pythonLoaded){
        window.languagePluginLoader.then(() => {
          setPythonLoaded(true)
          setConsole(c => c + 'Python Loaded\n')

          //load NeuralNet.py Scripts
          loadNeuralNetScripts().then(() => {
            setConsole(c => c + 'Neural Net Scripts Loaded\n')
            delay(2000).then(() => {
              setWeights(window.pyodide.globals.WEIGHTS)
              setBias(window.pyodide.globals.BIASES)
              setConsole(c => c + 'Trainable parameters randomly initialized\n')
          })
          }).catch((err: Error) => setConsole(c => c + err + '\n'))
        })
      }  else {
        // update values?
        //setWeights(window.pyodide.globals.WEIGHTS)
      }
    }, [pythonLoaded])


  return (
    <div className="App">
      <Intro />     
      <div className='python-console'>{console}</div>
      <Game />
      <Table weights={weights} bias={bias}/>
      <div>
        <ShowTrainingBoards title={"Training Dataset"} boards={train_data}/>
        <ShowTrainingBoards title={"Test Dataset"} boards={test_data}/>
      </div>
    </div>
  
  )
}


// ========================================

export default App;