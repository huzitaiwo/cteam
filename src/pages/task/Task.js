// components
import TaskList from "./TaskList";
import Loader from "../../components/Loader";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./Task.css";

export default function Task() {
  const { mode } = useTheme();
  const { documents, isPending, error } = useCollection("tasks");

  if (error) {
    return <div className={`error ${mode}`}>{error}</div>;
  }

  if (isPending) {
    return <Loader />;
  }

  if (documents && documents.length === 0) {
    return <p className={`project-redirect error ${mode}`}>No Tasks yet!</p>;
  }

  return (
    <div className={`tasks ${mode}`}>
      {documents && (
        <div className="table">
          <div className="thead">
            <div>Task Name</div>
            <div>Task Tags</div>
            <div>Task Assign to</div>
            <div>Due date</div>
          </div>
          <div className="h3">
            <h3>To do</h3>
            <span>
              ({documents.length < 10 && 0}
              {documents.length})
            </span>
          </div>
          <div>
            {documents.map((task, index) => (
              <TaskList
                key={task.id}
                documents={documents}
                task={task}
                i={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
