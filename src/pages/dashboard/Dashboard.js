// react packages
import { Link } from "react-router-dom";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { mode } = useTheme();
  const { documents, isPending, error } = useCollection("projects");

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (isPending) {
    return <h4>loading...</h4>;
  }

  return (
    <div className={`dashboard`}>
      {documents && (
        <>
          <div className="dashboard__grid">
            <div className="grid__1">
              {documents &&
                documents.map((project) => (
                  <Link to="/" key={project.id} className="dashboard__card">
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
                    <div className="card__status">
                      {project.isCompleted && (
                        <span className="status completed">Completed</span>
                      )}
                      {project.inProgress && (
                        <span className="status completed">In Progress</span>
                      )}
                      {!project.isCompleted && !project.inProgress && (
                        <span className="status progress_select">
                          Select progress
                        </span>
                      )}
                      <span className={`status ${project.priority}`}>
                        {project.priority} Priority
                      </span>
                    </div>
                    <div className="progress__bar"></div>
                    <div className="card__category">
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
                      Due by: {project.dueDate.toDate().toDateString()}
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
