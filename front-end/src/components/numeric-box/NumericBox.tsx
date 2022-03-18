import React, { Component } from 'react'
import { DisplayType, IData } from './interface'


type State = {
    value: number
}

export default class NumericBox extends Component<IData> {
    constructor(props:any) {
		super(props);
	}

	componentWillReceiveProps(nextProps:IData) {
		console.log("Component con da nhan duoc props tu component cha");
	}

    drawPlusButton() { 
        let num =  this.props.value ? this.props.value : 0
        
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => {
            this.props.plusOnlick && this.props.plusOnlick(num);
            console.log(this.props)
        }}>+</button>
    }
    drawMinusButton() {
        let num =  this.props.value ? this.props.value : 0
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => {

            this.props.minusOnclick && this.props.minusOnclick(num);
        }}
            >-</button>
    }
    drawValueBox() {
        return <input style={{ width: '4ch', textAlign: 'left'}} value={this.props.value} onChange={() => { }} className='nice-numeric__value'></input>
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
                  
                    <div className="right-side-by-side__column">
                        {this.drawPlusButton()}
                        {this.drawMinusButton()}
                    </div>

                </div>

        )
    }



}