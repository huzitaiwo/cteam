// hooks
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";

// components
import Loader from "../../components/Loader";

// styles
import "./Users.css";

export default function Users() {
  const { mode } = useTheme();
  const { documents: users, isPending, error } = useCollection("users");

  if (isPending) {
    return <Loader />;
  }
  if (error) {
    return <div className={`error ${mode}`}>{error}</div>;
  }

  if (!users) {
    return <p className={`error ${mode}`}>Could not load users</p>;
  }

  return (
    <div className="Users">
      <ul className="Users__grid">
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <img alt={`${user.displayName} thumbnail`} src={user.photoURL} />
              <div className="details">
                <h2>{user.displayName}</h2>
                {user.email && <h3>{user.email}</h3>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
