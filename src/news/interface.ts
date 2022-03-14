export interface IStyle {
    borderColor: string | '#009dda';
    backgroundColor: string |'#009dda';
    foreColor: string | '#000000'; 
}

export enum DisplayType {
    SideBySide,
    RightSideBySide,
    RightSide
}

export interface IGeneralInputProperties<TValue> {
    style?: IStyle;
    value?: TValue;
}

export interface INumericBoxBehavior {
    plusOnlick?: (v: number) => number;
    minusOnclick?: (v: number) => number;
}

export interface INumericBoxStyles {
    plusButtonStyle?: IStyle;
    minusButtonStyle?: IStyle;
}

export interface IData extends IGeneralInputProperties<number>, INumericBoxBehavior, INumericBoxStyles {
    displayType?: DisplayType;
}