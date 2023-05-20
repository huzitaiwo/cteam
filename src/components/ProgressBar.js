// hooks
import { useTheme } from "../hooks/useTheme";
import { useCollection } from "../hooks/useCollection";

// styles
import "./ProgressBar.css";

export default function ProgressBar({ project }) {
  const { mode } = useTheme();
  const { documents: tasks } = useCollection("tasks", [
    "projectID",
    "==",
    project.id,
  ]);

  const completedTasks = tasks
    ? tasks.filter((task) => {
        let completed = false;
        if (task.isCompleted) {
          completed = true;
        }
        return completed;
      })
    : null;

  const progress =
    completedTasks && tasks && (completedTasks.length / tasks.length) * 100;

  return (
    <>
      {tasks && completedTasks && (
        <div className="card__progress">
          <p>
            Task Done: {completedTasks.length * 10} / {tasks.length * 10}
          </p>
          <div className={`progress__bar progress__${project.priority}`}>
            <div
              style={{ width: `${progress}%` }}
              className={`bar bar__${project.priority} ${mode}`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
