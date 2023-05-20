// framer motion
import { motion } from "framer-motion";

// hooks
import { useTheme } from "../hooks/useTheme";

// styles
import "./Loader.css";

const loader = {
  animation: {
    x: [-50, 50],
    y: [0, -70],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

export default function Loader() {
  const { mode } = useTheme();

  return (
    <>
      <motion.div
        className={`loader ${mode}`}
        variants={loader}
        animate="animation"
      ></motion.div>
    </>
  );
}
