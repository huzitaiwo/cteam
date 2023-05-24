// react packages
import { useState } from "react";

// components & hooks
import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Project.css";

export default function TaskList({ tasks, project }) {
  const { user } = useAuthContext();
  const { updateDocument, deleteDocument } = useFirestore("tasks");

  const [popup, setPopup] = useState({});

  const handlePopup = (index) => {
    setPopup((state) => ({
      ...state, // <-- copy previous state
      [index]: !state[index], // <-- update value by index key
    }));
  };

  const handleComplete = async (id) => {
    await updateDocument(id, {
      isCompleted: true,
    });
    setPopup(false);
  };
  const handleDelete = async (id) => {
    await deleteDocument(id);
    setPopup(false);
  };

  return (
    <ul className="tasks__grid">
      {tasks.map((task, index) => (
        <li className={`tasks__list tasks__${project.priority}`} key={task.id}>
          <div className="tasks__head">
            <p>{task.dueDate.toDate().toDateString().slice(4)}</p>
            {task.createdBy.id === user.uid && !task.isCompleted && (
              <button onClick={() => handlePopup(index)} className="more">
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

            {popup[index] && (
              <div className="handleFunction">
                <ul>
                  <li>
                    <button
                      onClick={() => handleComplete(task.id)}
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
                      onClick={() => handleDelete(task.id)}
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
                <span className="task__tag" key={tag.value}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
