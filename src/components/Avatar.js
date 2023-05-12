// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./Avatar.css";

export default function Avatar({ src }) {
  const { mode } = useTheme();

  return (
    <div className={`avatar ${mode}`}>
      <img src={src} alt="user avatar" />
    </div>
  );
}
