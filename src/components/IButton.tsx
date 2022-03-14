import React, { Component } from 'react'

interface IPlusStrategy {
    plus(): void
}
interface IMinusStrategy {
    minus(): void
}
type IButtonProps= {
  color: string,
}

type IButtonState = {}

export default class IButton extends Component<IButtonProps, IButtonState> {
  state = {}
  render() {
    return (
        <button className="btn--plus" onClick={()=>{}}><img className="img-btn" src={process.env.PUBLIC_URL + '/plus.png'} alt="button"/></button>
    )
  }
}
export class PlusButton extends IButton implements IPlusStrategy{
    plus(): void {
        console.log("clicked plus strategy");
    }
    render() {
      return <button className="btn--plus" onClick={()=> {this.plus()}}  ><img className="img-btn" src={process.env.PUBLIC_URL + '/plus.png'} alt="plus" /></button>
    }
}
export class MinusButton extends IButton implements IMinusStrategy{
    minus(): void {
      console.log("clicked plus strategy");
    }
    render() {
      return <button className="btn--minus" onClick={()=> {this.minus()}} color={this.props.color}><img className="img-btn" src={process.env.PUBLIC_URL + '/minus.png'} alt="plus" /></button>
    }
}