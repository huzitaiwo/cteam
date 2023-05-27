// react packages
import { Link } from "react-router-dom";

// components
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";

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
            {documents.map((task, i) => (
              <Link
                to={`/projects/${task.projectID}`}
                key={task.id}
                className="td"
              >
                <div className={`task__name`}>
                  <span>
                    {documents.length < 10 && 0}
                    {i + 1}
                  </span>
                  {!task.isCompleted && (
                    <i className="fi fi-br-badge-check"></i>
                  )}
                  {task.isCompleted && <i className="fi fi-sr-badge-check"></i>}

                  <p>{task.name}</p>
                </div>
                <div>
                  {task.tags &&
                    task.tags.map((tag) => (
                      <span
                        key={tag.value}
                        className={`task__tag ${mode} ${tag.value}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                </div>
                <ul>
                  {/* {task.assignedUsersList &&
                    task.assignedUsersList.map((user) => (
                      <li key={user.photoURL} className="task__user">
                        <Avatar src={user.photoURL} />
                        <span>{user.displayName}</span>
                      </li>
                    ))} */}
                  {task.assignedUsersList && (
                    <li
                      key={task.assignedUsersList[0].photoURL}
                      className="task__user"
                    >
                      <Avatar src={task.assignedUsersList[0].photoURL} />
                      <span>{task.assignedUsersList[0].displayName}</span>
                    </li>
                  )}
                </ul>
                <p className="task__duedate">
                  {task.dueDate.toDate().toDateString().slice(3)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
