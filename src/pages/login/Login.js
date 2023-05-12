// react packages
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <div class="input__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
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
          <div class="input__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </label>

        {!isPending && <button className={`btn ${mode}`}>Login</button>}
        {isPending && (
          <button disabled className={`btn ${mode}`}>
            Loging in...
          </button>
        )}
        {error && <div className="error">{error}</div>}

        <div className="account">
          <p>You don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
