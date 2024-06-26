
import React,{useState} from "react";
import "./App2.css"
import {useNavigate} from "react-router-dom"
import {createUserWithEmailAndPassword} from "firebase/auth"
import  Toast  from "../Toast/toast";
import ToastContainer from "../Toast/toastContai";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase";
import axios from "axios";
// this on web page
function Admin(){
   const navigate =useNavigate();
    const [values, setValues] = useState({
      email: "",
      password: "",
      admintype:""
    });

    // const [errorMsg,Toast.error] = useState("")
    const [submitButtonDisabled,setsubmitButtonDisabled] = useState(false)
    const addItem = async() => {
  // this adding admin  on web page
        try {
          console.log(values);
          if(!values.password || ! values.email){
            Toast.error("Enter all the details")
            return;
           }
           axios.post(`http://localhost:2610/admin/register`,
           {
             username:values.email,
             password:values.password,
            admintype:values.admintype,
           
          })
          
           
           setsubmitButtonDisabled(true)
          //  firebase provide the function to create the authenticalion
           createUserWithEmailAndPassword(auth,values.email,values.password).then(async(res)=>{
            console.log(res);
            const user =res.user.email;// this is email is getting 
            console.log(user);
            navigate('/Sal',{state:{user:values.admintype}})

            setsubmitButtonDisabled(false)

           }).catch((erro)=>{
            // console.log(erro.message);
            Toast.error(erro.message);
            setsubmitButtonDisabled(false)});
   
        } catch (error) {
          console.error(error);
        }
      }   
     return (
      <>
      <ToastContainer position="bottom-center" limit={1}/>
       
       
       <form>
          <label for="email"><b>Email</b></label>
          <input type="username" placeholder="Email for Registration" id="email" name="email" onChange={(e)=>setValues((prev)=>({...prev ,email:e.target.value}))} required/>
          
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Password" name="psw"  id='psw'onChange={(e)=>setValues((prev)=>({...prev ,password:e.target.value}))} required/>
          
          <label for="user"><b>User type</b></label>
          <input onChange={(e)=>setValues((prev)=>({...prev ,admintype: e.target.value}))}className="bottomemail"  id ='user' placeholder ="User"/>
          <hr/>
         
          <p>By creating an account you agree to our .</p>
          <button type="submit" className="registerbtn" onClick={e => {addItem(e.preventDefault())}}
          disabled={submitButtonDisabled}>Register</button>
          
          <div class="signin">
          <p>Already have an account?.</p>
          </div>
          </form>
        
         
       
       </>
     )
}
export default Admin;
