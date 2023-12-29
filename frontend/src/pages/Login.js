
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../constants/url.constants"
import { baseUrl } from '../constants/url.constants';
import Cookies from 'js-cookie';
function Login({refresh,setRefresh}) {
    const [email,setEmail] = useState();
    const [password,setPass] = useState();
    const [error,setError] = useState("");
    const navigate = useNavigate();
    
    
    const handlelogin = () =>{
        if(email.includes("@"))
        {

            fetch(`${baseUrl}/Authentication`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"application/json"
                },
                body: JSON.stringify({
                    username : email,
                    password: password
                })
            }
            ).then(
                res=>res.json()
                ).then( data => 
            {
            if(data.length>30)
            {
                Cookies.set("jwt",data,{expires:300});
                setRefresh((refresh===1)?0:1);
                navigate("/");
            }
            else
            {console.log("err : "+ data)
            setError(data);
        }
            }).catch(ex=>console.log(ex.message));
        }
        else
        {
            setError("Email invalid");
        }
    }
    return (
        <>
            <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-black'>
                <div className='p-5 rounded bg-white' style={{ width: "25%" }}>
                    <form>
                        <h3 className='text-center'>LOGIN</h3>
                        <div className='mb-2'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter Your Email' className='form-control' onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Your Password' className='form-control' onChange={(e)=>{setPass(e.target.value)}} />
                        </div>
                        <div className='mb-2'>
                        </div>
                        <div className='d-grid'>
                            <div type='submit' onClick={handlelogin} className='btn  btn-primary mt-3'> Login </div>
                            <Link className='btn  btn-primary mt-3' to={"/register/"} >Register</Link>
                        </div>
                        <p className='text-right mt-4' style={{color:"red"}}>
                            {error}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;