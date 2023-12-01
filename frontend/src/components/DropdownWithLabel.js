import React from 'react'

function DropdownLabel(props) {
    return (
        <div className="row mt-3">
            <div className="col col-lg-6">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">{props.label}</label>
                    <select className="form-select" id="inputGroupSelect01">
                        <option defaultValue>Choose...</option>
                        {props.val.map((value, index) => (
                            <option key={index + 1} >{value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
export default DropdownLabel;