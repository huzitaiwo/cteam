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
  const [newComment, setNewComment] = useState("");
  const { updateDocument, response } = useFirestore("projects");

  const usersList = project.assignedUsersList.filter((u) => {
    return u.id === user.uid;
  });

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
        {project.comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment__head">
              <Avatar src={comment.photoURL} />
              <h5>{comment.displayName}</h5>
              <small>
                {formatDistanceToNow(comment.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </small>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p>{comment.content}</p>
          </li>
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
          {response.error && (
            <div className={`error ${mode}`}>{response.error}</div>
          )}
        </form>
      )}
    </div>
  );
}
