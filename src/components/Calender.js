import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

// hooks
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "../hooks/useTheme";

// // components
import Loader from "./Loader";

// styles
import "./Calender.css";

export default function Calender() {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection("projects");

  const projects = documents
    ? documents.filter((project) => {
        let assignedToMe = false;
        project.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      })
    : null;

  const preselectedDays = [];

  projects &&
    projects.forEach((project) => {
      const year = project.dueDate.toDate().getFullYear();
      const month = project.dueDate.toDate().getMonth();
      const day = project.dueDate.toDate().getDay();

      preselectedDays.push({ year, month, day });
    });

  console.log(preselectedDays);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (isPending) {
    return <Loader />;
  }
  if (projects && projects.length === 0) {
    return (
      <p className={`project-redirect error ${mode}`}>
        No deadlines means no project in hand!
      </p>
    );
  }

  return (
    <div className={`calender ${mode}`}>
      <Calendar
        value={preselectedDays}
        // colorPrimary="#fd8b51"
        calendarClassName="custom-calendar"
        calendarTodayClassName="custom-today-day"
        shouldHighlightWeekends
      />
    </div>
  );
}
