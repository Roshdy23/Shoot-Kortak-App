import React from 'react'

function Dropdown(props) {
    return (
        <div className="dropdown col col-lg-1 mt-2">
            <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.title}
            </button>
            <ul className="dropdown-menu">
                {props.vals.map((value, index) => (
                    <li><a key={index + 1} className="dropdown-item" href="/#">{value}</a></li>
                ))}
            </ul>
        </div>
    )
}
export default Dropdown;