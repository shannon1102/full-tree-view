import React from 'react';
import './App.css';
import NumericBox from './components/numeric-box/NumericBox';
import { DisplayType, IStyle } from './components/numeric-box/interface';
import { Component } from 'react'
import axios from 'axios';
import DepartmentDataService from './services/department.service';
import { NodeInfo } from './components/tree-views/interface';
import { TreeView } from './components/tree-views/TreeView';

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

  state = {
    nodes: []
  }

  componentDidMount() {
    console.log("sau")
    DepartmentDataService.getAll()
      .then(res => {
        const nodes = res.data;
        this.setState({ nodes });
      })
  }

  componentWillMount() {
    console.log("Trc")
    DepartmentDataService.getAll().then((response: any) => {
      this.setState({
        nodes: response.data
      })
      console.log(">>>", response.data)
      console.log(this.state.nodes)
    }).catch((e: Error) => {
      console.log(e);
    });
    console.log(">>>")

  }

  render() {
    console.log("render dc chay 2 lan")
    return (
      <div className='demo'>{
        this.state.nodes.length && this.state.nodes.length >= 0 && <TreeView nodes={this.state.nodes}></TreeView>
      }

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