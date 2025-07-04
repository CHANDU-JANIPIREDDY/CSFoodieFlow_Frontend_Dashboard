import React,{useState} from 'react';
import  {API_PATH} from '../../data/ApiPath';

const Login = ({showHomeHandler}) => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const loginHandler = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${API_PATH}/vendor/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email,password})
            });
            const data = await response.json();

            if (response.ok){
                alert("User Login Successfully");
                setEmail("");
                setPassword("");
                localStorage.setItem('loginToken', data.token);
                showHomeHandler();

                const vendorId = data.vendorId;
                console.log("VendorId", vendorId);
                console.log('checking for vendor id:', vendorId);

                const vendorResponse = await fetch(`${API_PATH}/vendor/single-vendor/${vendorId}`);
                const vendorData = await vendorResponse.json();

                if (vendorResponse.ok){
                    const vendorFirmId = vendorData.vendorFirmId;
                    const vendorFirmName = vendorData.vendor.firm[0].firmname;
                    console.log('Checking for firmId:', vendorFirmId);
                    localStorage.setItem('firmId', vendorFirmId);
                    localStorage.setItem('firmname', vendorFirmName);
                    window.location.reload();
                }
            } else {
                alert(data.error || "Login Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-container'>
            <form className='authFormLogin' onSubmit={loginHandler}>
                <h4>VENDOR LOGIN</h4>
                <div className='label-container'>
                    <label className='label-name'>EMAIL</label><br />
                    <input type="text" className="form-control" placeholder='Enter your email' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='label-container'>
                    <label className='label-name'>PASSWORD</label><br />
                    <input type="password" className="form-control" placeholder='Enter Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div >
                    <button className='btn btn-primary' type='submit'>SUBMIT</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
