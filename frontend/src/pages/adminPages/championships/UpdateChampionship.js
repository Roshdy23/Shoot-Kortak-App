import { useParams } from "react-router-dom";

function UpdateChampionship() {
    let { championshipname } = useParams();
    return (
        <h1>Update championship {championshipname}</h1>
    )
}
export default UpdateChampionship;