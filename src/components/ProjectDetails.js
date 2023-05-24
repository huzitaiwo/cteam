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
    await updateDocument(id, {
      isCompleted: true,
      inProgress: false,
    });
    setPopup(false);
  };
  const handleDelete = async (id) => {
    await deleteDocument(id);

    tasks.forEach(async (task) => {
      await deleteTask(task.id);
    });

    setPopup(false);
    history.push("/projects");
  };

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
        {project.createdBy.id === user.uid && (
          <button onClick={() => setPopup(!popup)} className="project__action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        )}
        {popup && (
          <div className="handleFunction">
            <ul>
              <li>
                <button
                  onClick={() => handleComplete(project.id)}
                  className="mark"
                >
                  mark as complete{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="delete"
                >
                  delete{" "}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        )}
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
