import React, {useState } from "react";

import { useLocation, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
 
} from "firebase/auth";
import { auth } from '../.././../firbase/firebase';

import "firebase/auth";
import SignIn from "./SignIn";

export default function COD(){
  const location =useLocation();
  const orderID = location.state.orderID;
  const navigate=useNavigate();
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [users, setUsers] = useState(null);
 

  const [, setUser] = useState(false);
  // const [phone, setPhone] = useState("");
  const [phone1,setPhone1]=useState('');
  const [disable, setDisable] = useState(true);
 

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    const phone_number = "+91" + e.target.phone.value;
    // const recaptcha = new RecaptchaVerifier()
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",});
    const confirmation = await signInWithPhoneNumber(
      auth,
      phone_number,
      recaptcha
    );
    
    setViewOtpForm(true);
    console.log(confirmation);
    setUsers(confirmation);
    toast.success("OTP SENT SUCCESSFULLY");
    console.log(phone_number);
  };

  const otpSubmit = async (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;
    console.log(opt_number);
    await users.confirm(opt_number).then((res) => {
      console.log(res);
      console.log("success,otp verified!");
      toast.success("Please  Click on Confirm Order Button to Place Order");
      setDisable(false);
      
    
      });
  };

  
    const seatNo = location.state.seatNo;
    const name = location.state.name;
    const HallNo = location.state.HallNo; 
    const food = location.state.food; 
    const radio = location.state.radio;
    const Mall = location.state.Mall;
    function handleOnChange(e){
      setPhone1(e.target.value)
    }
    // console.log(phone);
    const price = location.state.price; 
    function handleOnClick(cart) {
      console.log(radio);
            console.log(price);
            axios.post(`http://localhost:2610/order/Order/post`,
            {
            orderID:orderID,
            foodName:food,
            foodPrice:price,
            seatNo:seatNo,
            HallNo:HallNo,
            radio:radio,
            phone:phone1,
            paymentMode:"COD",
            Orderby:Mall
           })
            // navigate("/payment",{state: {Id : cart,price : price,seatNo : seatNo,HallNo:HallNo,name:name}});
            navigate("/ordersucc",{state: {orderID:orderID}})

          }


    return(
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
    <div
        className="container card border-info shadow text-center"
        style={{ maxWidth: "40rem", minWidth: "10rem",display:"flex"}}
      >
          <div id="recaptcha-container"></div>

    <SignIn
            loginSubmit={loginSubmit}
            otpSubmit={otpSubmit}
            viewOtpForm={viewOtpForm}
            handleOnChange={handleOnChange}
            DivContainer="recaptcha-container"
          />
          
    <h4>Seat Number: <input
                style={{width:"50px"}}
                type="text"
                placeholder="SeatNo"
                name="phone"
                value={seatNo}
              /></h4>
    <h4>Name: {name}</h4>
    <h4>HallNo: {HallNo}</h4>
    <h4>Mall: {Mall}</h4>
    <h4>Amount to Pay: {price}</h4>
    <button disabled={disable}  onClick={handleOnClick} style={{padding: "5px 8px",margin: "5px",borderRadius: "10px"}}>Confirm Order</button>
    </div>
    </>
)
}
