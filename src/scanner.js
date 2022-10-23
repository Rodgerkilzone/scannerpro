import { QrReader } from 'react-qr-reader';
import React,{useEffect,useState} from 'react'
import {db} from './firebase-config'
import { collection,getDocs, query, where } from '@firebase/firestore'
import Webcam from "react-webcam";
import QRCode from "react-qr-code";
const Scan = () => {
  const [data, setData] = useState('No result');
  const [selected, setSelected] = useState("environment");
  const userCollection2=collection(db,"users")
  const [user,setUsers]=useState({})
  const [list,setList]=useState([])
  const [search2,setSearch]=useState("")
  const [err,setErr]=useState("")
  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: selected
  };
  
  
    useEffect(()=>{
    //  getUsers(search2);
    //  find()
    },[search2])
    const getUsers=async (r)=>{
     
        
  
        // setInterval(async ()=>{
          // setInterval(async ()=>{ 
            if(r.trim()!=""){
              
            }
            
            console.log(typeof r)
          // if(r!="" || r!=null || typeof r!='undefined'){
  // console.log(r.toString())
  const q = query(collection(db, "users"), where("idno", "==",r.replace(/(\r\n|\n|\r)/gm, "")), where("approval", "==",'approved'));
   
      const data2 =await  getDocs(q);
      var result=data2.docs.map((doc)=>({...doc.data(),id:doc.id}));
      // console.log(data)
      console.log(result)
      // var result = obju.filter(obj => {
      //   return obj.idno === search
      // })
      // result= result.pop()
      console.log(result)
      setList(result)
      // if(result[0]!=null || typeof result[0]!="undefined" ){
      //   // if(result?.length()!=0){
      //       setUsers(result[0])
      //    setErr("")
      //   // }
       
      // }else{
      //   setUsers({})
       
      //   setErr("No User with ID:"+r)
      // }
    clearInterval();
// }
          // },3000)s


        // },500)



    
     
           // console.log(JSON.stringify({"data":data._userDataWriter}))
    }
 
    const find=(r)=>{
        // console.log(r);
  getUsers(r)
    }
  return (
    <>
       {/* <h3>Search Motorist by QRCODE</h3> */}
       
       {selected=='environment' && <QrReader key='environmentQR'
      delay={300}
      facingMode={'environment'}
      constraints={{ facingMode: selected }}
        onResult={(result, error) => {
          // console.log(result?.text)
          if (!!result) {
        
      if(typeof result!="undefined" && typeof result.text!="undefined" && result.text!=null){

        
             setData(result?.text);
            setSearch(result?.text)
            console.log(result?.text)
             find(result?.text)
         console.log('run')
      }
     
// console.log(result?.text)
//     }
        
          }
          // setTimeout((  )=>{find(result?.text)},1000)
          if (!!error) {
            // console.info(error);
          }
        }}
        style={{ width: "200px", heigth: "100px" }}
      />}

{selected=='user' && <QrReader key='userQR'
      delay={300}
      facingMode={'user'}
      constraints={{ facingMode: selected }}
        onResult={(result, error) => {
          // console.log(result?.text)
          if (!!result) {
        
      if(typeof result!="undefined" && typeof result.text!="undefined" && result.text!=null){

         find(result?.text)
             setData(result?.text);
            setSearch(result?.text)
         console.log('run')
      }
     
// console.log(result?.text)
//     }
        
          }
          // setTimeout((  )=>{find(result?.text)},1000)
          if (!!error) {
            // console.info(error);
          }
        }}
        style={{ width: "200px", heigth: "100px" }}
      />}
      <p style={{background:'white'}}>Place your camera to scan QRCODE</p>
   {search2=="" && <Webcam
    audio={false}
    height={300}
    screenshotFormat="image/jpeg"
    width={200}
    // facingMode={selected}
    style={{margin:0}}
    videoConstraints={videoConstraints}
  >
       {({ getScreenshot }) => (
      <button style={{display:'none'}}
        onClick={() => {
          const imageSrc = getScreenshot()
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>}
  {search2!="" && <button 
        onClick={() => {
          setSearch("")
        }}
      >
       Rescan
      </button>}
      {search2=="" &&       <select onChange={(e) => 
        
        {setSelected(e.target.value)
        console.log(e.target.value)
        }}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select>}
      <div className="card2" style={{marginTop:20}}>
     <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search2} placeholder="Enter ID Number" />
     <button className="sub" onClick={()=>{find(search2)
    console.log(search2)
    }}>Submit</button>
     <br/> <br/>
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
     
    <div className="card">
     <h3> User information</h3>
     {err}
     {/* {list.map((user,i)=>{
// console.log(user.idno);
console.log(
 "SDsds"
 + search2+"SDSDSd"+user['idno']
  );
  console.log(user['idno'].replace(/(\r\n|\n|\r)/gm, "")==search2.replace(/(\r\n|\n|\r)/gm, ""))
if(user['idno'].replace(/(\r\n|\n|\r)/gm, "")==search2.replace(/(\r\n|\n|\r)/gm, "")){
  return <div>{Object.keys(user).map((u,i)=>
    <div key={i} style={{margin:2,display:"flex"}}><div style={{minWidth:80}}><strong >{Object.keys(user)[i]}:{' '}</strong></div><div>{Object.values(user)[i]}</div></div>
  )}</div>
}
    
     })} */}
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
       </div>
    </>
  );
};

export default Scan;