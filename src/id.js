import React,{useEffect,useState} from 'react'
import {db} from './firebase-config'
import { collection,getDocs } from '@firebase/firestore'
const Id=()=>{

const userCollection=collection(db,"users")
const [user,setUsers]=useState({})
const [search,setSearch]=useState("")
const [err,setErr]=useState("")


  useEffect(()=>{
  //  getUsers();
  },[])
  const getUsers=async ()=>{


    const data =await  getDocs(userCollection);
    var obju=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
    console.log(obju)
    var result = obju.filter(obj => {
      return obj.idno === search
    })
    if(result[0]!=null || typeof result[0]!="undefined"){
       setUsers(result[0])
       setErr("")
    }else{
      setUsers({})
      setErr("No User with ID:"+search)
    }
   
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
     return <div className="card2">
      <h3>Search Motorist by ID</h3>
     <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder="Enter ID Number" />
     <button className="sub" onClick={()=>{find()}}>Submit</button>
     <br/> <br/>
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
     
    <div className="card">
     <h3> User information</h3>
     {err}
     {Object.keys(user).map((u,i)=>
       <div key={i} style={{margin:2,display:"flex"}}><div style={{minWidth:80}}><strong >{Object.keys(user)[i]}:{' '}</strong></div><div>{Object.values(user)[i]}</div></div>
     )}</div>
       </div>
    }
    export default Id