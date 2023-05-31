// react packages
import { Link } from "react-router-dom";

// hooks && components
import Avatar from "../../components/Avatar";
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";

export default function TaskList({ documents, task, i }) {
  const { mode } = useTheme();
  const { document: project } = useDocument("projects", task.projectID);

  return (
    <>
      {project && (
        <Link
          to={`/projects/${task.projectID}`}
          className={`td td__${project.priority}`}
        >
          <div className={`task__name task__${project.priority}`}>
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
                <span
                  key={tag.value}
                  className={`task__tag ${mode} ${tag.value}`}
                >
                  {tag.label}
                </span>
              ))}
          </div>
          <ul>
            {task.assignedUsersList.slice(0, 1).map((user) => (
              <li className="task__user" key={user.photoURL}>
                <Avatar src={user.photoURL} />
                <span>{task.assignedUsersList[0].displayName}</span>
              </li>
            ))}
            ...
          </ul>
          <p className="task__duedate">
            {task.dueDate.toDate().toDateString().slice(3)}
          </p>
        </Link>
      )}
    </>
  );
}
