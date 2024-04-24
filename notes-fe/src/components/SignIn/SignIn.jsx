import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
function Signin() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        const user = { username, password };

        axios({
            method: "POST",
            url: "http://127.0.0.1:3000/user/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                console.log("User logged in");
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert("Authentication failed",err);
                setUsername("");
                setPassword("");
            });
    };

    const handleReg = (e) => {
        e.preventDefault();

        const user = { username, password };

        axios({
            method: "POST",
            url: "http://127.0.0.1:3000/users/create",
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                console.log("New User created");
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert(err);
                setUsername("");
                setPassword("");
            });
    };

    
  return (
    <div className='signin'>
        <h1 className='sihead'>Notes</h1>
        <div className='siform'>
            <form>
                <div className='un'>
                    <span className='formlabel'>UserName</span>
                    <input type="text" className='formin' required value={username} onChange={(e)=>{
                        setUsername(e.target.value);
                    }}></input>
                </div>
                <div className='pw'>
                    <span className='formlabel'>Password</span>
                    <input type="password" className='formin' required value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}></input>
                </div>
                <div className='formbtn'>
                    <button className='signin' onClick={handleSignin}>SignIn</button>
                    <button className='reg' onClick={handleReg}>Register</button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default Signin
