import "./styles.css";

 const Options=()=> {
  return (
    <div className="c">
<div className="buttons card2" >
 <h3>ADMIN SECTION</h3>
 
   <a href="/pending"><button className="btn" style={{marginLeft:0,padding:0}}>PENDING ACCOUNTS</button></a>
   <a href="/approved"> <button className="btn" style={{marginLeft:0,padding:0}}>APPROVED ACCOUNTS</button></a>
   <a href="/declined"> <button className="btn" style={{marginLeft:0,padding:0}}>DECLINED ACCOUNTS</button></a>
   <a href="/users"> <button className="btn" style={{marginLeft:0,padding:0}}>ALL ACCOUNTS</button></a>
 </div>
    </div>
  );
}
export default Options;