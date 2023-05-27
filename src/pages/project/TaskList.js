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
    setPopup({});
    await updateDocument(id, {
      isCompleted: true,
    });
  };
  const handleDelete = async (id) => {
    setPopup({});
    await deleteDocument(id);
  };

  return (
    <ul className="tasks__grid">
      {tasks.map((task, index) => (
        <li className={`tasks__list tasks__${project.priority}`} key={task.id}>
          <div className="tasks__head">
            <p>{task.dueDate.toDate().toDateString().slice(4)}</p>
            {task.createdBy.id === user.uid && (
              <button onClick={() => handlePopup(index)} className="more">
                <i className="fi fi-br-menu-dots-vertical"></i>
              </button>
            )}

            {task.isCompleted && (
              <i className="fi fi-ss-badge-check checked"></i>
            )}

            {popup[index] && (
              <div className="popup">
                <ul>
                  <li>
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="mark"
                    >
                      mark as complete <i className="fi fi-br-check"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="delete"
                    >
                      delete <i className="fi fi-br-cross"></i>
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
