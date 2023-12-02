import { useParams } from "react-router-dom";

function UpdateMatch() {
    let { matchID } = useParams();
    return (
        <h1>Update match {matchID}</h1>
    )
}
export default UpdateMatch;