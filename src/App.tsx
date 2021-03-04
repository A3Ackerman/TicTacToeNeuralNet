import './App.css'

import React, {useState, useEffect} from 'react'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

const dec = 4

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

function Square() {
  const [val, setVal] = useState(-1.000)
  const [dis, setDis] = useState(false)

  return (
    <button className="square" 
      disabled={dis} 
      onClick={() => {setVal(Math.random()); setDis(true)}}
      style={val < 0 ? {background: "#fff"} : val > 0.5 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}
      >
      {val.toFixed(dec)}
    </button>
  )
}

function Board() {
  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
    </div>
  );
}

function Game(){
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

function TrainingSquare(i: number) {

  return (
    <button className="training-square" style={i > 0.5 ? {background: "#e4b5b5"} : {background: "#99b1f4"}}>
      {i.toFixed(dec)}
    </button>
  );
}

type boardArray = [[number, number, number], [number, number, number], [number, number, number]]

function TrainingBoard(board: boardArray) {

  return (
    <div className='training-board'>
      <div className="board-row">
        {TrainingSquare(board[0][0])}
        {TrainingSquare(board[0][1])}
        {TrainingSquare(board[0][2])}
      </div>
      <div className="board-row">
        {TrainingSquare(board[1][0])}
        {TrainingSquare(board[1][1])}
        {TrainingSquare(board[1][2])}
      </div>
      <div className="board-row">
        {TrainingSquare(board[2][0])}
        {TrainingSquare(board[2][1])}
        {TrainingSquare(board[2][2])}
      </div>
    </div>
  );
}

function ShowTrainingBoards({title, boards}: {title: string, boards: boardArray[]}) {

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
        {boards.map(x => <tr><td headers="board">{TrainingBoard(x)}</td><td headers='label'>X Wins</td><td headers='pred'>Draw</td></tr>)} 
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
    row => {
      let cells: JSX.Element[] = []
      row.forEach(val => {
        cells.push(
          <td headers='weights'>{val.toFixed(dec)}</td>
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
          <tr><th>Class X Wins</th><td headers='bias'>{b0}</td>{dataRows[0]}</tr>
          <tr><th>Class Y Wins</th><td headers='bias'>{b1}</td>{dataRows[1]}</tr>
          <tr><th>Class Draw</th><td headers='bias'>{b2}</td>{dataRows[2]}</tr>
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

  let boards: boardArray[] = [[[0.1,0.2,0.6], [0.1,0.2,0.3], [0.1,0.2,0.3]],[[0.1,0.2,0.3], [0.1,0.2,0.3], [0.1,0.2,0.3]]]

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
        <div className='python-console'>{console}</div>
        <Game />
        <Table weights={weights} bias={bias}/>
        <div>
          <ShowTrainingBoards title={"Training Dataset"} boards={boards}/>
          <ShowTrainingBoards title={"Test Dataset"} boards={boards}/>
        </div>
        
    </div>
  
  )
}


// ========================================

export default App;