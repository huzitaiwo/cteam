// react & external packages
import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { v4 as uuid } from "uuid";

// hooks
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTheme } from "../../hooks/useTheme";

// firebase function
import { timestamp } from "../../firebase/config";

// components
import Avatar from "../../components/Avatar";

// styles
import "./Project.css";

export default function Comment({ project }) {
  const { user } = useAuthContext();
  const { mode } = useTheme();
  const { updateDocument, deleteArrayField, editArrayField, response } =
    useFirestore("projects");

  const [editComment, setEditComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [action, setAction] = useState({});
  const [edit, setEdit] = useState({});

  const usersList = project.assignedUsersList.filter((u) => {
    return u.id === user.uid;
  });

  const handleAction = (index) => {
    setAction((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  const handleDelete = async (i) => {
    setAction({});
    deleteArrayField(project.id, "comments", i);
  };

  const handleEdit = (index) => {
    setAction({});
    setEditComment(project.comments[index].content);

    setEdit((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  const handleUpdate = async (e, i) => {
    e.preventDefault();
    setEdit({});
    editArrayField(project.id, "comments", i, {});
    console.log(project.comments[i]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuid(),
      userID: user.uid,
    };

    await updateDocument(project.id, {
      comments: [...project.comments, comment],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className={`comments ${mode}`}>
      <ul>
        {project.comments.map((comment, i) => (
          <>
            {!edit[i] && (
              <li key={comment.id}>
                <div className="comment__head">
                  <Avatar src={comment.photoURL} />
                  <h5>{comment.displayName}</h5>
                  <small>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </small>
                  {comment.userID === user.uid && (
                    <button onClick={() => handleAction(i)}>
                      <i className="fi fi-br-menu-dots-vertical"></i>
                    </button>
                  )}
                  {action[i] && (
                    <div className="comment__action">
                      <button onClick={() => handleEdit(i)}>
                        <i className="fi fi-br-pen-fancy"></i>
                      </button>
                      <button onClick={() => handleDelete(i)}>
                        <i className="fi fi-rr-trash"></i>
                      </button>
                      <button onClick={() => setAction({})}>
                        <i className="fi fi-br-cross"></i>
                      </button>
                    </div>
                  )}
                </div>
                <p>{comment.content}</p>
              </li>
            )}
            {edit[i] && (
              <li className="update__action" key={comment.id}>
                <div className="comment__head">
                  <Avatar src={comment.photoURL} />
                  <h5>{comment.displayName}</h5>
                  <small>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
                <form onSubmit={(e) => handleUpdate(e, i)}>
                  <label>
                    <textarea
                      required
                      placeholder="comment"
                      onChange={(e) => {
                        setEditComment(e.target.value);
                      }}
                      value={editComment}
                    ></textarea>
                  </label>
                  <button className="send update">Update</button>
                </form>
              </li>
            )}
          </>
        ))}
      </ul>

      {(project.createdBy.id === user.uid || usersList.length !== 0) && (
        <form onSubmit={handleSubmit}>
          <Avatar src={user.photoURL} />
          <label>
            <textarea
              required
              placeholder="comment"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              value={newComment}
            ></textarea>
            {!response.isLoading && (
              <button className={`send ${mode}`}>
                <i className="fi fi-sr-paper-plane"></i>
              </button>
            )}
            {response.isLoading && (
              <button className={`send ${mode}`}>...</button>
            )}
          </label>
        </form>
      )}
      {response.error && (
        <div className={`error ${mode}`}>{response.error}</div>
      )}
    </div>
  );
}
