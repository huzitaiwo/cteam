// react&react-router packages
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import TaskList from "./TaskList";
import Comment from "./Comment";
// import Avatar from "../../components/Avatar";
import ProjectDetails from "../../components/ProjectDetails";
// import Comment from './Comment'

// styles
import "./Project.css";

export default function Project() {
  const { mode } = useTheme();
  const { id } = useParams();
  const { user } = useAuthContext();
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

  return (
    <div className={`project ${mode}`}>
      <ProjectDetails project={project} />
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
              Comments (
              {project.comments.length !== 0 &&
                project.comments.length < 10 && <span>0</span>}
              {project.comments.length})
            </button>
            {user.uid === project.createdBy.id && (
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
            )}
          </div>
          {projectTab === "task" && (
            <div>{tasks && <TaskList tasks={tasks} project={project} />}</div>
          )}
          {projectTab === "comment" && (
            <div>{project && <Comment project={project} />}</div>
          )}
        </>
      )}
    </div>
  );
}
