// react packages
import { Link } from "react-router-dom";

// components
// import Header from "../../components/Header";
import Avatar from "../../components/Avatar";

// hooks
import { useCollection } from "../../hooks/useCollection";
// import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Task.css";

export default function Task() {
  const { mode } = useTheme();
  const { documents, isPending, error } = useCollection("tasks");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <h4>loading...</h4>;
  }

  if (documents && documents.length === 0) {
    return <p className={`project-redirect ${mode}`}>No Tasks yet!</p>;
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
                <div className={`task__name`}>
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
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 check green"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg> */}

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
