import './App.css'

import React, {useState, useEffect} from 'react'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

const dec = 4

type boardVal = number | null
type boardArray = [boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal]

declare global {

  interface game {
    game: boardArray
    label: number
    predicted_class: number
  }

  interface pythonVars {
    DATA: {
      WEIGHTS: number[][][]
      BIASES: number[][]
      TRAINING_DATA: game[]
      TEST_DATA: game[]
      TRAINING_ERROR: number
      TEST_ERROR: number
    }
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


const gameStatus = {
  XWIN: "X Wins!",
  OWIN: "O Wins!",
  DRAW: "Draw!",
  XN: "Next Player: X",
  ON: "Next Player: 0"
}

function Intro() {
  return (
    <div>
      <h2>Welcome to the Tic Tac Toe Neural Net!</h2>
        <p> This network consists a single fully connected hidden layer with a Rectified Linear activation function.</p>
        <p> For the output layer, values are normalized by a stable softmax activation function and a cross-entropy loss function.</p>
      <p>The goal of this project is to train a simple neural net to classify complete games of Tic Tac Toe as "X-Wins", "O-Wins", or "Draw", under the convention that X always plays first.</p>
      <p>To expand the problem space beyond the finite number of possible 3x3 Tic Tac Toe boards, Xs and Os are represented by random values in the range <span style={{backgroundColor: "#99b1f4"}}>(-1, 0)</span> and <span style={{backgroundColor:  "#e4b5b5"}}>(0, 1)</span> respectively.</p>
      <p>WARNING: this webapp does not support Safari! Has been tested with both Chrome and Firefox</p>
  </div>
  )
}

function getGameStatus(squares: boardArray) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if(!squares[a] || !squares[b] || !squares[c]){
      continue  // skip loop if any of the cells in the line are empty
    }

    if (squares[a] < 0.5 && squares[b] < 0.5 && squares[c] < 0.5){
      return gameStatus.XWIN // Class X wins
    } else if (squares[a] >= 0.5 && squares[b] >= 0.5 && squares[c] >= 0.5) {
      return gameStatus.OWIN; // Class Y wins
    }
  }
  if(squares.includes(null)){
    if(squares.filter(v => v === null).length % 2){
      return gameStatus.XN
    } else {
      return gameStatus.ON
    }
  } else {
    return gameStatus.DRAW // Class Draw
  }
}

function Square(props: any) {

  return (
    <button className="square" 
      disabled={props.i !== null || props.disabled} 
      onClick={props.onClick}
      style={props.i === 0 ? {background: "#fff"} : props.i > 0 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}
      >
      {props.i ? props.i.toFixed(dec): props.i}
    </button>
  )
}

function Board(props: any) {

  const [squares, setSquares] = useState(Array(9).fill(null) as boardArray)
  const [status, setStatus] = useState(gameStatus.XN)

  function handleClick(i: number){
    let sq: boardArray = squares.slice() as boardArray
    sq[i] = status === gameStatus.XN ? Math.random()/2 : 0.5 + Math.random()/2
    let st = getGameStatus(sq)
    // update state, but won't take effect until after render
    setSquares(sq)
    setStatus(st)
  }

  function saveAndReset(){
    props.saveBoard(squares)
    setSquares(Array(9).fill(null) as boardArray)
    setStatus(gameStatus.XN)
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square i={squares[0]} onClick={() => handleClick(0)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[1]} onClick={() => handleClick(1)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[2]} onClick={() => handleClick(2)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
        </div>
        <div className="board-row">
          <Square i={squares[3]} onClick={() => handleClick(3)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[4]} onClick={() => handleClick(4)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[5]} onClick={() => handleClick(5)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
        </div>
        <div className="board-row">
          <Square i={squares[6]} onClick={() => handleClick(6)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[7]} onClick={() => handleClick(7)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
          <Square i={squares[8]} onClick={() => handleClick(8)} disabled={!(status === gameStatus.XN || status === gameStatus.ON)}/>
        </div>
      </div>
      <button onClick={() => saveAndReset()} disabled={status === gameStatus.XN || status === gameStatus.ON}>Add game to Test Dataset</button>
    </div>
  );
}


function TrainingBoard(board: boardArray) {

  return (
    <div className='training-board'>
      <div className="board-row">
        <Square i={board[0]}/>
        <Square i={board[1]}/>
        <Square i={board[2]}/>
      </div>
      <div className="board-row">
        <Square i={board[3]}/>
        <Square i={board[4]}/>
        <Square i={board[5]}/>
      </div>
      <div className="board-row">
        <Square i={board[6]}/>
        <Square i={board[7]}/>
        <Square i={board[8]}/>
      </div>
    </div>
  );
}


function ShowTrainingGames({title, error, games}: {title: string, error: number, games: game[]}) {

  return (
    <table className='training-boards'>
      <thead>
        <tr><th><h3>{title}</h3></th><th>Accuracy</th><th>{error.toFixed(dec)}</th></tr>
        <tr>
        <th id='board'>Input Board</th>
        <th id='label'>True Class</th>
        <th id='pred'>Predicted Class</th>
        </tr>
      </thead>
      <tbody>
        {games.map((g, i) => <tr key={i}><td headers="board">{TrainingBoard(g.game)}</td><td headers='label'>{g.label}</td><td headers='pred'>{g.predicted_class}</td></tr>)} 
      </tbody>
    </table>
  )

}


type tableProps = {
  weights: number[][]
  bias: number[]
}

function Table(props: any) {
  let weights = props.weights
  let bias = props.bias
  
  let dataRows: JSX.Element[][] = []

  weights.forEach(
    (row: number[], i: number) => {
      let cells: JSX.Element[] = []
      row.forEach((val: number, j: number) => {
        cells.push(
          <td headers='weights' key={i.toString().concat(j.toString())}>{val.toFixed(dec)}</td>
        )
      })
      dataRows.push(cells)

    }
  )
  let b0: string = bias[0] == null ? "" : bias[0].toFixed(dec)
  let b1: string = bias[1] == null ? "" : bias[1].toFixed(dec)
  let b2: string = bias[2] == null ? "" : bias[2].toFixed(dec)

  return (
      <div>
      <table className='params-table'>
        <thead>
          <tr>
            <th id='bias'></th><th id='bias'>Bias</th><th id='weights'>Weights</th>
          </tr>
        </thead>
        <tbody>
          <tr key="0r"><th key="0h">Class 0 (X Wins)</th><td headers='bias' key="0b">{b0}</td>{dataRows[0]}</tr>
          <tr key="1r"><th key="1h">Class 1 (Draw)</th><td headers='bias' key='1b'>{b1}</td>{dataRows[1]}</tr>
          <tr key="2r"><th key="2h">Class 2 (O Wins)</th><td headers='bias' key='2b'>{b2}</td>{dataRows[2]}</tr>
        </tbody>
      </table>
    </div>
    )
}

function RunPythonWithParam(props: any){
  const [N, SetN] = useState(props.default)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.onSubmit(props.pythonCall + "(" + N + ")")
    e.preventDefault()
  }

  return(
  <form onSubmit={e => handleSubmit(e)}>
    <label htmlFor="quantity">{props.label}</label>
    <input type="text" id="trainN" name="trainN" min="1" max="100" onChange={e => SetN(e.target.value)} value={N}/>
    <input type="submit" value={props.buttonText}/>
  </form>
  )
}

async function loadNeuralNetScripts()  {
  let response = await fetch('./NeuralNet.py')
  let mlcode = await response.text()
  window.pyodide.runPythonAsync(mlcode)
}

async function delay(ms: number) {
  await new Promise<void>(resolve => setTimeout( () => resolve(), ms));
  if(window.pyodide.globals.DATA === undefined){
    await delay(ms);
  }
}

function App() {
  const [console, setConsole] = useState('Initializing Python 3.8\n')
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [data, setData] = useState({
      WEIGHTS: [] as number[][][],
      BIASES: [] as number[][],
      TRAINING_DATA: [] as game[],
      TEST_DATA: [] as game[],
      TRAINING_ERROR: 1 as number,
      TEST_ERROR: 1 as number
    } as pythonVars['DATA'])

  //Initialize Python
  useEffect(() => {
      if(!pythonLoaded){
        window.languagePluginLoader.then(() => {
          setPythonLoaded(true)
          setConsole(c => c + 'Python Loaded\n')

          //load NeuralNet.py Scripts
          loadNeuralNetScripts().then(() => {
            setConsole(c => c + 'Neural Net Scripts Loaded\n')
            delay(100).then(() => {
              setData(window.pyodide.globals.DATA)
              setConsole(c => c + 'Trainable parameters randomly initialized\n')
          })
          }).catch((err: Error) => setConsole(c => c + err + '\n'))
        })
      }  else {
        // update values?
        //setWeights(window.pyodide.globals.WEIGHTS)
      }
    }, [pythonLoaded])

    function callPython(code: string){
      window.pyodide.runPythonAsync(code)
        .then((output: string)=> {
          setData(window.pyodide.globals.DATA)
          setConsole(console + output + '\n')
        })
        .catch((err: string) => {
            setConsole(console + err + '\n')
        });
    }

  return (
    <div className="App">
      <Intro />     
      <div className='python-console'>{console}</div>
      <RunPythonWithParam label="Step 1:" buttonText="Generate N Training Games" default="1000" pythonCall="generate_n_training_games" onSubmit={(e: string) => callPython(e)}/>
      <RunPythonWithParam label="Step 2:" buttonText="Generate N Test Games" default="100" pythonCall="generate_n_test_games" onSubmit={(e: string) => callPython(e)}/>
      <RunPythonWithParam label="Step 3:" buttonText="Train for N Epochs" default="10" pythonCall="train" onSubmit={(e: string) => callPython(e)}/>
      {/* <Board saveBoard={(b: boardArray) => saveBoard(b)}/> */}
      {/*<Table weights={data.WEIGHTS} bias={data.BIASES}/>*/}
      <div>
        <ShowTrainingGames title={"Training Dataset"} error={data.TRAINING_ERROR} games={data.TRAINING_DATA}/>
        <ShowTrainingGames title={"Test Dataset"} error={data.TEST_ERROR} games={data.TEST_DATA}/>
      </div>
    </div>
  
  )
}


// ========================================

export default App;