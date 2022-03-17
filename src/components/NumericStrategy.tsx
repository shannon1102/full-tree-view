import React, { Component, EventHandler } from 'react'
import { BACKGROUND_COLOR, BUTTON_COLOR } from './constants/constants'
import { TypeOfNumeric } from './EnumNumericType'
import { IDataAPIDesign } from './IDataAPIDesign'


export interface NumericProps {
  type: string,
  color?: string,
  buttonColor?: string,
  plusSrc?: string,
  minusSrc?: string,
  width?: number,
  // click?: ToggleProps

}
interface ToggleProps {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}
type State = {
  value: number
}
export default class NumericStrategy extends Component<NumericProps, State> implements IDataAPIDesign {
 
  plus(): void {
    this.setState((state) => ({
      value: state.value + 1
    }))
  }
  minus(): void {
    this.setState((state) => ({
      value: state.value - 1
    }))
  } 
  state = {
    value: 0
  }
  
  render() {
    return (
      <div className='container'>
        <div className={"grid-container--" + this.props.type} style={{ backgroundColor: this.props.color ? this.props.color : BACKGROUND_COLOR }}>
          <h1 className="box-value">{this.state.value}</h1>
          <button className="btn--plus" onClick={() => { this.plus() }} style={{ backgroundColor: this.props.buttonColor ? this.props.buttonColor : BUTTON_COLOR }}><img className="img-btn" src={this.props.plusSrc ? this.props.plusSrc : process.env.PUBLIC_URL + '/plus.png'} alt="plus" /></button>
          <button className="btn--minus" onClick={() => { this.minus() }} style={{ backgroundColor: this.props.buttonColor ? this.props.buttonColor : BUTTON_COLOR }}><img className="img-btn" src={this.props.minusSrc ? this.props.minusSrc : process.env.PUBLIC_URL + '/minus.png'} alt="minus" /></button>
        </div>
      </div>
    )
  }
}
class ChildNumeric extends NumericStrategy {

  
} 

