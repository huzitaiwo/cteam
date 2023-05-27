// react packages
import { Link } from "react-router-dom";

// components
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ProjectList from "../../components/ProjectList";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Projects.css";

export default function Projects() {
  const { mode } = useTheme();
  const {
    documents: projects,
    isPending,
    error,
  } = useCollection("projects", "", ["createdAt"]);

  const completedProjects = projects
    ? projects.filter((document) => {
        let completed = false;
        if (document.isCompleted) {
          completed = true;
        }
        return completed;
      })
    : null;

  const projectsInProgress = projects
    ? projects.filter((document) => {
        let progress = false;
        if (document.inProgress) {
          progress = true;
        }
        return progress;
      })
    : null;

  const workingProjects = projects
    ? projects.filter((document) => {
        let work = false;
        if (!document.inProgress && !document.isCompleted) {
          work = true;
        }
        return work;
      })
    : null;

  if (error) {
    return <div className={`error ${mode}`}>{error}</div>;
  }

  if (isPending) {
    return <Loader />;
  }

  if (projects && projects.length === 0) {
    return (
      <p className={`project-redirect error ${mode}`}>
        No projects yet! Add a new project <Link to="/create">here</Link>
      </p>
    );
  }

  return (
    <>
      <Header list={false} grid={true} />
      <div className={`projects ${mode}`}>
        {projects && (
          <>
            <div className="projects__grid">
              <div className="grid__1">
                <div className="projects__head">
                  <h3>Working</h3>
                  <span>
                    ({workingProjects.length < 10 && 0}
                    {workingProjects.length})
                  </span>
                  <i className="fi fi-br-menu-dots"></i>
                </div>
                {workingProjects.length === 0 && (
                  <p className={`error ${mode}`}>
                    You have no project in hand!
                  </p>
                )}
                {workingProjects.map((project) => (
                  <ProjectList project={project} key={project.id} />
                ))}
              </div>
              <div>
                <div className="projects__head">
                  <h3>In Progress</h3>
                  <span>
                    ({projectsInProgress.length < 10 && 0}
                    {projectsInProgress.length})
                  </span>

                  <i className="fi fi-br-menu-dots"></i>
                </div>
                {projectsInProgress.length === 0 && (
                  <p className={`error ${mode}`}>
                    You haven't started any project yet!
                  </p>
                )}
                {projectsInProgress.map((project) => (
                  <ProjectList project={project} key={project.id} />
                ))}
              </div>
              <div>
                <div className="projects__head">
                  <h3>Completed</h3>
                  <span>
                    ({completedProjects.length < 10 && 0}
                    {completedProjects.length})
                  </span>
                  <i className="fi fi-br-menu-dots"></i>
                </div>
                {completedProjects.length === 0 && (
                  <p className={`error ${mode}`}>
                    You haven't completed any project yet!
                  </p>
                )}
                {completedProjects.map((project) => (
                  <ProjectList project={project} key={project.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
