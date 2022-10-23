import "./styles.css";
import {AppContext} from './App'
import React,{useContext,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
const Options=()=> {
const {auth}=useContext(AppContext)
const navigate = useNavigate();
useEffect(()=>{
  const p1=new Promise((resolve,reject)=>{
    var v=window.localStorage.getItem('auth');
    resolve(v)
  })
  // console.log(window.localStorage.getItem('auth')+'shjd')
  Promise.all([p1]).then((value)=>{
    
   if(value[0]=='false' || value[0]==null  ){
    navigate('/login')
  }
  })
 
},[])
  return (
    <div className="c">
<div className="buttons card2" >
 <h3>ADMIN SECTION</h3>
 
   <a href="/pending"><button className="btn" style={{marginLeft:0,padding:0}}>PENDING ACCOUNTS</button></a>
   <a href="/approved"> <button className="btn" style={{marginLeft:0,padding:0}}>APPROVED ACCOUNTS</button></a>
   <a href="/declined"> <button className="btn" style={{marginLeft:0,padding:0}}>DECLINED ACCOUNTS</button></a>
   <a href="/users"> <button className="btn" style={{marginLeft:0,padding:0}}>ALL ACCOUNTS</button></a>
   <hr/>
   <button className="btn1" onClick={()=>{window.localStorage.setItem('auth', false);
  navigate('/login')
  }} style={{marginLeft:0,padding:0,width:80,height:35}}>LOGOUT</button>
 
   
 </div>
    </div>
  );
}
export default Options;