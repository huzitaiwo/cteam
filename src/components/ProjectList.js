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
        <i className="fi fi-br-menu-dots"></i>
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
