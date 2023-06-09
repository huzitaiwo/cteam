// react-router packages
import { NavLink } from "react-router-dom";

// hooks
import { useTheme } from "../hooks/useTheme";

// framer motion
import { motion, AnimatePresence } from "framer-motion";

// styles
import "./Sidebar.css";

const sidebar = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

export default function Sidebar({ mobileMenu, setMobileMenu, screenWidth }) {
  const { mode } = useTheme();

  return (
    <>
      <AnimatePresence>
        {(mobileMenu || screenWidth > 500) && (
          <motion.div
            exit={{ x: "-100%", opacity: 0, transition: { ease: "easeInOut" } }}
            className={`sidebar ${mode}`}
            variants={sidebar}
            initial="hidden"
            animate="visible"
          >
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="50"
                height="50"
              >
                <path d="m18.5,0H5.5C2.467,0,0,2.467,0,5.5v13c0,3.033,2.467,5.5,5.5,5.5h13c3.033,0,5.5-2.467,5.5-5.5V5.5c0-3.033-2.467-5.5-5.5-5.5Zm2.5,18.5c0,1.378-1.122,2.5-2.5,2.5H5.5c-1.378,0-2.5-1.122-2.5-2.5V5.5c0-1.378,1.122-2.5,2.5-2.5h13c1.378,0,2.5,1.122,2.5,2.5v13Zm-11.985-7.5v2c0,1.682,1.297,3,2.953,3h.5c1.003,0,1.936-.499,2.496-1.334.46-.688,1.394-.873,2.081-.411.688.461.873,1.393.411,2.081-1.118,1.668-2.982,2.665-4.988,2.665h-.5c-3.283,0-5.953-2.691-5.953-6v-2c0-3.309,2.67-6,5.953-6h.5c2.007,0,3.872.997,4.989,2.666.461.688.276,1.62-.412,2.081-.69.46-1.621.276-2.081-.412-.559-.835-1.492-1.334-2.496-1.334h-.5c-1.656,0-2.953,1.318-2.953,3Z" />
              </svg>
            </div>
            <nav>
              <ul className="navigation-links">
                <motion.li
                  whileHover={{ scale: 1.15, originX: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <NavLink
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    exact
                    to="/"
                  >
                    <i className="fi fi-rr-apps"></i>
                    <span>Dashboard</span>
                  </NavLink>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.15, originX: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <NavLink
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    to="/projects"
                  >
                    <i className="fi fi-rr-folder-open"></i>
                    <span>Projects</span>
                  </NavLink>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.15, originX: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <NavLink
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    to="/tasks"
                  >
                    <i className="fi fi-rr-settings-sliders"></i>
                    <span>Tasks</span>
                  </NavLink>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.15, originX: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <NavLink
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    to="/settings"
                  >
                    <i className="fi fi-rr-settings"></i>
                    <span>Settings</span>
                  </NavLink>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.15, originX: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <NavLink
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    to="/users"
                  >
                    <i className="fi fi-rr-users-alt"></i>
                    <span>Team</span>
                  </NavLink>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
