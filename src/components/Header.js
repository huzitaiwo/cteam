// create packages
import { Link } from "react-router-dom";

// styles, components, hooks
import "./Header.css";
import { useTheme } from "../hooks/useTheme";

export default function Header({ list, grid }) {
  const { mode } = useTheme();

  return (
    <div className={`layout ${mode}`}>
      <div className="display">
        <button className={`list ${list ? "active" : ""}`}>
          <i className="fi fi-rr-menu-burger"></i>
        </button>
        <button className={`grid ${grid ? "active" : ""}`}>
          <i className="fi fi-rr-apps"></i>
        </button>
      </div>
      <button className="add">
        <Link to="/create">
          <i className="fi fi-rr-plus"></i>
        </Link>
      </button>
    </div>
  );
}
