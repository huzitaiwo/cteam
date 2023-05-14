// react&react-router packages
import { useParams } from "react-router-dom";

// hooks
// import { useDocument } from '../../hooks/useDocument'
// import { useTheme } from '../../hooks/useTheme'

// components
// import Avatar from '../../components/Avatar'
// import Comment from './Comment'

// styles
import "./Project.css";

export default function Project() {
  // const { mode } = useTheme()
  const { id } = useParams();
  // const { document: project, error, isPending } = useDocument('projects', id)

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  // if (isPending) {
  //   return <h4>loading...</h4>;
  // }

  return <div>{id}</div>;
}
