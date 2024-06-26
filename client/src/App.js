// client app.js
import React from "react";
import NoPage from './Component/pages/NoPage/nopage'
import Payment from './Component/pages/Payment';
import PayPal from './Component/pages/Item/PayPal';
import COD from './Component/pages/Item/COD';
import App1 from './Component/pages/Home/App1';
import Home from "./Component/pages/Home/Home";
import OrderSucc from "./Component/pages/Item/OrderSuccess";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
 
function App() {
  return (
    <>
    <Router>
      <Routes>
                
      {/* Public Routes */}
      <Route path ="/" element= {<Home/>}/>
      <Route path = "/:Code" element = {<App1/>}/>
      <Route path = '/payment' element = {<Payment/>}/>
      <Route path = '/paypal' element = {<PayPal/>}/>
      <Route path = '/cod' element = {<COD/>}/>   
      <Route path = '/ordersucc' element = {<OrderSucc/>}/> 
      
      {/* Cath all other site */}
      <Route path= 'no' element ={<NoPage/>}/>
      </Routes>
    </Router>
      
    </>
  )
}
export default App;