(this["webpackJsonptic-tac-toe-neural-net"]=this["webpackJsonptic-tac-toe-neural-net"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e){e.exports=JSON.parse('[{"game":[0.6,0,0,0,0.7,0,0,0,0.8],"class":2},{"game":[0,0,0,0,0,0,0,0,0],"class":0}]')},function(e){e.exports=JSON.parse('[{"game":[0,0,0,0,0,0,0,0,0],"class":2},{"game":[0,0,0,0,0,0,0,0,0],"class":0}]')},function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(6),i=n.n(r),a=(n(11),n(3)),o=n.n(a),j=n(5),d=n(2),l=(n(13),n(0)),b=n(15),u=n(16);function h(){return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Welcome to the Tic Tac Toe Neural Net!"}),Object(l.jsx)("p",{children:"The networks consists of a single fully connected layer with a sigmoid activation function and cross-entropy loss function"}),Object(l.jsx)("p",{children:'The goal of this project is to train a simple neural net to classify complete games of Tic Tac Toe as "X-Wins", "O-Wins", or "Draw".'}),Object(l.jsx)("p",{children:"To expand the problem space beyond the finite number of possible 3x3 Tic Tac Toe boards, Xs and Os are represented by random values in the range (0, 0.5) and (0.5, 1) respectively."})]})}function O(e){var t=e.i,n=e.onClick,s=Object(c.useState)(!1),r=Object(d.a)(s,2),i=r[0],a=r[1];return Object(l.jsx)("button",{className:"square",disabled:i,onClick:function(){n(),a(!0)},style:null==t?{background:"#fff"}:t>.5?{background:"#e4b5b5"}:{background:"#99b1f4"},children:t?t.toFixed(4):t})}function x(){var e=Object(c.useState)(!0),t=Object(d.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(Array(9).fill(null)),i=Object(d.a)(r,2),a=i[0],o=i[1];function j(e){var t=a;t[e]=n?Math.random()/2:.5+Math.random()/2,o(t),s(!n)}return Object(l.jsxs)("div",{className:"game-board",children:[Object(l.jsx)("div",{className:"status",children:n?"Next player: X":"Next player: O"}),Object(l.jsxs)("div",{className:"board-row",children:[Object(l.jsx)(O,{i:a[0],onClick:function(){return j(0)}}),Object(l.jsx)(O,{i:a[1],onClick:function(){return j(1)}}),Object(l.jsx)(O,{i:a[2],onClick:function(){return j(2)}})]}),Object(l.jsxs)("div",{className:"board-row",children:[Object(l.jsx)(O,{i:a[3],onClick:function(){return j(3)}}),Object(l.jsx)(O,{i:a[4],onClick:function(){return j(4)}}),Object(l.jsx)(O,{i:a[5],onClick:function(){return j(5)}})]}),Object(l.jsxs)("div",{className:"board-row",children:[Object(l.jsx)(O,{i:a[6],onClick:function(){return j(6)}}),Object(l.jsx)(O,{i:a[7],onClick:function(){return j(7)}}),Object(l.jsx)(O,{i:a[8],onClick:function(){return j(8)}})]})]})}function f(){return Object(l.jsxs)("div",{className:"game",children:[Object(l.jsx)(x,{}),Object(l.jsxs)("div",{className:"game-info",children:[Object(l.jsx)("div",{}),Object(l.jsx)("ol",{})]})]})}function p(e){return Object(l.jsx)("button",{className:"training-square",style:e>.5?{background:"#e4b5b5"}:{background:"#99b1f4"},children:e.toFixed(4)})}function m(e){var t=e.title,n=e.boards;return Object(l.jsxs)("table",{className:"training-boards",children:[Object(l.jsxs)("thead",{children:[Object(l.jsx)("tr",{children:Object(l.jsx)("th",{children:Object(l.jsx)("h3",{children:t})})}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{id:"board",children:"Input Board"}),Object(l.jsx)("th",{id:"label",children:"True Class"}),Object(l.jsx)("th",{id:"pred",children:"Predicted Class"})]})]}),Object(l.jsx)("tbody",{children:n.map((function(e,t){return Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{headers:"board",children:(n=e.game,Object(l.jsxs)("div",{className:"training-board",children:[Object(l.jsxs)("div",{className:"board-row",children:[p(n[0]),p(n[1]),p(n[2])]}),Object(l.jsxs)("div",{className:"board-row",children:[p(n[3]),p(n[4]),p(n[5])]}),Object(l.jsxs)("div",{className:"board-row",children:[p(n[6]),p(n[7]),p(n[8])]})]}))}),Object(l.jsx)("td",{headers:"label",children:e.class}),Object(l.jsx)("td",{headers:"pred",children:"None"})]},t);var n}))})]})}function g(e){var t=e.weights,n=e.bias,c=[];t.forEach((function(e,t){var n=[];e.forEach((function(e,c){n.push(Object(l.jsx)("td",{headers:"weights",children:e.toFixed(4)},t.toString().concat(c.toString())))})),c.push(n)}));var s=null==n[0]?"":parseFloat(n[0]).toFixed(4),r=null==n[1]?"":parseFloat(n[1]).toFixed(4),i=null==n[2]?"":parseFloat(n[2]).toFixed(4);return Object(l.jsx)("div",{children:Object(l.jsxs)("table",{className:"params-table",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{id:"bias"}),Object(l.jsx)("th",{id:"bias",children:"Bias"}),Object(l.jsx)("th",{id:"weights",children:"Weights"})]})}),Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Class X Wins"},"0h"),Object(l.jsx)("td",{headers:"bias",children:s},"0b"),c[0]]},"0r"),Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Class Y Wins"},"1h"),Object(l.jsx)("td",{headers:"bias",children:r},"1b"),c[1]]},"1r"),Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Class Draw"},"2h"),Object(l.jsx)("td",{headers:"bias",children:i},"2b"),c[2]]},"2r")]})]})})}function v(){return(v=Object(j.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./NeuralNet.py");case 2:return t=e.sent,e.next=5,t.text();case 5:n=e.sent,window.pyodide.runPythonAsync(n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout((function(){return e()}),t)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var y=function(){var e=Object(c.useState)("Initializing Python 3.8\n"),t=Object(d.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),i=Object(d.a)(r,2),a=i[0],o=i[1],j=Object(c.useState)([[],[],[]]),O=Object(d.a)(j,2),x=O[0],p=O[1],y=Object(c.useState)([]),N=Object(d.a)(y,2),k=N[0],T=N[1];return Object(c.useEffect)((function(){a||window.languagePluginLoader.then((function(){o(!0),s((function(e){return e+"Python Loaded\n"})),function(){return v.apply(this,arguments)}().then((function(){s((function(e){return e+"Neural Net Scripts Loaded\n"})),function(e){return w.apply(this,arguments)}(2e3).then((function(){p(window.pyodide.globals.WEIGHTS),T(window.pyodide.globals.BIASES),s((function(e){return e+"Trainable parameters randomly initialized\n"}))}))})).catch((function(e){return s((function(t){return t+e+"\n"}))}))}))}),[a]),Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(h,{}),Object(l.jsx)("div",{className:"python-console",children:n}),Object(l.jsx)(f,{}),Object(l.jsx)(g,{weights:x,bias:k}),Object(l.jsxs)("div",{children:[Object(l.jsx)(m,{title:"Training Dataset",boards:b}),Object(l.jsx)(m,{title:"Test Dataset",boards:u})]})]})};i.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root"))}],[[17,1,2]]]);
//# sourceMappingURL=main.3c3f1e62.chunk.js.map