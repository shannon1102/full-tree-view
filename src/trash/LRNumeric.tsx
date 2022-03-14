import React, { Component } from 'react'
import { IDataAPIDesign } from '../components/IDataAPIDesign'
import { NumericProps } from '../components/NumericStrategy'

type State = {
  value: number
}
export class LRNumeric extends Component<NumericProps,State> implements IDataAPIDesign{
  plus(): void {
    this.setState((state)=> ({
      value:state.value +1
    }))
    console.log("Click plus")
 }
  minus(): void {
    this.setState((state) => ({
      value:state.value -1
    }))
  
  }
  state :State = {
    value:0,
  }
  
  render() {
    return <div className="grid-container--row" style={{backgroundColor: this.props.color ?  this.props.color: '#000000'}}>
    <h3 className="box-value">{this.state.value}</h3>
    <button className="btn--plus" onClick={()=> {this.plus()}} style={{backgroundColor:this.props.buttonColor ? this.props.buttonColor: '#FFFFFF'}}><img className="img-btn" src={process.env.PUBLIC_URL + '/plus.png'} alt="plus" /></button>
    <button className="btn--minus" onClick={()=> {this.minus()}} style={{backgroundColor:this.props.buttonColor ? this.props.buttonColor: '#FFFFFF'}}><img className="img-btn" src={process.env.PUBLIC_URL + '/minus.png'} alt="minus" /></button>    
  </div>
  }
}
