// react packages
import { useState } from "react";
import Calendar from "react-calendar";

// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./Calender.css";

export default function Calender() {
  const { mode } = useTheme();

  const [date, setDate] = useState(new Date());

  return (
    <div className={`calender__card ${mode}`}>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
