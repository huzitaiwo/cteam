// react packages
import { Link } from "react-router-dom";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTheme } from "../../hooks/useTheme";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection("projects");

  const myProjects = documents
    ? documents.filter((document) => {
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      })
    : null;

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <h4>loading...</h4>;
  }

  if (documents && documents.length === 0) {
    return (
      <p className={`project-redirect ${mode}`}>
        No projects yet in your dashboard!
      </p>
    );
  }

  return (
    <div className={`dashboard ${mode}`}>
      {documents && (
        <>
          <div className="dashboard__grid">
            <div className="grid__1">
              {myProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="dashboard__card"
                >
                  <div className="card__head">
                    {/* <div className="card__logo"></div> */}
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
                  <div className={`card__status ${mode}`}>
                    {project.isCompleted && (
                      <span className="status completed">Completed</span>
                    )}
                    {project.inProgress && (
                      <span className="status progress_select">
                        In progress
                      </span>
                    )}
                    {!project.isCompleted && !project.inProgress && (
                      <span className="status progress_select">
                        Start <span className="md-none">Project</span>
                      </span>
                    )}
                    <span className={`status ${project.priority}`}>
                      {project.priority}{" "}
                      <span className="md-none">Priority</span>
                    </span>
                  </div>
                  <div className="card__progress">
                    <p>Task Done: 75 / 100</p>
                    <div
                      className={`progress__bar progress__${project.priority}`}
                    >
                      <div
                        className={`bar bar__${project.priority} ${mode}`}
                      ></div>
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
                </Link>
              ))}
            </div>
            <div className="grid__1">Grid 2</div>
            <div className="grid__1">Grid 3</div>
          </div>
        </>
      )}
    </div>
  );
}
