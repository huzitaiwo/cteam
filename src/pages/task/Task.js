// react packages
import { Link } from "react-router-dom";

// components
// import Header from "../../components/Header";
import Avatar from "../../components/Avatar";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Task.css";

export default function Task() {
  const { mode } = useTheme();
  // const { document: project } = useDocument();
  const { documents, isPending, error } = useCollection("tasks");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <h4>loading...</h4>;
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
            <span>(05)</span>
          </div>
          <div>
            {documents.map((task, i) => (
              <Link
                to={`/projects/${task.projectID}`}
                key={task.id}
                className="td"
              >
                <div className="task__name">
                  <span>
                    {documents.length !== 0 && documents.length < 10 && 0}
                    {i + 1}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 check"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                  {task.assignedUsersList &&
                    task.assignedUsersList.map((user) => (
                      <li key={user.photoURL} className="task__user">
                        <Avatar src={user.photoURL} />
                        <span>{user.displayName}</span>
                      </li>
                    ))}
                  {/* {task.assignedUsersList && (
                    <li
                      key={task.assignedUsersList[0].photoURL}
                      className="task__user"
                    >
                      <Avatar src={task.assignedUsersList[0].photoURL} />
                      <span>{task.assignedUsersList[0].displayName}</span>
                    </li>
                  )} */}
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
