import { useParams } from "react-router-dom";

function UpdateClub() {
    let { clubname } = useParams();
    return (
        <h1>Update  {clubname}</h1>
    )
}
export default UpdateClub;