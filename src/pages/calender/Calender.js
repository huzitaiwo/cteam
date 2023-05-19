// react packages
import { useState } from "react";
import Calendar from "react-calendar";

// styles
import "./Calender.css";

export default function Calender() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
        <div className="text-center">Selected date: {date.toDateString()}</div>
      </div>
    </div>
  );
}
