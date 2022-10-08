import "./styles.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Scan from './scanner'
import Options from './options'
import Id from './id';


export default function App() {
  const url="https://i.pinimg.com/originals/d5/74/97/d574978a47ffd961b434cb5cd75f3dd2.jpg"
  return (
    <div className="App">
 
 <a href="/"> 
 {/* <img src={url} style={{height:30,height:30}}/> */}
 <div className="header">
   <div className="logo">M</div>
   Motobike Verification</div>
 </a>
 <div className="buttons">

   <Router>
<Routes>
<Route path="/"  element={<Options/>} />

<Route path="/scan" element={<Scan/>} />
<Route path="/id" element={<Id/>} />

  </Routes>
   </Router>
 </div>
    </div>
  );
}
