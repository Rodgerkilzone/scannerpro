import React,{useEffect,useState,useContext} from 'react'
import {db} from './firebase-config'
import { collection,getDocs, query, where,updateDoc,doc } from '@firebase/firestore';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import {AppContext} from './App'
const Pending=()=>{
const {auth}=useContext(AppContext)
const userCollection=collection(db,"users")
const [user,setUsers]=useState({})
const [list,setList]=useState([])
const [search,setSearch]=useState("")
const [err,setErr]=useState("")
const [loading,setLoading]=useState(false)
const [reason,setReason]=useState("");
const navigate = useNavigate();
useEffect(()=>{
    const p1=new Promise((resolve,reject)=>{
      var v=window.localStorage.getItem('auth');
      resolve(v)
    })
    Promise.all([p1]).then((value)=>{
     if(value[0]=='false' || value[0]==null  ){
      navigate('/login')
    }
    })
       getUsers();
  },[])
  const getUsers=async ()=>{
    setLoading(true)
const g=query(collection(db, "users"), where("approval", "==",'pending'));

    const data =await  getDocs(g);
    var obju=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
    console.log(obju)
    var result = obju;
     setList(result)
    // if(result[0]!=null || typeof result[0]!="undefined"){
    //     console.log(result)
       
    //    setUsers(result[0])
    //    setErr("")
    // }else{
    //   setUsers({})
    //   setErr("No User with ID:"+search)
    // }
   
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

    const approve= async(p,id)=>{
      setLoading(true)
     const docRef = doc(db, "users", id);
     
const data = {
    approval: p,
    reason:reason
  };
  
 await updateDoc(docRef, data)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })

  getUsers()
  setLoading(false);
    }
     return <div>
   <h3 style={{background:'white'}}>Search Account</h3>
     <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder="Search by name" />
       {/* <button className="sub" onClick={()=>{find()}}>Submit</button> */}
   
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
     
  
     <h3 style={{background:'white'}}> User information</h3>
     {list.length==0 && <h4 style={{background:'white'}} >NO PENDING APPROVAL</h4>}
     {/* {err} */}
     {/* {Object.keys(user).map((u,i)=>
       <div key={i} style={{margin:2,display:"flex"}}>
        
        <div style={{minWidth:80}}>
            
            <img src={user.passport_image}  />
            <strong >{Object.keys(user)[i]}:{' '}</strong></div><div>{Object.values(user)[i]}</div>
        
        
        </div>
     )} */}
  <div style={{width:'100vw',display:'flex',flexWrap:'wrap',flexDirection:'row'}}>

  ;




     {list.filter(function (el) {
         var condition = new RegExp(search.toUpperCase() )
         return condition.test(el.fullname.toUpperCase());
}).map((user,i)=>{
        return <div key={i} style={{display:'flex',maxWidth:500}} className="card3" > 
            
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
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Mpesa message:{' '}</strong></div><div>{user.mpesa_msg}</div>
         </div>
         <div style={{margin:2,display:"flex"}}>   
         <div >    
             <strong >Date:{' '}</strong></div><div>{user.date}</div>
         </div>
       
       <div><a href={user.idcard_image} target="_blank">
<button>VIEW IDCARD</button>
</a></div>
<div style={{margin:2,display:"flex"}}>   
         <div >    
             
             <input  type='text' onChange={(e)=>{setReason(e.target.value)}} placeholder='Decline reason' />
             </div>
         </div>

         <div style={{margin:2,display:"flex"}}>   
         <div >    
       

             
             <button className='sub' onClick={()=>{approve('approved',user.id)}}>Approve Account</button>
             <button className='sub' style={{background:'red'}} onClick={()=>{approve('declined',user.id)}}>Decline Account</button>
             </div>
         </div>
 
         
      </div></div>
     })}


    
     </div>
          {/* <i style={{color:'green'}}>User registered !!!</i> */}
    {loading  && <div style={{width:'100vw',height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:'100vw',background:'rgba(0,0,0,0.6)',zIndex:-2,height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     
     </div>

<div style={{background:'white',borderRadius:10,width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}><h3>Loading...</h3>

</div>
      
     </div>}
       </div>
    }
    export default Pending