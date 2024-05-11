import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'react-toastify/dist/ReactToastify.css'; 
import './home.css'
function Home() {
  
  const [input,setInput]= useState("");
  const navigate = useNavigate();
  const HomePage=()=>{
    if(input===""){
      toast.error("Please enter the code")
    }
    else{
      navigate(`/${input}`, { replace: true })
      toast.success("Code entered successfully")
    }
  }
  return (
    <>
    <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
   <div className="App container">
      <div className="">
        <h1
          style={{
            color: "green",
            fontSize: "40px",
            fontWeight: "bolder"
          }}
        >
          Munchies-2-Go
        </h1>
      </div>
    </div>
    <div className="user2">

            <h1>Enter the code</h1>
            <div className="user">
              <input type="text"  value={input} placeholder="Enter the code" onInput={(e)=>setInput(e.target.value)} autofocus/>
              <button className='home-btn' onClick={HomePage}>Click me</button>
              {/* <Link to={`/${input}`}><button className='home-btn' onClick={HomePage}>Click me</button></Link> */}
            </div>
    </div>
  
  
    </>
  )
}

export default Home
