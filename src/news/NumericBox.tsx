import React, { Component } from 'react'
import { DisplayType, IData } from './interface'


// type State = {
//     value: number
// }

export default class NumericBox extends Component<IData> {
    // state = {
    //     value: this.props.value
    // }
    
    // setState(this.state.value)
    // shouldComponentUpdate(nextProps:IData){
    //     console.log("ALoooo");
    //     console.log(nextProps);
    //     return nextProps.value !== this.props.value;
    // }
    componentWillReceiveProps = (nextProps:IData) => {
        console.log('aloooo',nextProps);
        // this.state.value = nextProps.value;
        return (nextProps.value !== this.props.value) 
        //   this.moveMap(nextProps.position)
      }

    drawPlusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => {
            // debugger
            console.log("???")
            this.props.plusOnlick && this.props.plusOnlick(this.props.value);
            //this.componentWillReceiveProps(this.props)
            // this.forceUpdate()
            // React.useEffect(() => { console.log("component updated"); });
            console.log(this.props)
        }}>+</button>
    }
    drawMinusButton() {
        return <button style={{ backgroundColor: this.props.style?.backgroundColor }} className='nice-numeric__btn' onClick={() => (this.props.minusOnclick)}>-</button>
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