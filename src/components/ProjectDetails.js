// react packages
import { useState } from "react";
import { useHistory } from "react-router-dom";

// components
import Avatar from "./Avatar";
import ProgressBar from "./ProgressBar";

// hooks
import { useTheme } from "../hooks/useTheme";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./ProjectDetails.css";

export default function ProjectDetails({ project, tasks }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const history = useHistory();
  const { updateDocument, deleteDocument } = useFirestore("projects");
  const { deleteDocument: deleteTask } = useFirestore("tasks");

  const [popup, setPopup] = useState(false);

  const startProject = async () => {
    await updateDocument(project.id, {
      inProgress: true,
    });
  };

  const handleComplete = async (id) => {
    setPopup(false);
    await updateDocument(id, {
      isCompleted: true,
      inProgress: false,
    });
  };
  const handleDelete = async (id) => {
    setPopup(false);
    await deleteDocument(id);

    tasks.forEach(async (task) => {
      await deleteTask(task.id);
    });

    history.push("/projects");
  };

  return (
    <div>
      <div
        className="project__banner"
        style={
          project.photoURL && {
            backgroundImage: `url(${project.photoURL})`,
          }
        }
      >
        <div className="backdrop"></div>
        <small>Project / {project.companyName}</small>
        <h1>{project.name} Project</h1>
        <p>{project.details}</p>
        {project.createdBy.id === user.uid && (
          <button onClick={() => setPopup(!popup)} className="project__action">
            <i className="fi fi-br-menu-dots-vertical"></i>
          </button>
        )}
        {popup && (
          <div className="popup">
            <ul>
              <li>
                <button
                  onClick={() => handleComplete(project.id)}
                  className="mark"
                >
                  mark as complete <i className="fi fi-br-check"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="delete"
                >
                  delete <i className="fi fi-br-cross"></i>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <ul onClick={() => setPopup(false)} className="project__info">
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
            <button onClick={startProject} className="status progress_select">
              Start Project
            </button>
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
