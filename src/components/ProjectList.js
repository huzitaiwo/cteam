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
          <i className="fi fi-rr-paperclip-vertical"></i>

          <small>{project.comments.length}</small>
          <i className="fi fi-rr-comment"></i>
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
