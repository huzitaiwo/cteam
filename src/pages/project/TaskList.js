// components
import Avatar from "../../components/Avatar";

// styles
import "./Project.css";

export default function TaskList({ tasks, project }) {
  return (
    <ul className="tasks__grid">
      {tasks.map((task) => (
        <li className={`tasks__list tasks__${project.priority}`} key={task.id}>
          <div className="tasks__head">
            <p>{task.dueDate.toDate().toDateString().slice(4)}</p>
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
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <h3 className="tasks__name">{task.name}</h3>
          <p className="tasks__description">{task.description}</p>
          <div className="tasks__foot">
            <ul className="tasks__users">
              {task.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
            <div className="tasks__tags">
              {task.tags.map((tag) => (
                <span key={tag.value}>{tag.label}</span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
