
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-black'>
                <div className='p-5 rounded bg-white' style={{ width: "25%" }}>
                    <form>
                        <h3 className='text-center'>LOGIN</h3>
                        <div className='mb-2'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter Your Email' className='form-control' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Your Password' className='form-control' />
                        </div>
                        <div className='mb-2'>
                            <input type='checkbox' className='custom-control custom-checkbox' id="check" />
                            <label htmlFor='check' className='custom-input-label ms-2'>Remember me</label>
                        </div>
                        <div className='d-grid'>
                            <Link className='btn  btn-primary mt-3' to={`/main`}>Login</Link>
                            <Link className='btn  btn-primary mt-3' to={`/register`}>Register</Link>
                        </div>
                        <p className='text-right mt-4'>
                            <a href='/#'>Forget Password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;