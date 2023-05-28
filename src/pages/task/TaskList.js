// react packages
import { Link } from "react-router-dom";

// hooks
import { useTheme } from "../../hooks/useTheme";

// components
import Avatar from "../../components/Avatar";

export default function TaskList({ documents, task, i }) {
  const { mode } = useTheme();

  return (
    <Link to={`/projects/${task.projectID}`} key={task.id} className="td">
      <div className={`task__name`}>
        <span>
          {documents.length < 10 && 0}
          {i + 1}
        </span>
        {!task.isCompleted && <i className="fi fi-br-badge-check"></i>}
        {task.isCompleted && <i className="fi fi-sr-badge-check"></i>}

        <p>{task.name}</p>
      </div>
      <div>
        {task.tags &&
          task.tags.map((tag) => (
            <span key={tag.value} className={`task__tag ${mode} ${tag.value}`}>
              {tag.label}
            </span>
          ))}
      </div>
      <ul>
        {task.assignedUsersList && (
          <li key={task.assignedUsersList[0].photoURL} className="task__user">
            <Avatar src={task.assignedUsersList[0].photoURL} />
            <span>{task.assignedUsersList[0].displayName}</span>
          </li>
        )}
      </ul>
      <p className="task__duedate">
        {task.dueDate.toDate().toDateString().slice(3)}
      </p>
    </Link>
  );
}
