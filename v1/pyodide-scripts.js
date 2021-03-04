

/*
function addToOutput(s) {
    output.value += '>>>' + code.value + '\n' + s + '\n';
}


async function evaluatePython() {
    pyodide.runPythonAsync(code.value)
        .then(output => {
            addToOutput(output);
            updateTable();
        })
        .catch((err) => {
            addToOutput(err)
        });
}

async function loadNeuralNetScripts() {
    response = await fetch('/NeuralNet.py');
    mlcode = await response.text();
    pyodide.runPythonAsync(mlcode)
        .then(() => {
            output.value += 'Neural Net Scripts Loaded!\n';
            updateTable();
        })
        .catch((err) => output.value += err);
}

async function updateTable() {
    var table = document.getElementById("weights");
    var rows = table.rows;
    var weights = await pyodide.globals.WEIGHTS;
    for (i = 0; i < weights.length; i++) {
        var row = rows.item(i + 1);
        var vals = weights[i];
        for (j = 0; j < vals.length; j++) {
            try {
                row.deleteCell(j + 1);
            } catch (err) {
                // console.log(err)
            }
            var cell = row.insertCell(j + 1);
            cell.innerText = parseFloat(vals[j]).toFixed(4);
        }
    }
}
*/