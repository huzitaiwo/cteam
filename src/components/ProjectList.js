// react packages
import { Link } from "react-router-dom";

// hooks
import { useTheme } from "../hooks/useTheme";
import { useCollection } from "../hooks/useCollection";

// components
import Avatar from "./Avatar";

export default function ProjectList({ project }) {
  const { mode } = useTheme();
  const { documents: tasks } = useCollection("tasks", [
    "projectID",
    "==",
    project.id,
  ]);

  return (
    <Link to={`/projects/${project.id}`} className="projects__card">
      {project.photoURL && (
        <img
          className="projects__image"
          src={project.photoURL}
          alt="project thumbnail"
        />
      )}

      <div className="projects__name">
        <h2>{project.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <p className="projects__details">{project.details}</p>
      <div className={`card__category ${mode}`}>
        {project.categories.map((catogory) => (
          <span
            className={`category ${catogory.value} ${mode}`}
            key={catogory.value}
          >
            {catogory.label}
          </span>
        ))}
      </div>
      <div className="card__foot">
        <div className="card__info">
          {tasks && <small>{tasks.length}</small>}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 22C9.96667 22 8.66667 21.4667 7.6 20.4C6.53333 19.3333 6 18.0333 6 16.5V6C6 4.9 6.39167 3.95833 7.175 3.175C7.95833 2.39167 8.9 2 10 2C11.1 2 12.0417 2.39167 12.825 3.175C13.6083 3.95833 14 4.9 14 6V15.5C14 16.2 13.7583 16.7917 13.275 17.275C12.7917 17.7583 12.2 18 11.5 18C10.8 18 10.2083 17.7583 9.725 17.275C9.24167 16.7917 9 16.2 9 15.5V6.75C9 6.53333 9.07083 6.35417 9.2125 6.2125C9.35417 6.07083 9.53333 6 9.75 6C9.96667 6 10.1458 6.07083 10.2875 6.2125C10.4292 6.35417 10.5 6.53333 10.5 6.75V15.5C10.5 15.7833 10.5958 16.0208 10.7875 16.2125C10.9792 16.4042 11.2167 16.5 11.5 16.5C11.7833 16.5 12.0208 16.4042 12.2125 16.2125C12.4042 16.0208 12.5 15.7833 12.5 15.5V6C12.5 5.3 12.2583 4.70833 11.775 4.225C11.2917 3.74167 10.7 3.5 10 3.5C9.3 3.5 8.70833 3.74167 8.225 4.225C7.74167 4.70833 7.5 5.3 7.5 6V16.5C7.5 17.6 7.89167 18.5417 8.675 19.325C9.45833 20.1083 10.4 20.5 11.5 20.5C12.6 20.5 13.5417 20.1083 14.325 19.325C15.1083 18.5417 15.5 17.6 15.5 16.5V6.75C15.5 6.53333 15.5708 6.35417 15.7125 6.2125C15.8542 6.07083 16.0333 6 16.25 6C16.4667 6 16.6458 6.07083 16.7875 6.2125C16.9292 6.35417 17 6.53333 17 6.75V16.5C17 18.0333 16.4667 19.3333 15.4 20.4C14.3333 21.4667 13.0333 22 11.5 22Z"
              fill="#a0a3b0"
            />
          </svg>

          <small>{project.comments.length}</small>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#a0a3b0"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <ul className="card__users">
          {project.assignedUsersList.slice(0, 3).map((user) => (
            <li key={user.photoURL}>
              <Avatar src={user.photoURL} />
            </li>
          ))}
          {project.assignedUsersList.length > 3 && (
            <div className={`users__more ${mode}`}>
              +{project.assignedUsersList.length - 3}
            </div>
          )}
        </ul>
      </div>
    </Link>
  );
}
