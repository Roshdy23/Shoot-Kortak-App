import React from 'react'

function Dropdown(props) {
    return (
        <div className="dropdown col col-lg-1 mt-2">
            <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.title}
            </button>
            <ul className="dropdown-menu">
                {props.vals.map((value, index) => (
                    <li><button key={index + 1} className="dropdown-item" onClick={() => {
                        props.sett(value);
                    }}>{value}</button></li>
                ))}
            </ul>
        </div>
    )
}
export default Dropdown;