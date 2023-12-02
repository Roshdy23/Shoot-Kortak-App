import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useParams } from "react-router-dom";

function AddItems() {
    let { viewstorename } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Item To {viewstorename}</h3>
                </div>
                <InputWithLabel label="Name" placeholder="insert item name" />
                <InputWithLabel label="Quantity" placeholder="insert item quantity" />
                <InputWithLabel label="Price" placeholder="insert item price" />
                <InputWithLabel label="Discount" placeholder="insert item discout" />
                <button class="btn btn-success col col-lg-1 mt-4" >Add</button>
            </div>
        </>
    )
}
export default AddItems;