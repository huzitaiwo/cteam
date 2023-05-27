// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./ThemeSelector.css";

export default function ThemeSelector() {
  const { changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme__selector">
      <button onClick={toggleMode} className="mode-toggler">
        {mode === "light" && <i className="fi fi-sr-toggle-on"></i>}
        {mode === "dark" && <i className="fi fi-br-toggle-off"></i>}
      </button>
    </div>
  );
}
