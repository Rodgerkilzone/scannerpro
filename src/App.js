import "./styles.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Scan from './scanner'
import Options from './options'
import Id from './id';
import Register from './register';
import Pending from './pending';
import Approved from './approved';
import Declined from './declined'
import Allusers from './allusers'
import Admin from './admin'
export default function App() {
  const url="https://i.pinimg.com/originals/d5/74/97/d574978a47ffd961b434cb5cd75f3dd2.jpg"
  return (
    <div className="App">
 
 
 {/* <img src={url} style={{height:30,height:30}}/> */}
 <div className="header" style={{color:'black'}}>
   <div className="logo">M</div>
  <a href="/"  style={{color:'black'}}>  Motobike Verification </a>
   
   <div style={{flex:1}}></div>
   <div style={{alignSelf:'flex-end'}}> <a href='/register'>  <div style={{alignSelf:'flex-end',color:'black'}}>Register</div></a></div>

   
   </div>

 <div className="buttons">

   <Router>
<Routes>
<Route path="/"  element={<Options/>} />

<Route path="/scan" element={<Scan/>} />
<Route path="/id" element={<Id/>} />
<Route path="/register" element={<Register/>} />
<Route path="/pending3567" element={<Pending/>} />
<Route path="/approved3567" element={<Approved/>} />
<Route path="/declined3567" element={<Declined/>} />
<Route path="/users3567" element={<Allusers/>} />
<Route path="/admin3567" element={<Admin/>} />
  </Routes>
   </Router>
 </div>
    </div>
  );
}
