// react packages
import { Link } from "react-router-dom";

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
      <p className={`project-redirect error ${mode}`}>
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
              {myTasks && (
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
                              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                            />
                          </svg>
                        )}
                        {task.isCompleted && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 checked"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clipRule="evenodd"
                            />
                          </svg>
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
