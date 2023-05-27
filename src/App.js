// react packages
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// other packages
import { AnimatePresence } from "framer-motion";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";

// styles
import "./App.css";

// pages && components
import CreateTask from "./pages/createtask/CreateTask";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Sidebar from "./components/Sidebar";
import Create from "./pages/create/Create";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Task from "./pages/task/Task";
import Users from "./pages/users/Users";

function App() {
  const { mode } = useTheme();
  const { user, authIsReady } = useAuthContext();

  // states
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
              <AnimatePresence>
                <Switch>
                  <Route exact path="/">
                    {!user && <Redirect to="/login" />}
                    {user && <Dashboard />}
                  </Route>
                  <Route exact path="/projects">
                    {!user && <Redirect to="/login" />}
                    {user && <Projects />}
                  </Route>
                  <Route exact path="/projects/:id">
                    {!user && <Redirect to="/login" />}
                    {user && <Project />}
                  </Route>
                  <Route path="/tasks">
                    {!user && <Redirect to="/login" />}
                    {user && <Task />}
                  </Route>
                  <Route path="/create">
                    {!user && <Redirect to="/login" />}
                    {user && <Create />}
                  </Route>
                  <Route path="/projects/:id/create">
                    {!user && <Redirect to="/login" />}
                    {user && <CreateTask />}
                  </Route>
                  <Route path="/settings">
                    {!user && <Redirect to="/login" />}
                    {user && <Settings />}
                  </Route>
                  <Route path="/users">
                    {!user && <Redirect to="/login" />}
                    {user && <Users />}
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
              </AnimatePresence>
            </main>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
