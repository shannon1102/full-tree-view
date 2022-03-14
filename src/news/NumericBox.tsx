import React, { Component } from 'react'
import { DisplayType, IData } from './interface'


type State = {
    value: number
}

export default class NumericBox extends Component<IData, State> {
    // state = {
    //     value: this.props.value
    // }
    increment(callback: any): void {
        // this.setState((state) => ({
        //     value: callback(state.value)
        // }))

        

    }
    decrement(callback: any): void {
        this.setState((state) => ({
            value: callback(state.value)
        }))
    }
    drawPlusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => this.decrement(this.props.plusOnlick)}>+</button>
    }
    drawMinusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => this.decrement(this.props.minusOnclick)}>-</button>
    }

    drawValueBox() {
        return <input style={{ width: '4ch', textAlign: 'left'}} value={this.state.value} onChange={() => { }} className='nice-numeric__value'></input>
    }

    render() {
        if (this.props.displayType === DisplayType.RightSide) {
            return this.renderRightSide();
        } else if (this.props.displayType === DisplayType.RightSideBySide) {
            return this.renderRightSideBySide();
        }
        return this.renderSideBySide();
    }
    renderSideBySide() {
        return (
                <div className="nice-numeric nice-numeric--side-by-side">
                    {this.drawMinusButton()}
                    {this.drawValueBox()}
                    {this.drawPlusButton()}
                </div>

        )
    }
    renderRightSide() {
        return (
                <div className="nice-numeric nice-numeric--right-side">
                    {this.drawValueBox()}
                    {this.drawMinusButton()}
                    {this.drawPlusButton()}
                   
                </div>

        )
    }
    renderRightSideBySide() {
        return (
                <div className="nice-numeric">
                  
                        {this.drawValueBox()}
                    <div className='right-side-by-side__value'>
                    </div>
                    <div className="right-side-by-side__column">
                        {this.drawPlusButton()}
                        {this.drawMinusButton()}
                    </div>

                </div>

        )
    }



}