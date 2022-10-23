import React,{useEffect,useState} from 'react'
import {storage,db} from './firebase-config'
import { collection,getDocs,addDoc } from '@firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { useForm } from 'react-hook-form'
const Register=()=>{

// const userCollection=collection(db,"users")


const [fullname,setFullname]=useState("")
const [email,setEmail]=useState("")
const [phone,setPhone]=useState("")
const [idno,setIdno]=useState("")
const [bike,setBike]=useState("")
const [sacco,setSacco]=useState("")
const [location,setLocation]=useState("")
const [stage,setStage]=useState("")
const [drivinglc,setDrivinglc]=useState("")
const [mpesa,setMpesa]=useState("")

const [imageUpload, setImageUpload] = useState(null);
const [imageUpload_1, setImageUpload_1] = useState(null);
const [loading,setLoading]=useState(false)


const [imageUrls, setImageUrls] = useState([]);
const [imageUrls_1, setImageUrls_1] = useState([]);

const [image,setImage]=useState("")
const [image_1,setImage_1]=useState("")
const [success,setSuccess]=useState(false);
const { handleSubmit, formState } = useForm()
const { isSubmitting } = formState
const imagesListRef = ref(storage, "images/");
  useEffect(()=>{
  //  getUsers();
  },[])



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onImageChange_1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage_1(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  
    function submitForm(data) {
      
  // e.preventDefault()
  setLoading(true);
  const p1 = new Promise((resolve, reject) => {
     if (imageUpload == null) return;
      const imageRef = ref(storage, `passport/${ v4()+'_'+imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          resolve(url)
          console.log(url)
        });
      });
  });
     
  const p2 = new Promise((resolve, reject) => {
    if (imageUpload == null) return;
    const imageRef2 = ref(storage, `idcard/${ v4()+'_'+imageUpload_1.name}`);
    uploadBytes(imageRef2, imageUpload_1).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls_1((prev) => [...prev, url]);
resolve(url)
        console.log(url)
    
      });
    });
 });
 
 Promise.all([p1, p2]).then(async (values)  => {
 try {
        // console.log(imageUrls_1)
        await addDoc(collection(db, 'users'), {
          fullname: fullname,
          email: email,
          phone: phone,
          sacco:sacco,
          bike:bike,
          location:location,
          stage:stage,
          idno:idno,
          drivinglc:drivinglc,
          mpesa_msg:mpesa,
          passport_image:values[0],
          idcard_image:values[1],
          approval:'pending',
          date:new Date().toLocaleString()
        })
      setSuccess(true)
        // onClose()
      } catch (err) {
        console.log(err)
      }
});

    }
    

     return <div className="card2" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <h3>Register Motorist</h3>
      <form  onSubmit={handleSubmit(submitForm)}  style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',width:'100%'}}>
      <div style={{width:'100%'}}> <div>Full Name</div></div>
     <input  required className='input' type='text' name='fullname'  value={fullname}  onChange={(e)=>{setFullname(e.target.value)}} placeholder='Fullname' />

     <div style={{width:'100%'}}> <div>Email</div></div>
     <input required  className='input' type='text' name='email'  value={email}   onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />

     <div style={{width:'100%'}}> <div>Phone Number</div></div>
<input  required className='input' type='text' name='phone' value={phone}  onChange={(e)=>{setPhone(e.target.value)}} placeholder='Phone Number' />

<div style={{width:'100%'}}> <div>ID number</div></div>
<input  required className='input' type='text' name='idnumber' value={idno}  onChange={(e)=>{setIdno(e.target.value)}} placeholder='Idetification Number' />
<div style={{width:'100%'}}> <div>Bike no.</div></div>
<input  required className='input' type='text' name='bike' value={bike} onChange={(e)=>{setBike(e.target.value)}} placeholder='Bike No.' />

<div style={{width:'100%'}}> <div>Sacco</div></div>
<input  required className='input' type='text' name='sacco' value={sacco} onChange={(e)=>{setSacco(e.target.value)}} placeholder='Sacco' />

<div style={{width:'100%'}}> <div>Location</div></div>
<input required  className='input' type='text' name='location' value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder='location' />

<div style={{width:'100%'}}> <div>Stage</div></div>
<input required  className='input' type='text' name='stage' value={stage} onChange={(e)=>{setStage(e.target.value)}} placeholder='stage' />

<div style={{width:'100%'}}> <div>Driving licence no. (Optional)</div></div>
<input   className='input' type='text' name='dl' value={drivinglc}  onChange={(e)=>{setDrivinglc(e.target.value)}} placeholder='Driving licence' />

<div style={{width:'100%'}}> <div>MPESA Transaction code/message</div>

</div>

<input required  className='input' type='text' name='mpesa' value={mpesa} onChange={(e)=>{setMpesa(e.target.value)}} placeholder='Mpesa Code' />
<div>Till Number:5796553 Amount:Ksh 750</div>
<br/><div style={{width:'100%'}}><small>PASSPORT PHOTO</small></div>
<input   required   onChange={(event) => {
          setImageUpload(event.target.files[0]);
          onImageChange(event)
        }}   className='input' type='file' name='photo' placeholder='passport' />
<img id="target"  accept="/image/*" src={image} style={{width:100}}/>
<br/><div style={{width:'100%'}}><small>ID CARD (Front and Back)</small></div>
<input  required  onChange={(event) => {
          setImageUpload_1(event.target.files[0]);
          onImageChange_1(event)
        }} className='input' type='file' name='idcard' placeholder='idcard' />
<img id="target"  accept="/image/*" src={image_1} style={{width:200}}/>
<br/>

<input   className='input sub' type='submit' value='submit' name='submit'  />

</form>
     {/* <i style={{color:'green'}}>User registered !!!</i> */}
    {loading && !success  && <div style={{width:'100vw',height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:'100vw',background:'rgba(0,0,0,0.6)',zIndex:-2,height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     
     </div>

<div style={{background:'white',borderRadius:10,width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}><h3>Loading...</h3>

</div>
      
     </div>}
  {success &&    <div style={{width:'100vw',height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{width:'100vw',background:'rgba(0,0,0,0.6)',zIndex:-2,height:'100vh',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
     
     </div>

<div style={{background:'white',borderRadius:10,width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>Registration Successful
<button className='sub' style={{width:50}} onClick={()=>{
    window.location.reload();
}}>OK</button>
</div>
      
     </div>} 


  
       </div>
    }
    export default Register