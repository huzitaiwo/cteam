// react&react-router packages
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from "../../components/Avatar";
import TaskList from "./TaskList";
import Comment from "./Comment";
import ProjectDetails from "../../components/ProjectDetails";
// import Comment from './Comment'

// styles
import "./Project.css";

export default function Project() {
  const { mode } = useTheme();
  const { id } = useParams();
  const history = useHistory();
  const { document: project, error, isPending } = useDocument("projects", id);
  const { documents: tasks } = useCollection("tasks", ["projectID", "==", id]);

  // state
  const [projectTab, setProjectTab] = useState("task");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <h4>loading...</h4>;
  }

  if (!project) {
    return (
      <p className={`project-redirect ${mode}`}>
        Could not retrieve project details{" "}
        <button
          onClick={() => {
            history.goBack();
          }}
        ></button>
      </p>
    );
  }

  console.log(project, tasks);

  return (
    <div>
      <div className={`project ${mode}`}>
        <div
          className="project__banner"
          style={{
            backgroundImage: `url(${project.photoURL})`,
          }}
        >
          <div className="backdrop"></div>
          <small>Project / {project.companyName}</small>
          <h3>{project.name} Project</h3>
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
            <span>{project.dueDate.toDate().toDateString().slice(4)}</span>
          </li>
          <li>
            <h5>
              <span>Assigned to</span>:
            </h5>

            <ul className="card__users">
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
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
          <li>
            <h5>
              <span>Progress:</span>
            </h5>

            <div className={`progress__bar progress__${project.priority}`}>
              <div className={`bar bar__${project.priority} ${mode}`}></div>
            </div>
          </li>
          <li>
            <h5>
              <span>Status</span>:
            </h5>

            {project.isCompleted && (
              <span className="status completed">Completed</span>
            )}
            {project.inProgress && (
              <span className="status progress_select">In progress</span>
            )}
            {!project.isCompleted && !project.inProgress && (
              <span className="status progress_select">Start Project</span>
            )}
          </li>
        </ul>
      </div>
      {tasks && (
        <>
          <div className="project__header">
            <button
              className={projectTab === "task" ? "active" : ""}
              onClick={() => setProjectTab("task")}
            >
              Tasks ({tasks.length !== 0 && tasks.length < 10 && <span>0</span>}
              {tasks.length})
            </button>
            <button
              className={projectTab === "comment" ? "active" : ""}
              onClick={() => setProjectTab("comment")}
            >
              Comments
            </button>
            <Link className={`btn add ${mode}`} to={`${project.id}/create`}>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New task
            </Link>
          </div>
          {projectTab === "task" && (
            <div>{tasks && <TaskList tasks={tasks} />}</div>
          )}
          {projectTab === "comment" && (
            <div>
              <Comment />
            </div>
          )}
        </>
      )}
    </div>
  );
}
