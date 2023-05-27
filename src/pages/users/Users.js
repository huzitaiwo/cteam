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
    <div className={`users ${mode}`}>
      {users && (
        <ul className="table">
          <div className="thead">
            <div>Name</div>
            <div>Email</div>
            <div>Status</div>
            <div>Location</div>
          </div>
          <div className="h3">
            <h3>
              {users.length < 10 && 0}
              {users.length} users
            </h3>
          </div>
          <ul>
            {users.map((user, i) => (
              <li className="td" key={user.id}>
                <div className="user__name">
                  <img src={user.photoURL} alt="user thumbnail" />
                  <h2>{user.displayName}</h2>
                </div>
                <h3>{user.email && user.email}</h3>
                <>
                  {user.online && (
                    <p>
                      <span className="online"></span>online
                    </p>
                  )}
                  {!user.online && (
                    <p>
                      <span className="offline"></span>offline
                    </p>
                  )}
                </>
                <>
                  {user.location && (
                    <p>
                      {user.location.principalSubdivision +
                        ", " +
                        user.location.countryName}
                    </p>
                  )}
                  {!user.location && <p>Not specified</p>}
                </>
              </li>
            ))}
          </ul>
        </ul>
      )}
    </div>
  );
}

// {users &&
//   users.map((user) => (
//     <li key={user.id}>
//       <img alt={`${user.displayName} thumbnail`} src={user.photoURL} />
//       <div className="details">
//         <h2>{user.displayName}</h2>
//         {user.email && <h3>{user.email}</h3>}
//       </div>
//     </li>
//   ))}
