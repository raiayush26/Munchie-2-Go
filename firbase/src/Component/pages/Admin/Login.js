import React, { useState} from "react";
import{ auth} from '../../firebase'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth"




// Toast or display the message of login status
import  Toast  from "../Toast/toast";
import ToastContainer from "../Toast/toastContai";
import 'react-toastify/dist/ReactToastify.css';

// this is  Admin login
function Login() {

  const navigate = useNavigate();


  const[ EmailID,setUsername]= useState([null]);
  const[ password,setPassword]= useState([null]);

  const [submitButtonDisabled,setsubmitButtonDisabled] = useState(false);

  
  const handleLogin = async(e) => {
    try {
      // console.log(username);
      if(!EmailID.length|| !password.length){ // Checking the value of the filed is null or not
        Toast.error("Make sure all the fields are filled")
        return;
       }
       const res = await axios.get(`http://localhost:2610/admin/getname/${EmailID}`)
       if(res.data.length===0){
        Toast.error("User not found")
        return;
       }
       const {username, access,admintype} = res.data[0];
       console.log(username);
       console.log(access);
       console.log(admintype);
       //firebase provide the function to create the authentication
      signInWithEmailAndPassword(auth,username,password).then(async(res)=>{
      
        if(username ==="master@admin.com"){
         
          navigate("/master", {replace: true}) 
        }else{
         if(access===true){
          console.log(admintype);
          navigate("/Sal",{state:{user:admintype}})
        
        }
          else
          Toast.error("Account Deactivated.Contact Admin");
          
        }
        setsubmitButtonDisabled(false)
       }).catch((error)=>{
        console.log(error.message);
        Toast.error(error.message);
        setsubmitButtonDisabled(false)});
        
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <>
       <div className="register">
      
        <ToastContainer position="bottom-center" limit={1}/>
            <form className="register-form">    
                <h1 className="h3 heading-h1 mb-3 mb-4 fw-normal">Login </h1>
                <input onChange={(e)=>setUsername(e.target.value) } className="bottomemail" type="email"  placeholder ="E-mail"/><br/>
                <input  onChange={(e)=>setPassword(e.target.value)}className="bottomemail" type="password" placeholder ="Password" autoComplete="false"/>
                <button disabled={submitButtonDisabled} className="registerbtn" onClick={e=>{handleLogin(e.preventDefault());}} id="login-button">Login </button> 
                
            </form>
            
        </div>
       
    </>
  )
}

export default Login
