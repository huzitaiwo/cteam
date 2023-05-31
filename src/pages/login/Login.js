// react packages
import { useState } from "react";
import { Link } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { mode } = useTheme();
  const { login, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={`form__auth ${mode}`}>
        <h2>Login</h2>
        <p className="form__text">Welcome back! 👋</p>

        <label className="input__field">
          <div className="input__icon">
            <i className="fi fi-rr-envelope"></i>
          </div>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </label>

        <label className="input__field">
          <div className="input__icon">
            <i className="fi fi-br-lock"></i>
          </div>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </label>

        {!isPending && (
          <motion.button
            className={`btn ${mode}`}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 1px #fd413c",
              boxShadow: "0 0 5px #fd413c",
            }}
          >
            Login
          </motion.button>
        )}
        {isPending && (
          <button disabled className={`btn ${mode}`}>
            ...
          </button>
        )}
        {error && <div className={`error ${mode}`}>{error}</div>}

        <div className="account">
          <p>You don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
