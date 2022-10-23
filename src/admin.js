import "./styles.css";

 const Options=()=> {
  return (
    <div className="c">
<div className="buttons card2" >
 <h3>ADMIN SECTION</h3>
 
   <a href="/pending3567"><button className="btn" style={{marginLeft:0,padding:0}}>PENDING ACCOUNTS</button></a>
   <a href="/approved3567"> <button className="btn" style={{marginLeft:0,padding:0}}>APPROVED ACCOUNTS</button></a>
   <a href="/declined3567"> <button className="btn" style={{marginLeft:0,padding:0}}>DECLINED ACCOUNTS</button></a>
   <a href="/users3567"> <button className="btn" style={{marginLeft:0,padding:0}}>ALL ACCOUNTS</button></a>
 </div>
    </div>
  );
}
export default Options;