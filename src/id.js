import React,{useEffect,useState} from 'react'
import {db} from './firebase-config'
import { collection,getDocs,query,where } from '@firebase/firestore'
import QRCode from "react-qr-code";
const Id=()=>{

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
    const q = query(collection(db, "users"), where("idno", "==",search.replace(/(\r\n|\n|\r)/gm, "")), where("approval", "==",'approved'));
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
   setList(obju)
    // console.log(JSON.stringify({"data":data._userDataWriter}))
    setLoading(false)
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
     {/* {Object.keys(user).map((u,i)=>
      
      
      
      <div key={i} style={{margin:2,display:"flex"}}><div style={{minWidth:80}}><strong >{Object.keys(user)[i]}:{' '}</strong></div><div>{Object.values(user)[i]}</div></div>
     )} */}
    {list.map((user,i)=>{   return<div  style={{display:'flex',maxWidth:500}} className="card3" > 
            
            <div >
<img style={{height:145,width:120}} src={user.passport_image}  />
<div style={{margin:2,display:"flex",flexDirection:'column',width:'100%',alignItems:'center'}}>   
        <div style={{marginTop:10}}>    

            <strong >QRCODE{' '}</strong></div><div  style={{marginTop:10}}> <QRCode
    size={256}
    style={{ height: 100, maxWidth: 100, width: 100 }}
    value={user.idno}
    viewBox={`0 0 256 256`}
    /></div>
       
        </div>
</div>
             <div>
        <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Full Name:{' '}</strong></div><div>{user.fullname}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Email:{' '}</strong></div><div>{user.email}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Phone No.:{' '}</strong></div><div>{user.phone}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >ID number:{' '}</strong></div><div>{user.idno}</div>
         </div>
 
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Location:{' '}</strong></div><div>{user.location}</div>
         </div>
 
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Stage name:{' '}</strong></div><div>{user.stage}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Sacco:{' '}</strong></div><div>{user.sacco}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Driving lc no :{' '}</strong></div><div>{user.drivinglc}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Bike no. :{' '}</strong></div><div>{user.bike}</div>
         </div>
         {/* <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Mpesa message:{' '}</strong></div><div>{user.mpesa_msg}</div>
         </div> */}
       {/* <div><a href={user.idcard_image} target="_blank">
<button>VIEW IDCARD</button>
</a></div><br/> */}
         <div style={{margin:2,display:"flex"}}>   
         <div >    
       

             
             {/* <button className='sub'>Approve Account</button>
             <button className='sub' style={{background:'red'}}>Decline Account</button> */}
             </div>
         </div>
 
         
      </div></div>
    })}


     </div>
     {loading  && <div style={{width:'100vw',height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:'100vw',background:'rgba(0,0,0,0.6)',zIndex:-2,height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     
     </div>

<div style={{background:'white',borderRadius:10,width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}><h3>Loading...</h3>

</div>
      
     </div>}
       </div>
    }
    export default Id