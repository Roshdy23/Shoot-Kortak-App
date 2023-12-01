import { useParams } from "react-router-dom";

function UpdateStadium() {
    let { matchID } = useParams();
    return (
        <h1>Update Stadium {matchID}</h1>
    )
}
export default UpdateStadium;