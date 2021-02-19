import './App.css'

import React, {useState, useEffect} from 'react'

/* React code below based on https://reactjs.org/tutorial/tutorial.html */

declare global {

  interface pythonVars {
    WEIGHTS: Array<Array<number>>
    BIASES: Array<number>
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

function Square(i: number) {
  return (
    <button className="square">
      {/* TODO */}
    </button>
  );
}

function Board() {
  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {Square(0)}
        {Square(1)}
        {Square(2)}
      </div>
      <div className="board-row">
        {Square(3)}
        {Square(4)}
        {Square(5)}
      </div>
      <div className="board-row">
        {Square(6)}
        {Square(7)}
        {Square(8)}
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


type tableProps = {
  data: Array<Array<number>>
}

function Table({data} : tableProps) {
  const dec = 4
  if (data) {
    return (
      <div>
      <table>
        <tr><th>Class X Wins</th>{data[0].map(x => x.toFixed(dec))}</tr>
        <tr><th>Class Y Wins</th>{data[1].map(x => x.toFixed(dec))}</tr>
        <tr><th>Class Draw</th>{data[2].map(x => x.toFixed(dec))}</tr>
      </table>
    </div>
    )
  } else {
    return <div></div>
  }

}

async function loadNeuralNetScripts()  {
  let response = await fetch('./NeuralNet.py')
  let mlcode = await response.text()
  window.pyodide.runPythonAsync(mlcode)
}


function App() {
  const [console, setConsole] = useState('Initializing Python 3.8\n')
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [weights, setWeights] = useState([[],[],[]] as Array<Array<number>>)

  //Initialize Python
  useEffect(() => {
      if(!pythonLoaded){
        window.languagePluginLoader.then(() => {
          setPythonLoaded(true)
          setConsole(c => c + 'Python Loaded!\n')

          //load NeuralNet.py Scripts
          loadNeuralNetScripts().then(() => {
            setConsole(c => c + 'Neural Net Scripts Loaded!\n')
            setWeights(window.pyodide.globals.WEIGHTS)
          }).catch((err: Error) => setConsole(c => c + err + '\n'))
        })
      }  else {
        // update values?
        setWeights(window.pyodide.globals.WEIGHTS)
      }
    }, [pythonLoaded, weights])


  return (
    <div className="App">        
        <div className='python-console'>{console}</div>
        <Game />
        <Table data={weights}/>
    </div>
  
  )
}



// ========================================

export default App;