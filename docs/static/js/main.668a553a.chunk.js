(this["webpackJsonptic-tac-toe-neural-net"]=this["webpackJsonptic-tac-toe-neural-net"]||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),s=n(6),i=n.n(s),a=(n(11),n(3)),o=n.n(a),l=n(5),d=n(2),j=(n(13),n(0));function b(){return Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Welcome to the Tic Tac Toe Neural Net!"}),Object(j.jsx)("p",{children:"The networks consists of a single fully connected layer with values normalized by a stable softmax activation function and a cross-entropy loss function."}),Object(j.jsx)("p",{children:'The goal of this project is to train a simple neural net to classify complete games of Tic Tac Toe as "X-Wins", "O-Wins", or "Draw", under the convention that X always plays first.'}),Object(j.jsxs)("p",{children:["To expand the problem space beyond the finite number of possible 3x3 Tic Tac Toe boards, Xs and Os are represented by random values in the range ",Object(j.jsx)("span",{style:{backgroundColor:"#99b1f4"},children:"(-1, 0)"})," and ",Object(j.jsx)("span",{style:{backgroundColor:"#e4b5b5"},children:"(0, 1)"})," respectively."]}),Object(j.jsx)("p",{children:"WARNING: this webapp does not support Safari! Has been tested with both Chrome and Firefox"})]})}function u(e){return Object(j.jsx)("button",{className:"square",disabled:null!==e.i||e.disabled,onClick:e.onClick,style:0===e.i?{background:"#fff"}:e.i>0?{background:"#e4b5b5"}:{background:"#99b1f4"},children:e.i?e.i.toFixed(4):e.i})}function h(e){var t=e.title,n=e.error,r=e.games;return Object(j.jsxs)("table",{className:"training-boards",children:[Object(j.jsxs)("thead",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:Object(j.jsx)("h3",{children:t})}),Object(j.jsx)("th",{children:"Accuracy"}),Object(j.jsx)("th",{children:n.toFixed(4)})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{id:"board",children:"Input Board"}),Object(j.jsx)("th",{id:"label",children:"True Class"}),Object(j.jsx)("th",{id:"pred",children:"Predicted Class"})]})]}),Object(j.jsx)("tbody",{children:r.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{headers:"board",children:(n=e.game,Object(j.jsxs)("div",{className:"training-board",children:[Object(j.jsxs)("div",{className:"board-row",children:[Object(j.jsx)(u,{i:n[0]}),Object(j.jsx)(u,{i:n[1]}),Object(j.jsx)(u,{i:n[2]})]}),Object(j.jsxs)("div",{className:"board-row",children:[Object(j.jsx)(u,{i:n[3]}),Object(j.jsx)(u,{i:n[4]}),Object(j.jsx)(u,{i:n[5]})]}),Object(j.jsxs)("div",{className:"board-row",children:[Object(j.jsx)(u,{i:n[6]}),Object(j.jsx)(u,{i:n[7]}),Object(j.jsx)(u,{i:n[8]})]})]}))}),Object(j.jsx)("td",{headers:"label",children:e.label}),Object(j.jsx)("td",{headers:"pred",children:e.predicted_class})]},t);var n}))})]})}function x(e){var t=e.weights,n=e.bias,r=[];t.forEach((function(e,t){var n=[];e.forEach((function(e,r){n.push(Object(j.jsx)("td",{headers:"weights",children:e.toFixed(4)},t.toString().concat(r.toString())))})),r.push(n)}));var c=null==n[0]?"":n[0].toFixed(4),s=null==n[1]?"":n[1].toFixed(4),i=null==n[2]?"":n[2].toFixed(4);return Object(j.jsx)("div",{children:Object(j.jsxs)("table",{className:"params-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{id:"bias"}),Object(j.jsx)("th",{id:"bias",children:"Bias"}),Object(j.jsx)("th",{id:"weights",children:"Weights"})]})}),Object(j.jsxs)("tbody",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Class 0 (X Wins)"},"0h"),Object(j.jsx)("td",{headers:"bias",children:c},"0b"),r[0]]},"0r"),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Class 1 (Draw)"},"1h"),Object(j.jsx)("td",{headers:"bias",children:s},"1b"),r[1]]},"1r"),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Class 2 (O Wins)"},"2h"),Object(j.jsx)("td",{headers:"bias",children:i},"2b"),r[2]]},"2r")]})]})})}function O(e){var t=Object(r.useState)(e.default),n=Object(d.a)(t,2),c=n[0],s=n[1];return Object(j.jsxs)("form",{onSubmit:function(t){return function(t){e.onSubmit(e.pythonCall+"("+c+")"),t.preventDefault()}(t)},children:[Object(j.jsx)("label",{htmlFor:"quantity",children:e.label}),Object(j.jsx)("input",{type:"text",id:"trainN",name:"trainN",min:"1",max:"100",onChange:function(e){return s(e.target.value)},value:c}),Object(j.jsx)("input",{type:"submit",value:e.buttonText})]})}function f(){return(f=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./NeuralNet.py");case 2:return t=e.sent,e.next=5,t.text();case 5:n=e.sent,window.pyodide.runPythonAsync(n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout((function(){return e()}),t)}));case 2:if(void 0!==window.pyodide.globals.DATA){e.next=5;break}return e.next=5,p(t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var T=function(){var e=Object(r.useState)("Initializing Python 3.8\n"),t=Object(d.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(!1),i=Object(d.a)(s,2),a=i[0],o=i[1],l=Object(r.useState)({WEIGHTS:[],BIASES:[],TRAINING_DATA:[],TEST_DATA:[],TRAINING_ERROR:1,TEST_ERROR:1}),u=Object(d.a)(l,2),m=u[0],T=u[1];function y(e){window.pyodide.runPythonAsync(e).then((function(e){T(window.pyodide.globals.DATA),c(n+e+"\n")})).catch((function(e){c(n+e+"\n")}))}return Object(r.useEffect)((function(){a||window.languagePluginLoader.then((function(){o(!0),c((function(e){return e+"Python Loaded\n"})),function(){return f.apply(this,arguments)}().then((function(){c((function(e){return e+"Neural Net Scripts Loaded\n"})),p(100).then((function(){T(window.pyodide.globals.DATA),c((function(e){return e+"Trainable parameters randomly initialized\n"}))}))})).catch((function(e){return c((function(t){return t+e+"\n"}))}))}))}),[a]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(b,{}),Object(j.jsx)("div",{className:"python-console",children:n}),Object(j.jsx)(O,{label:"Step 1:",buttonText:"Generate N Training Games",default:"50",pythonCall:"generate_n_training_games",onSubmit:function(e){return y(e)}}),Object(j.jsx)(O,{label:"Step 2:",buttonText:"Generate N Test Games",default:"20",pythonCall:"generate_n_test_games",onSubmit:function(e){return y(e)}}),Object(j.jsx)(O,{label:"Step 3:",buttonText:"Train for N Epochs",default:"10",pythonCall:"train",onSubmit:function(e){return y(e)}}),Object(j.jsx)(x,{weights:m.WEIGHTS,bias:m.BIASES}),Object(j.jsxs)("div",{children:[Object(j.jsx)(h,{title:"Training Dataset",error:m.TRAINING_ERROR,games:m.TRAINING_DATA}),Object(j.jsx)(h,{title:"Test Dataset",error:m.TEST_ERROR,games:m.TEST_DATA})]})]})};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(T,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.668a553a.chunk.js.map