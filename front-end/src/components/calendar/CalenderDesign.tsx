import { LayoutType } from "./Enum"
import './index.css'

export class Calendar {
    renderNextYearButton() {
        return <button className="btn--next-year"></button>
    }
    renderPrevYearButton() {
        return <button className="btn--prev-year"></button>
    }
    renderNextMonthBtn() {
        return <button className="btn--next-month"></button>
    }
    renderPrevMonthBtn() {
        return <button className="btn--prev-month"></button>
    }
    renderMonthYearBox() {
        return <button className="btn--next-year"></button>
    }
    renderHeader() {
        return (
            <div className="calender">
                <div className="prev-div">
                    {this.renderPrevYearButton()}
                    {this.renderPrevMonthBtn()}
                </div>
                {this.renderMonthYearBox()}
                <div className="next-div">
                    {this.renderNextMonthBtn()}
                    {this.renderNextYearButton()}
                </div>
            </div>
        )
    }
    renderDaysBar() {
        return <div className="day-bars">
            <table>
                <thead>
                    <tr>
                        <th>
                            Monday
                        </th>
                        <th>
                            Tue
                        </th>
                        <th>
                            Wen
                        </th>
                        <th>
                            Thus
                        </th>

                        <th>
                            Fri
                        </th>

                        <th>
                            Sat
                        </th>

                        <th>
                            Sun
                        </th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <th>
                            Monday
                        </th>
                        <th>
                            Tue
                        </th>
                        <th>
                            Wen
                        </th>
                        <th>
                            Thus
                        </th>
                        <th>
                            Fri
                        </th>
                        <th>
                            Sat
                        </th>
                        <th>
                            Sun
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    }
    renderDatesBody() {
    }
    render() {
        if (LayoutType.YearDayMonth) {
            return <div>YearDayMonth</div>
        } else if (LayoutType.YearMonthDay) {
            return <div>YearMonthDay</div>
        }
    }
}