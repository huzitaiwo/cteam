// components
import Avatar from "./Avatar";

// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./ProjectDetails.css";

export default function ProjectDetails({ project, tasks }) {
  const { mode } = useTheme();

  return (
    <div>
      <div className="project__card">
        {project.photoURL && (
          <img
            className="projects__image"
            src={project.photoURL}
            alt="project thumbnail"
          />
        )}
        <div className="card__head">
          <div className="card__createdBy">
            <Avatar src={project.createdBy.photoURL} />
          </div>
          <div className="card__name">
            <h2>{project.name}</h2>
            <p>{project.companyName}</p>
          </div>
          <div className="card__option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
        </div>
        <p className="projects__details">{project.details}</p>
        <div className={`card__status ${mode}`}>
          {project.isCompleted && (
            <span className="status completed">Completed</span>
          )}
          {project.inProgress && (
            <span className="status progress_select">In progress</span>
          )}
          {!project.isCompleted && !project.inProgress && (
            <span className="status progress_select">
              Start <span className="md-none">Project</span>
            </span>
          )}
          <span className={`status ${project.priority}`}>
            {project.priority} <span className="md-none">Priority</span>
          </span>
        </div>
        <div className="card__progress">
          <p>Task Done: 75 / 100</p>
          <div className={`progress__bar progress__${project.priority}`}>
            <div className={`bar bar__${project.priority} ${mode}`}></div>
          </div>
        </div>
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
        <ul className="card__users">
          {project.assignedUsersList.map((user) => (
            <li key={user.photoURL}>
              <Avatar src={user.photoURL} />
            </li>
          ))}
        </ul>
        <div className={`msg warning ${mode}`}>
          Due date: {project.dueDate.toDate().toDateString().slice(4)}
        </div>
      </div>
      <div className="project__tasks">
        {tasks &&
          tasks.map((task) => (
            <li
              className={`project__task task__${project.priority} ${mode}`}
              key={task.id}
            >
              <small>{task.dueDate.toDate().toDateString()}</small>
              <h4 className="tasks__name">{task.name}</h4>
              <div className="tasks">
                <ul className="tags">
                  {task.tags.map((tag) => (
                    <li
                      className={`tag tag__${tag.value} ${mode}`}
                      key={tag.value}
                    >
                      {tag.label}
                    </li>
                  ))}
                </ul>
                <div>
                  {task.assignedUsersList.map((user) => (
                    <span className="task_user" key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}
