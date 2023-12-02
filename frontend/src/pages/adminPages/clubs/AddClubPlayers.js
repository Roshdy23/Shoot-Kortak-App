import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';

function AddClubPlayers() {
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>INSERT PLAYERS INFO</h3>
                <div className='row'></div>
                <InputWithLabel label="Player First Name" placeholder="insert player name" />
                <InputWithLabel label="Player Second Name" placeholder="insert player name" />
                <InputWithLabel label="Player NickName" placeholder="insert player nickname" />
                <InputWithLabel label="Player Birth Date" placeholder="insert player birth date" />
                <InputWithLabel label="Player Nationallity" placeholder="insert player nationallity" />
                <InputWithLabel label="Player Photo Url" placeholder="insert player photo url" />
                <InputWithLabel label="Player Height" placeholder="insert player height" />
                <InputWithLabel label="Player Foot" placeholder="insert player foot" />
                <InputWithLabel label="Player Market Value" placeholder="insert player market value" />
                <button class="btn btn-success col col-lg-1" >Add</button>
                <Link class="btn btn-danger ms-4 col col-lg-3" to="/clubs/add/coach">Finish and Proceed to Club's Coach</Link>
                <div className='mt-5'></div>
            </div>
        </>
    )
}
export default AddClubPlayers;