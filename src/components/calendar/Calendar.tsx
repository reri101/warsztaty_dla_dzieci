import React, { useState, useRef } from "react";
import ReactCalendar from "react-calendar";
import "./calendar.css";
import {
  add,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns";
import {
  STORE_OPENING_TIME,
  STORE_CLOSE_TIME,
  INTERVAL,
} from "../../constants/config";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const resetTime = (date: Date) => {
  return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
};

function Calendar() {
  const [date, setDate] = useState<DateType>({
    justDate: resetTime(new Date()),
    dateTime: null,
  });

  const timeContainerRef = useRef<HTMLDivElement>(null);

  const scrollTimeContainer = (direction: "left" | "right") => {
    if (timeContainerRef.current) {
      const clientWidth =
        (timeContainerRef.current.children[0].clientWidth + 10) * 3;
      const { scrollLeft } = timeContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      timeContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getTimes = () => {
    if (!date.justDate) return [];

    const { justDate } = date;
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSE_TIME });

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: INTERVAL })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();

  return (
    <div className="calendar_container">
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={(date) =>
          setDate((prev) => ({ ...prev, justDate: resetTime(date) }))
        }
      />
      {date.justDate ? (
        <div
          className="time-container-wrapper"
          style={{ position: "relative" }}
        >
          <button
            className="time-container__scroll-button time-container__scroll-button--left"
            onClick={() => scrollTimeContainer("left")}
          >
            {"<"}
          </button>
          <div className="time-container" ref={timeContainerRef}>
            {times.map((time, i) => (
              <div
                key={`times-${i}`}
                className={`time-container__item ${
                  date.dateTime && date.dateTime.getTime() === time.getTime()
                    ? "time-container__item--active"
                    : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
            ))}
          </div>
          <button
            className="time-container__scroll-button time-container__scroll-button--right"
            onClick={() => scrollTimeContainer("right")}
          >
            {">"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Calendar;
