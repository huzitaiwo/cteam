// react packages & other packages
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// firebase function
import { timestamp } from "../../firebase/config";

// images
import Apple from "../../assets/brand/apple.svg";
import Placeholder from "../../assets/brand/placeholder.svg";
import Discord from "../../assets/brand/discord.svg";
import Facebook from "../../assets/brand/facebook.svg";
import Github from "../../assets/brand/github.svg";
import Google from "../../assets/brand/google.svg";
import LinkedIn from "../../assets/brand/linkedin.svg";
import Slack from "../../assets/brand/slack.svg";
import Twitter from "../../assets/brand/twitter.svg";

// styles
import "./Create.css";

const categories = [
  { value: "andriod", label: "Andriod" },
  { value: "ar", label: "AR" },
  { value: "branding", label: "Branding" },
  { value: "desktop", label: "Desktop" },
  { value: "ios", label: "IOS" },
  { value: "iot", label: "IOT" },
  { value: "sales", label: "Sales" },
  { value: "uiux", label: "ui/ux" },
  { value: "website", label: "Website" },
];

const brands = [
  { value: "default", label: "Default", image: Placeholder },
  { value: "apple", label: "Apple", image: Apple },
  { value: "discord", label: "Discord", image: Discord },
  { value: "facebook", label: "Facebook", image: Facebook },
  { value: "github", label: "Github", image: Github },
  { value: "google", label: "Google", image: Google },
  { value: "linkedin", label: "LinkedIn", image: LinkedIn },
  { value: "slack", label: "Slack", image: Slack },
  { value: "twitter", label: "Twitter", image: Twitter },
];

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function Create() {
  const { mode } = useTheme();
  const history = useHistory();
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users", "", ["displayName"]);

  // form field values
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyBrand, setCompanyBrand] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [projectCategories, setProjectCategories] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setCategory(categories);
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleFileChange = (e) => {
    setThumbnail(null);

    let file = e.target.files[0];

    if (!file) {
      setThumbnailError(null);
      return;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (!companyBrand) {
      setFormError("Please select default company logo");
      return;
    }
    if (projectCategories.length < 1) {
      setFormError("Please select at least one project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least one user");
      return;
    }
    if (!priority) {
      setFormError("Please select project priority");
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      companyName,
      companyBrand: companyBrand.image,
      details,
      categories: projectCategories,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
      priority: priority.value,
      isCompleted: false,
      inProgress: false,
    };

    await addDocument(project, thumbnail);

    if (!response.error) {
      history.push("/projects");
    }
  };

  return (
    <div className={`form__create ${mode}`}>
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Project company:</span>
          <input
            required
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
        </label>

        <label>
          <span>Company logo:</span>
          <Select
            className="select"
            onChange={(option) => setCompanyBrand(option)}
            options={brands}
            formatOptionLabel={(brand) => (
              <div className="brand__option">
                <img src={brand.image} alt="brand" />
                <span>{brand.label}</span>
              </div>
            )}
          />
        </label>

        <div className="label">
          <span>project thumbnail:</span>
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={handleFileChange}
          />
          <label tabIndex={0} className="file" htmlFor="file">
            <img src={Placeholder} alt="" className="thumbnail" />
            {!thumbnail && <span>Choose project thumbnail</span>}
            {thumbnail && <span>{thumbnail.name}</span>}
          </label>
          {thumbnailError && (
            <div className={`error ${mode}`}>{thumbnailError}</div>
          )}
        </div>

        <label>
          <span>Project description:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Due Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project Category:</span>
          <Select
            className="select"
            onChange={(option) => setProjectCategories(option)}
            options={category}
            isMulti
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            className="select"
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <label>
          <span>Project priority:</span>
          <Select
            className="select"
            onChange={(option) => setPriority(option)}
            options={priorities}
          />
        </label>

        {response.isPending && (
          <button disabled className={`btn ${mode}`}>
            ...
          </button>
        )}
        {!response.isPending && (
          <button className={`btn ${mode}`}>Add Project</button>
        )}
        {formError && <div className={`error ${mode}`}>{formError}</div>}
      </form>
    </div>
  );
}
