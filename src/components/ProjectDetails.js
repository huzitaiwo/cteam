// components
import Avatar from "./Avatar";

// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./ProjectDetails.css";
import ProgressBar from "./ProgressBar";

export default function ProjectDetails({ project }) {
  const { mode } = useTheme();

  return (
    <div>
      <div
        className="project__banner"
        style={{
          backgroundImage: `url(${project.photoURL})`,
        }}
      >
        <div className="backdrop"></div>
        <small>Project / {project.companyName}</small>
        <h1>{project.name} Project</h1>
      </div>
      <ul className="project__info">
        <li>
          <h5>
            <span>Priority</span>:
          </h5>

          <span className={`status ${project.priority}`}>
            {project.priority} Priority
          </span>
        </li>
        <li>
          <h5>
            <span>Dealine</span>:
          </h5>
          <span className="deadline">
            {project.dueDate.toDate().toDateString().slice(4)}
          </span>
        </li>
        <li className="user__list">
          <h5>
            <span>Assigned to</span>:
          </h5>

          <ul className="card__users">
            {project.assignedUsersList.map((user) => (
              <li key={user.photoURL}>
                <Avatar src={user.photoURL} />
                <p>{user.displayName}</p>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h5>
            <span>Category</span>:
          </h5>

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
        </li>
        <li className="progress">
          <h5>
            <span>Progress</span>:
          </h5>

          {/* <div className={`progress__bar progress__${project.priority}`}>
            <div className={`bar bar__${project.priority} ${mode}`}></div>
          </div> */}
          <ProgressBar project={project} />
        </li>
        <li>
          <h5>
            <span>Status</span>:
          </h5>

          {project.isCompleted && (
            <span className={`status completed ${mode}`}>Completed</span>
          )}
          {project.inProgress && (
            <span className="status progress_select">In progress</span>
          )}
          {!project.isCompleted && !project.inProgress && (
            <span className="status progress_select">Start Project</span>
          )}
        </li>
        <li>
          <h5>
            <span>Created By</span>:
          </h5>

          <ul className="card__users">
            <li key={project.createdBy.photoURL}>
              <Avatar src={project.createdBy.photoURL} />
              <p>{project.createdBy.displayName}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
