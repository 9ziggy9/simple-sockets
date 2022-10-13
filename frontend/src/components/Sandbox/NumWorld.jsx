import {useParams} from "react-router-dom";

export default function NumWorld() {
  let params = useParams();
  return <h2>WORLD: {params.worldId}</h2>;
}
