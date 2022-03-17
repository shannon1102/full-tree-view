import React from 'react';
import './App.css';
import { TypeOfNumeric } from './components/EnumNumericType';
import IButton, { PlusButton } from './components/IButton';
import { LRNumeric } from './trash/LRNumeric';
import NumericStrategy from './components/NumericStrategy';
import Numeric from './components/NumericStrategy';
import { SBSNumeric } from './trash/SBSNumeric';
import { UDNumeric } from './trash/UDNumeric';
import NumericBox from './news/NumericBox';
import { DisplayType, IStyle } from './news/interface';
import { Component } from 'react'

import  DepartmentDataService  from './services/department.service';
import { NodeInfo } from './tree-views/interface';
import { TreeView } from './tree-views/TreeView';

const defaultIStyle: IStyle = {
  borderColor: '#FFF',
  backgroundColor: '#FFF',
  foreColor: '#fff'
}
type Props = {}
type State = {
  nodes: NodeInfo[]
}
export default class App extends Component<Props, State> {

  state={
    nodes:[]
  }

  fetch(){

    DepartmentDataService.getAll().then((response:any)=> {
      this.setState({
        nodes : response.data
      })
      console.log("click",response.data)
      console.log(this.state.nodes)
    }).catch((e: Error) => {
      console.log(e);
    });
  }
  componentWillMount(){
    console.log("Trc")
    DepartmentDataService.getAll().then((response:any)=> {
      this.setState({
        nodes : response.data
      })
      console.log(">>>",response.data)
      console.log(this.state.nodes)
    }).catch((e: Error) => {
      console.log(e);
    });
    console.log(">>>")
    
  }
  componentDidMount() {
    console.log("sau")
   
   
  }

  render() {
    return (
      <div className='demo'>
        <button onClick={()=> {
          // this.fetch()
          console.log("S")}}>Fetch</button>
       {/* <TreeView nodes={this.state.nodes}></TreeView> */}
      </div>
    )
  }
}



















{/* <NumericBox plusButtonStyle={defaultIStyle} displayType={DisplayType.RightSide} value={this.state.value1} plusOnlick={(a) => { this.setState({ value1: a + 1 }) }}
          minusOnclick={(a) => { this.setState({ value1: a - 1 }) }}></NumericBox>
        <NumericBox displayType={DisplayType.SideBySide} value={this.state.value2} style={defaultIStyle} plusOnlick={(a) => {
          this.setState({ value2: a + 1 })
        }} minusOnclick={(a) => {this.setState({ value2: a - 1 })}}></NumericBox>
        <NumericBox displayType={DisplayType.RightSideBySide} value={this.state.value3} style={defaultIStyle} plusOnlick={(a) => this.setState({ value3: a + 1 })} minusOnclick={(a) => { this.setState({ value3: a - 1 }) }}></NumericBox> */}
// state = {
  //   value1: 10,
  //   value2: 0,
  //   value3: 0,
  // }