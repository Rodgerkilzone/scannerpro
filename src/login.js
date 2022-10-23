import React,{useEffect,useState,useContext} from 'react'
import {db} from './firebase-config'
import { collection,getDocs,query,where } from '@firebase/firestore'
import QRCode from "react-qr-code";
import { useNavigate  } from 'react-router-dom'
import {AppContext} from './App'
const Id=()=>{
const {auth,setAuth}=useContext(AppContext)

    const navigate = useNavigate();
const userCollection=collection(db,"users")
const [user,setUsers]=useState({})
const [search,setSearch]=useState("")
const [err,setErr]=useState("")
const [list,setList]=useState([])
const [loading,setLoading]=useState(false)
  useEffect(()=>{
  //  getUsers();
  },[])
  const getUsers=async ()=>{
    setLoading(true)
    const q = query(collection(db, "auth"), where("password", "==",search.replace(/(\r\n|\n|\r)/gm, "")));
    const data =await  getDocs(q);

    var obju=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
    console.log(obju)
    // var result = obju.filter(obj => {
    //   return obj.idno === search
    // })
    // if(result[0]!=null || typeof result[0]!="undefined"){
    //    setUsers(result[0])
    //    setErr("")
    // }else{
    //   setUsers({})
    //   setErr("No User with ID:"+search)
    // }
    if(obju.length==0){
        setErr('Wrong Password')
        window.localStorage.setItem('auth', false);
    }else{
        window.localStorage.setItem('auth', true);
        setAuth(true)
        navigate("/admin")

    }
//    setList(obju)
// console.log(obju)
setLoading(false)
    // console.log(JSON.stringify({"data":data._userDataWriter}))

  }
  const find=()=>{
getUsers()
  }
    // const user={
    //  "Name":"Rogder Kilonzo",
    //  "No Plate":"KCB 232",
    // "Location":"Zimmerman",
    // "Phone":"0721908323",
    // "ID no":"32384825",
    // "Stage":"Canopy",
    // "SACCO":"Canopy Bike Sacco"
    // }
     return <div className="card2" style={{display:'flex',justifyContent:'center',alignItems:'centers',flexDirection:'column'}}>
      <h3>Admin Login</h3>
     <input type="password" onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder="Enter password" />
        <strong style={{color:'red'}}>{err}</strong>
    
     <br/>

     <button className="sub" onClick={()=>{find()}}>Login</button>
     <br/> <br/>
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
     
     {loading  && <div style={{width:'100vw',height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:'100vw',background:'rgba(0,0,0,0.6)',zIndex:-2,height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     
     </div>

<div style={{background:'white',borderRadius:10,width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}><h3>Loading...</h3>

</div>
      
     </div>}
       </div>
    }
    export default Id