import React, { useState, useRef, useEffect } from "react";
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

interface CalendarProps {
  selectedDate: DateType;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>;
}

const resetTime = (date: Date) => {
  return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
};

function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const [showTimes, setShowTimes] = useState(false);
  const timeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate((prev) => ({ ...prev, justDate: resetTime(new Date()) }));
  }, []);

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
    if (!selectedDate.justDate) return [];

    const { justDate } = selectedDate;
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
          setSelectedDate(() => ({
            justDate: resetTime(date),
            dateTime: null,
          }))
        }
      />
      <div className="time-container-wrapper" style={{ position: "relative" }}>
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
                selectedDate.dateTime &&
                selectedDate.dateTime.getTime() === time.getTime()
                  ? "time-container__item--active"
                  : ""
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedDate((prev) => ({ ...prev, dateTime: time }))
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
    </div>
  );
}

export default Calendar;
