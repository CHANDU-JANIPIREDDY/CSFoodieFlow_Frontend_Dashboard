import React,{useState} from 'react'
import  {API_PATH} from '../../data/ApiPath';


const Register = ({showLoginHandler}) => {
    const[username,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(true);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${API_PATH}/vendor/register`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({username,email,password})
            })
            const data= await response.json()
            if(response.ok){
                console.log(data);
                alert("Vendor Register Successfully")
                setUserName("");
                setEmail("");
                setPassword("");
                showLoginHandler();
            }
        } catch (error) {
            console.error('registration Failed',error);
            alert("Registration Failed")
        }
    }

  return (
    <div className='form-container'>
        <form className='authFormLogin' onSubmit={handleSubmit}>
            <h4>VENDOR REGISTER</h4>
            <div className='label-container'>
                <label className='label-name'>USER NAME</label><br />
                <input type="text" className="form-control" name='username' onChange={(e)=>setUserName(e.target.value)} value={username} />
            </div>
            <div className='label-container'>
                <label className='label-name'>EMAIL</label><br />
                <input type="text" className="form-control" name='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className='label-container'>
                <label className='label-name'>PASSWORD</label><br />
                <input type="password" className="form-control" name='password' onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <div >
                <button className='btn btn-primary' type='submit'>SUBMIT</button>
            </div>
        </form>
    </div>
  )
}

export default Register