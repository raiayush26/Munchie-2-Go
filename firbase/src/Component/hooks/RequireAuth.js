import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Roles from "./Roles";
// import Master from "../pages/Admin/Master";
import Login from "../pages/Admin/Login";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const RequireAuth = ()=>{
          const [isAuthenticated,setAuthenticated]= useState(false)
          // const[admin,setadmin]= useState(false)
          const navigator = useNavigate()
useEffect(()=>{
  // console.log(Roles);
  // Roles.forEach()
  auth.onAuthStateChanged((user)=>{
    if (user) {
      console.log(user);
      if (user.email == "master@admin.com") {
        setAuthenticated(true);
        
      } else {
        
        setAuthenticated(true);
      }
      // setAuthenticated(true)
    } else {
      // setAuthenticated("salve")
      
    }

  });
  // eslint-disable-next-line 
},[])
          // const {auth} = useAuth();
          // const location = useLocation()
          // console.log( auth);
          return(
            (isAuthenticated===true)?<Outlet/>:<Login/> 
                    
          );
          
}
export default RequireAuth