// react packages
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Select from "react-select";

// hooks
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

// firebase function
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";

// setting task tags
const tags = [
  { value: "ae", label: "AfterEffect" },
  { value: "xd", label: "Adobe XD" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "canva", label: "Canva" },
  { value: "corel", label: "Corel Draw" },
  { value: "css", label: "Css" },
  { value: "figma", label: "Figma" },
  { value: "firebase", label: "Firebase" },
  { value: "flutter", label: "Flutter" },
  { value: "google", label: "Google AD" },
  { value: "fb", label: "Facebook AD" },
  { value: "html", label: "Html" },
  { value: "id", label: "InDesign" },
  { value: "iv", label: "InVision" },
  { value: "illustrator", label: "Illustrator" },
  { value: "javascript", label: "Js" },
  { value: "laravel", label: "Laravel" },
  { value: "node", label: "Nodejs" },
  { value: "photoshop", label: "Photoshop" },
  { value: "php", label: "Php" },
  { value: "python", label: "Python" },
  { value: "react", label: "Reactjs" },
  { value: "native", label: "React Native" },
  { value: "scss", label: "SCSS" },
  { value: "sketch", label: "Sketch" },
  { value: "tailwind", label: "Tailwind" },
  { value: "vue", label: "Vuejs" },
];

export default function CreateTask() {
  const { id } = useParams();
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [tag, setTag] = useState([]);

  const { document: project } = useDocument("projects", id);
  const { addDocument, response } = useFirestore("tasks");

  // form field values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setTag(tags);

    if (project) {
      const options = project.assignedUsersList.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (taskTags.length < 1) {
      setFormError("Please select atleast one task tag");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the task to at least one user");
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

    const task = {
      name,
      description,
      tags: taskTags,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      isCompleted: false,
      projectID: project.id,
    };

    await addDocument(task);

    if (!response.error) {
      history.push(`/projects/${id}`);
    }
  };

  return (
    <div className={`form__create ${mode}`}>
      <h2>Add tasks to your existing project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Task description:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
          <span>Task tags:</span>
          <Select
            onChange={(option) => setTaskTags(option)}
            options={tag}
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

        {response.isPending && (
          <button disabled className={`btn ${mode}`}>
            adding task...
          </button>
        )}
        {!response.isPending && (
          <button className={`btn ${mode}`}>Add Task</button>
        )}
        {formError && <div className={`error ${mode}`}>{formError}</div>}
      </form>
    </div>
  );
}
