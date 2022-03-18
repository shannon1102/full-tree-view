import { IData, IStyle, DisplayType } from './interface';

export class NumericBoxDesign  {
  data: IData | undefined;

  drawPlusButton() {}


  drawMinusButton() {}

  render() {
    const type = this.data?.displayType;

    if (type === DisplayType.RightSide) {
      this.renderRightSide();
    } else if (type === DisplayType.RightSideBySide) {
      this.renderRightSideBySide();
    }
  }
  renderRightSideBySide() { 
  }

  

  renderRightSide() {
    return [this.drawMinusButton(), 'textbox', this.drawPlusButton()];
  }
}