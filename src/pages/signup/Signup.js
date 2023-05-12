// react packages
import { useState } from "react";
import { Link } from "react-router-dom";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useSignup } from "../../hooks/useSignup";

// images
import Thumbnail from "../../assets/img/thumbnail.png";

export default function Signup() {
  const { mode } = useTheme();
  const { signup, isPending, error } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleFileChange = (e) => {
    setThumbnail(null);

    let file = e.target.files[0];

    if (!file.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (file.size > 1000000) {
      setThumbnailError("Image file size must be less than 1MB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(file);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <div>
      <form onSubmit={handleSignup} className={`form__auth ${mode}`}>
        <h2>Sign up</h2>
        <p className="form__text">
          Collaborate with your team easily and remotely!
        </p>

        <label className="input__field">
          <div className="input__icon">
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
          <div className="input__icon">
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

        <label className="input__field">
          <div className="input__icon">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder="Display Name"
          />
        </label>

        <div>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
            required
          />

          <label className="input__field file" htmlFor="file">
            <img src={Thumbnail} alt="" className="thumbnail" />
            {!thumbnail && <span>Profile Image</span>}
            {thumbnail && <span>{thumbnail.name}</span>}
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </label>
        </div>

        {!isPending && <button className={`btn ${mode}`}>Sign up</button>}
        {isPending && (
          <button disabled className={`btn ${mode}`}>
            Signing up...
          </button>
        )}
        {error && <div className="error">{error}</div>}

        <div className="account">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
