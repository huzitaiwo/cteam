// react packages
import { useLocation } from "react-router-dom";

// hooks & components
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import Loader from "../../components/Loader";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const { documents, error, isPending } = useCollection("projects");

  const projects =
    documents &&
    documents.filter((project) =>
      project.name.toLowerCase().includes(query.toLocaleLowerCase())
    );

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      {projects && (
        <>
          <h3>
            Projects including "{query}" ({projects.length})
          </h3>
          {projects.map((project) => (
            <ProjectList project={project} key={project.id} />
          ))}
        </>
      )}
    </div>
  );
}
