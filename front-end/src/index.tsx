import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TreeNode } from './components/tree-views/TreeNode';
import { NodeInfo } from './components/tree-views/interface';
import { TreeView } from './components/tree-views/TreeView';

const dto = {
  value1: 10,
  value2: 0,
  value3: 0,
};
const test: NodeInfo[] = [
  {
  
    id:"1",
    code: "1.2.4",
    name: "node2",
    children:[]
  },
  {
  
    id:"4",
    code: "1.2.4",
    name: "node1",
    children:[]
  },
  {
  
    id:"5",
    code: "1.2.4",
    name: "node1",
    children: [
      {
        id:"6",
        code: "1.2.4",
        name: "node1",
        children: [
          {
      
            id:"7",
            code: "1.2.4",
            name: "nodexxx",
            children: [
              {
          
                id:"9",
                code: "1.2.4",
                name: "nodexxxxxx",
                children:[]
              }
        
            ]
          },
      
              {
          
                id:"10",
                code: "1.2.4",
                name: "nodexxaaaaaxxxx",
                children:[]
              }
        ]
      }

    ]
  }

]
ReactDOM.render(
  <React.StrictMode>
  <App/>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
