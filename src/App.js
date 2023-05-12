// react packages
import { useState, useEffect } from "react";

// react-router packages
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";

// styles
import "./App.css";

// pages && components
import CreateTask from "./pages/createtask/CreateTask";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import Calender from "./pages/calender/Calender";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Sidebar from "./components/Sidebar";
import Create from "./pages/create/Create";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Task from "./pages/task/Task";

function App() {
  const { mode } = useTheme();
  const { user, authIsReady } = useAuthContext();
  const [mobileMenu, setMobileMenu] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    // cleanup function
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className={`App ${mode}`}>
      {mobileMenu && (
        <div
          onClick={() => {
            setMobileMenu(false);
          }}
          className="overlay"
        />
      )}
      {authIsReady && (
        <BrowserRouter>
          {user && (
            <Sidebar
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
              screenWidth={screenWidth}
            />
          )}
          <div className="content">
            {user && (
              <Navbar
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                screenWidth={screenWidth}
              />
            )}
            <main>
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/projects">
                  {!user && <Redirect to="/login" />}
                  {user && <Projects />}
                </Route>
                <Route path="/project/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project />}
                </Route>
                <Route path="/task">
                  {!user && <Redirect to="/login" />}
                  {user && <Task />}
                </Route>
                <Route path="/calender">
                  {!user && <Redirect to="/login" />}
                  {user && <Calender />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/addtask/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <CreateTask />}
                </Route>
                <Route path="/settings">
                  {!user && <Redirect to="/login" />}
                  {user && <Settings />}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
