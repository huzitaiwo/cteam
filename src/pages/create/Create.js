// react packages & other packages
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

// pages, components, hooks, context
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// firebase function
import { timestamp } from "../../firebase/config";

// images
import Thumbnail from "../../assets/img/thumbnail.png";

// styles
import "./Create.css";

const categories = [
  { value: "andriod", label: "Andriod" },
  { value: "ar", label: "AR" },
  { value: "branding", label: "Branding" },
  { value: "ios", label: "IOS app" },
  { value: "iot", label: "IOT" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "uiux", label: "ui/ux" },
  { value: "website", label: "Website" },
];

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function Create() {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const history = useHistory();

  // form field values
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [details, setDetails] = useState(
    "This project need a new brand identify where they will recognize"
  );
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

    if (!priority) {
      setFormError("Please select project priority");
    }

    if (projectCategories.length < 1) {
      setFormError("Please select at least one project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least one user");
      return;
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

    console.log(project, thumbnail);

    // await addDocument(project, thumbnail);
    // if (!response.error) {
    //   history.push("/");
    // }
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

        <div className="label">
          <span>project thumbnail:</span>
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={handleFileChange}
          />
          <label className="file" htmlFor="file">
            <img src={Thumbnail} alt="" className="thumbnail" />
            {!thumbnail && <span>Project thumbnail</span>}
            {thumbnail && <span>{thumbnail.name}</span>}
          </label>
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </div>

        <label>
          <span>Project details:</span>
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
            adding project...
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
