import './App.css'

import React, {useState, useEffect} from 'react'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

const dec = 4

type boardVal = number | null
type boardArray = [boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal, boardVal]

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
        <p>The networks consists of a single fully connected layer with a sigmoid activation function and cross-entropy loss function.</p>
      <p>The goal of this project is to train a simple neural net to classify complete games of Tic Tac Toe as "X-Wins", "O-Wins", or "Draw", under the convention that X always plays first.</p>
      <p>To expand the problem space beyond the finite number of possible 3x3 Tic Tac Toe boards, Xs and Os are represented by random values in the range <span style={{backgroundColor: "#99b1f4"}}>(0, 0.5)</span> and <span style={{backgroundColor:  "#e4b5b5"}}>(0.5, 1)</span> respectively.</p>
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
      style={props.i == null ? {background: "#fff"} : props.i > 0.5 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}
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


function ShowTrainingBoards({title, boards}: {title: string, boards: boardArray[]}) {

  function classifyGame(g: boardArray){
    window.pyodide.runPythonAsync()
  }

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
        {boards.map((b, i) => <tr key={i}><td headers="board">{TrainingBoard(b)}</td><td headers='label'>{getGameStatus(b)}</td><td headers='pred'>{}</td></tr>)} 
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
}

function App() {
  const [console, setConsole] = useState('Initializing Python 3.8\n')
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [weights, setWeights] = useState([[],[],[]] as number[][])
  const [bias, setBias] = useState([] as string[])
  const [trainData, setTrainData] = useState([])
  const [testData, setTestData] = useState([])


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

    function saveBoard(board: boardArray){
      let cp = testData.slice()
      cp.push(board)
      setTestData(cp)
    }

    function generateTrainingGames(code: string){
      window.pyodide.runPythonAsync(code)
        .then((output: boardArray[])=> {
            setTrainData(trainData.concat(output))
        })
        .catch((err: string) => {
            setConsole(console + err + '\n')
        });
    }

    function generateTestGames(code: string){
      window.pyodide.runPythonAsync(code)
        .then((output: boardArray[])=> {
            setTestData(testData.concat(output))
        })
        .catch((err: string) => {
            setConsole(console + err + '\n')
        });
    }

  return (
    <div className="App">
      <Intro />     
      <div className='python-console'>{console}</div>
      <RunPythonWithParam label="N = " buttonText="Generate N Training Games" default="50" pythonCall="generate_n_games" onSubmit={(e: string) => generateTrainingGames(e)}/>
      <RunPythonWithParam label="N =  " buttonText="Generate N Test Games" default="20" pythonCall="generate_n_games" onSubmit={(e: string) => generateTestGames(e)}/>
      <RunPythonWithParam label="N =  " buttonText="Train for N Epochs" default="10" pythonCall="tran" onSubmit={(e: string) => generateTestGames(e)}/>

      <Board saveBoard={(b: boardArray) => saveBoard(b)}/>
      <Table weights={weights} bias={bias}/>
      <div>
        <ShowTrainingBoards title={"Training Dataset"} boards={trainData}/>
        <ShowTrainingBoards title={"Test Dataset"} boards={testData}/>
      </div>
    </div>
  
  )
}


// ========================================

export default App;