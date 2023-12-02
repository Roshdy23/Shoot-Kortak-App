import { useParams } from "react-router-dom";

function UpdateItem() {
    let { itemname } = useParams();
    return (
        <h1>Update  {itemname}</h1>
    )
}
export default UpdateItem;