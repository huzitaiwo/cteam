// react&react-router packages
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

// hooks
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";

// components
// import Avatar from '../../components/Avatar'
import Header from "../../components/Header";
import ProjectDetails from "../../components/ProjectDetails";
// import Comment from './Comment'

// styles
import "./Project.css";

export default function Project() {
  const { mode } = useTheme();
  const { id } = useParams();
  const history = useHistory();
  const { document: project, error, isPending } = useDocument("projects", id);
  const { documents: tasks } = useCollection("tasks", ["projectID", "==", id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <h4>loading...</h4>;
  }

  if (!project) {
    return (
      <p className={`project-redirect ${mode}`}>
        Could not retrieve project details{" "}
        <button
          onClick={() => {
            history.goBack();
          }}
        ></button>
      </p>
    );
  }

  // console.log(project, tasks);

  return (
    <div>
      <Header grid={true} list={false} pID={id} />
      <div className={`project ${mode}`}>
        {project && <ProjectDetails project={project} tasks={tasks} />}
      </div>
    </div>
  );
}
