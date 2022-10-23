import "./styles.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Scan from './scanner'
import Options from './options'
import Id from './id';
import Register from './register';
import Pending from './pending';
import Approved from './approved';
import Declined from './declined'
import Allusers from './allusers'
import Admin from './admin'
import Login from './login'
import React,{createContext, useState} from 'react';
export const AppContext=createContext(null)
export default function App() {
  const [auth,setAuth]=useState(false)
  const url="https://i.pinimg.com/originals/d5/74/97/d574978a47ffd961b434cb5cd75f3dd2.jpg"
  return (
    <AppContext.Provider value={{auth,setAuth}}>
    <div className="App"  style={{background:'rgba(255,255,255,0.7)',minHeight:'100vh',backdropFilter: 'blur(2px)'}}>
 
 
 {/* <img src={url} style={{height:30,height:30}}/> */}
 <div className="header" style={{color:'black'}}>
   <div className="logo">M</div>
  <a href="/"  style={{color:'black'}}>  Motobike Verification </a>
   
   <div style={{flex:1}}></div>
   <div style={{alignSelf:'flex-end'}}> <a href='/register'>  <div style={{alignSelf:'flex-end',color:'black'}}>Register</div></a></div>

   
   </div>

 <div className="buttons">

   <Router>
<Routes>
<Route path="/"  element={<Options/>} />

<Route path="/scan" element={<Scan/>} />
<Route path="/id" element={<Id/>} />
<Route path="/register" element={<Register/>} />
<Route path="/pending" element={<Pending/>} />
<Route path="/approved" element={<Approved/>} />
<Route path="/declined" element={<Declined/>} />
<Route path="/users" element={<Allusers/>} />
<Route path="/admin" element={<Admin/>} />
<Route path="/login" element={<Login/>} />
  </Routes>
   </Router>
 </div>
    </div>
    </AppContext.Provider>
  );
}
