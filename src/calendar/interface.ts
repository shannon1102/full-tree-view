import { LayoutType } from "./Enum";

export interface ICommonStyles {
    backgroundColor: string;
    foreColor: string;
}
export interface IMonthYearBoxStyle extends ICommonStyles { //Header
    fontFamily: string;
}
export interface IDaysBarStyle extends ICommonStyles { //Header
    fontFamily: string;
}
export interface IDateStyle extends ICommonStyles {
}
export interface IBtnStyle extends ICommonStyles {
    border: string;
}
export interface ICalendarBehavior {
    nextMonthBtnClick(): void;
    prevMonthBtnClick(): void;
    prevYearBtnClick(): void;
    nextYearBtnClick(): void;
}
export interface ICalenderStyles {
    monthYearBoxStyle: IMonthYearBoxStyle;
    dayBarStyle: IDaysBarStyle;
    dateStyle: IDateStyle;
}
export interface ICalenderBtnStyles {
    nextMonthBtnStyle: IBtnStyle;
    prevMonthBtnStyle: IBtnStyle;
    prevYearBtnStyle: IBtnStyle;
    nextYearBtnStyle: IBtnStyle;
}
export interface IDataCalender extends ICalendarBehavior, ICalenderStyles {
    layOutType?: LayoutType;

}