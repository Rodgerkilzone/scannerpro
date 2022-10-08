import { QrReader } from 'react-qr-reader';
import React,{useEffect,useState} from 'react'
import {db} from './firebase-config'
import { collection,getDocs } from '@firebase/firestore'
const Scan = () => {
  const [data, setData] = useState('No result');

  const userCollection2=collection(db,"users")
  const [user,setUsers]=useState({})
  const [list,setList]=useState([])
  const [search,setSearch]=useState("")
  const [err,setErr]=useState("")
  
  
    useEffect(()=>{
    //  getUsers();
    //  find()
    },[data])
    const getUsers=async (r)=>{
  console.log(r)
  
      const data =await  getDocs(userCollection2);
      var obju=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
    console.log(obju+"e");
      var result = obju.filter(obj => {
        //
        return obj.idno === r
      })
      console.log(result+"fgdhrdhtr"
        )
      if(result[0]!=null || typeof result[0]!="undefined"){
         setUsers(result[0])
         setErr("")
        }else{
          setUsers({})
          setErr("No User with ID:"+r)
        }
           // console.log(JSON.stringify({"data":data._userDataWriter}))
    }
    const find=(r)=>{
        console.log(r);
  getUsers(r)
    }
  return (
    <>
       <h3>Search Motorist by QRCODE</h3>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            setSearch(result?.text)
            find(result?.text)
          }

          if (!!error) {
            // console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>Place your camera to scan</p>

      <div className="card2">
     <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder="Enter ID Number" />
     <button className="sub" onClick={()=>{find(search)}}>Submit</button>
     <br/> <br/>
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
     
    <div className="card">
     <h3> User information</h3>
     {err}
     {Object.keys(user).map((u,i)=>
       <div key={i} style={{margin:2,display:"flex"}}><div style={{minWidth:80}}><strong >{Object.keys(user)[i]}:{' '}</strong></div><div>{Object.values(user)[i]}</div></div>
     )}</div>
       </div>
    </>
  );
};

export default Scan;