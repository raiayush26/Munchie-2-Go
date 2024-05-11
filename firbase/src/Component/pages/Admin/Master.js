import  React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import  { useEffect, useState } from 'react'
import axios from 'axios';

import { Button } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
// import { auth } from '../../../firebase';
import{ auth} from '../../firebase'
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
export default function Master() {
  const navigator = useNavigate();
  // const id = location.state.seatNo;
  // console.log(id);
  const [user,setUser] = useState([])
  const [Active,setActive]=useState(false)
  const [deactive,setdeactive]=useState(false)

  const getOrder =async() =>{
    try {
      const res = await axios.get(`http://localhost:2610/admin/user`)
      setUser(res.data)
      }catch (error) {console.log("error");}
}
const Deactivate=(e)=>{
  try {
    axios.put(`http://localhost:2610/admin/updated/deactive/${e}`)
    setActive(false)
    setdeactive(true)
    }catch (error) {console.log("error");}
}
const Activate=(e)=>{
  try {
    axios.put(`http://localhost:2610/admin/updated/active/${e}`)
    setActive(true)
    setdeactive(false)
    }catch (error) {console.log("error");}
}
const logout=()=>{
 console.log("hello");
 
 navigator('/');
  signOut(auth).then(() => {
    alert('Succesful sign out');
}).catch((error) => {
  // An error happened.
});
}
useEffect(()=>{getOrder();},[])
const columns2 =[
{field: 'username',headerName:'Username',width: 200},
{field:'access',headerName:'Active/deactive',width: 200},
{ field:'Deactivate',headerName:'Deactivate',width: 200,renderCell:(params)=>{
  return(
    
    <Button disabled={deactive} onClick={(e)=>Deactivate(params.id)}>Deactivate</Button>
  )
}},
{ field:'Active',headerName:'Active',width: 200,renderCell:(params)=>{
  // console.log(params.id);
  return(
    
    <Button disabled={Active} onClick={(e)=>Activate(params.id)}>Activate</Button>
  )
}},

]

  return (
    <>
    <Sidebar/>
    
    <div style={{ height: 700,marginLeft:150,  width: '100%' }}>
    <button onClick={(e)=>logout(e)}>signOut</button>
      <DataGrid
        rows={user}
        disableSelectionOnClick
        columns={columns2}
        getRowId={(row) => row._id}
        pageSize={10}
      />
    </div>
    
    </>
  )
}





