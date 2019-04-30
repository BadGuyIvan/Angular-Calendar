import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  constructor() { }

  current_active_month: Date;
  today: Date = new Date();
  year: number;
  month: number;
  arry_month: Date[] = [];

  Day(year: number, month: number) {
    let day = new Date(year, month, 1);
    /*
      In order to week begins from Sunday need "1" subtract number the first day of the month.
      In order to week begins from Monday need "2" subtract number the first day of the month.
    */
    return new Date(year, month, 1 - day.getDay());
  }

  prevMonth() {
    this.year =
      this.month === 11
        ? this.current_active_month.getFullYear() - 1
        : this.current_active_month.getFullYear();

    this.month = this.current_active_month.getMonth() - 1;

    this.current_active_month = new Date(this.year, this.month);

    this.createCalendar();
  }

  actived_day(event) {
    if (!event.target.classList.contains('hide')) {
      console.log("click ", new Date(this.current_active_month.getFullYear(), this.current_active_month.getMonth(), Number(event.target.innerHTML)))
    }
  }

  trackDay(index: number, item: Date) {
    return index;
  }

  nextMonth() {
    this.year =
      this.month === 0
        ? this.current_active_month.getFullYear() + 1
        : this.current_active_month.getFullYear();

    this.month = this.current_active_month.getMonth() + 1;

    this.current_active_month = new Date(this.year, this.month);

    this.createCalendar();
  }

  createCalendar() {
    let day = this.Day(this.current_active_month.getFullYear(), this.current_active_month.getMonth());
    let count = 0;
    let week = [];
    let _month = [];
    while (count <= 42) {
      if (count % 7 === 0 && week.length) {
        _month.push(week);
        week = [];
      }
      week.push(new Date(day));
      day.setDate(day.getDate() + 1);
      count += 1;
    }
    this.arry_month = _month;
  }

  ngOnInit() {
    this.current_active_month = new Date();
    this.createCalendar();
  }
}
