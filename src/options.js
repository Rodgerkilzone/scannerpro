import "./styles.css";

 const Options=()=> {
  return (
    <div className="c">
<div className="buttons card2" >
 <h3>Choose Verification Method</h3>
 
   <a href="/scan"><button className="btn" style={{marginLeft:0,padding:0}}>Verify by QRCODE</button></a>
   <a href="id"> <button className="btn" style={{marginLeft:0,padding:0}}>Verify by ID</button></a>

 </div>
    </div>
  );
}
export default Options;