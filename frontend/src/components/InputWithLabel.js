
function InputWithLabel(props) {
    return (
        <>
            <div className='row mt-3'>
                <div className='col col-lg-9'>
                    <div className="row mb-3">
                        <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">{props.label}</label>
                        <div class="col-sm-10 col-lg-6">
                            <input type="text" className="form-control" id="colFormLabel" placeholder={props.placeholder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InputWithLabel;