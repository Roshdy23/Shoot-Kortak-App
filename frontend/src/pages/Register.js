
import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Link } from 'react-router-dom';


function Register() {
    const [startDate, setStartDate] = useState(new Date());
    const gen = ["Male", "Female"];
    return (
        <>
            <div className='register template d-flex justify-content-center align-items-center 100-w vh-100 bg-black'>
                <div className='40-w p-5 rounded bg-white'>
                    <form>
                        <h3 className='text-center'>Register</h3>
                        <div className='mb-2'>
                            <label htmlFor='text'>First Name</label>
                            <input type='text' placeholder='Enter Your First Name' className='form-control' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='text'>Second Name</label>
                            <input type='text' placeholder='Enter Your Second Name' className='form-control' />
                        </div>
                        <div className='container my-3'>
                            <div className='row '>
                                <div className='col'><label >Birth Date</label></div>
                                <div className='col'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="input-group mb-3">
                                <label className="input-group-text" style={{ height: "100%" }} htmlFor="inputGroupSelect01">Gender</label>
                                <select className="form-select" id="inputGroupSelect01">
                                    <option defaultValue>Choose..</option>
                                    {gen.map((value, index) => (
                                        <option key={index + 1} >{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter Your Email' className='form-control' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Your Password' className='form-control' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='Username'>Username</label>
                            <input type='text' placeholder='Enter Your Username' className='form-control' />
                        </div>
                        <div className='d-grid mt-5'>
                            <Link className='btn btn-primary' to="/">register</Link>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
}

export default Register;