// react packages
import { useState } from "react";
import { Link } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useSignup } from "../../hooks/useSignup";

// images
import Placeholder from "../../assets/brand/placeholder.svg";

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

        <label className="input__field">
          <div className="input__icon">
            <i className="fi fi-rr-user"></i>
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
            <img src={Placeholder} alt="" className="thumbnail" />
            {!thumbnail && <span>Chooose profile picture</span>}
            {thumbnail && <span>{thumbnail.name}</span>}
          </label>
          {thumbnailError && (
            <div className={`error ${mode}`}>{thumbnailError}</div>
          )}
        </div>

        {!isPending && (
          <motion.button
            className={`btn ${mode}`}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 1px #fd413c",
              boxShadow: "0 0 5px #fd413c",
            }}
          >
            Signup
          </motion.button>
        )}
        {isPending && (
          <button disabled className={`btn ${mode}`}>
            Signing up...
          </button>
        )}
        {error && <div className={`error ${mode}`}>{error}</div>}

        <div className="account">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
