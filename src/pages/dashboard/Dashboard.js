// react packages
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTheme } from "../../hooks/useTheme";

// components
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calender";
import ProgressBar from "../../components/ProgressBar";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { documents, isPending, error } = useCollection("projects");
  const { documents: tasks } = useCollection("tasks");

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

  const myTasks = tasks
    ? tasks.filter((task) => {
        let assignedToMe = false;
        task.assignedUsersList.forEach((u) => {
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
    return <Loader />;
  }

  if (documents && documents.length === 0) {
    return (
      <p className={`project-redirect no___action ${mode}`}>
        No activities yet in your dashboard!
      </p>
    );
  }

  return (
    <div className={`dashboard ${mode}`}>
      {documents && (
        <>
          <div className="dashboard__grid">
            <div className="grid__1">
              {myProjects.length === 0 && (
                <p className={`no___action ${mode}`}>
                  You haven't been asigned any project
                </p>
              )}
              {myProjects.slice(0, 2).map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="dashboard__card"
                >
                  <div className="card__head">
                    <div className="card__logo">
                      <img src={project.companyBrand} alt="company brand" />
                    </div>
                    <div className="card__name">
                      <h2>{project.name}</h2>
                      <p>{project.companyName}</p>
                    </div>
                    <div className="card__option">
                      <i className="fi fi-br-menu-dots-vertical"></i>
                    </div>
                  </div>
                  <div className={`card__status ${mode}`}>
                    {project.isCompleted && (
                      <span className={`status completed ${mode}`}>
                        Completed
                      </span>
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
                  <ProgressBar project={project} />
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
                    {project.assignedUsersList.slice(0, 4).map((user) => (
                      <li key={user.photoURL}>
                        <Avatar src={user.photoURL} />
                      </li>
                    ))}
                    {project.assignedUsersList.length > 4 && (
                      <div className={`users__more ${mode}`}>
                        +{project.assignedUsersList.length - 4}
                      </div>
                    )}
                  </ul>
                  <div className={`msg warning ${mode}`}>
                    Due date: {project.dueDate.toDate().toDateString().slice(4)}
                  </div>
                </Link>
              ))}
            </div>
            <div className="grid__2">
              {myTasks && myTasks.length === 0 && (
                <p className={`no___action ${mode}`}>
                  You haven't been asigned any task
                </p>
              )}
              {myTasks && myTasks.length > 0 && (
                <div className="card__tasks">
                  <h3>
                    My Tasks{" "}
                    <span className="taskLength">
                      (
                      {myTasks.length !== 0 && myTasks.length < 10 && (
                        <span>0</span>
                      )}
                      {myTasks.length})
                    </span>
                  </h3>
                  <ul>
                    {myTasks.map((task, i) => (
                      <Link key={task.id} to={`projects/${task.projectID}`}>
                        <small>
                          {myTasks.length !== 0 && myTasks.length < 10 && 0}
                          {i + 1}
                        </small>
                        <p>{task.name}</p>
                        <div></div>
                        {!task.isCompleted && (
                          <i className="fi fi-br-badge-check"></i>
                        )}
                        {task.isCompleted && (
                          <i className="fi fi-sr-badge-check"></i>
                        )}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="grid__1">
              <Calendar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
