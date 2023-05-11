import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";

// styles
import "./App.css";

// pages && components
function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <h1>App</h1>
    </div>
  );
}

export default App;
