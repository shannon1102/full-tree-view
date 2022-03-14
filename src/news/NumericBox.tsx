import React, { Component } from 'react'
import { DisplayType, IData } from './interface'


type State = {
    value: number
}

export default class NumericBox extends Component<IData, State> {
    state = {
        value: 0
    }
    
    componentWillReceiveProps = (nextProps:IData) => {
        console.log(nextProps);
        if (nextProps.value !== this.props.value) {
        //   this.moveMap(nextProps.position)
      
        }
        return null
      }
    decrement(callback: any): void {
        // this.setState((state) => ({
        //     value: callback(state.value)
        // }))
    }
    drawPlusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => {
            debugger
            console.log("???")
            this.props.plusOnlick && this.props.plusOnlick(this.state.value);
            //this.componentWillReceiveProps(this.props)
            // this.forceUpdate()
            // React.useEffect(() => { console.log("component updated"); });

        }}>+</button>
    }
    drawMinusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => this.decrement(this.props.minusOnclick)}>-</button>
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