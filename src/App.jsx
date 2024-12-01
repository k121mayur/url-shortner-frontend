
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Hash from './components/Hash/Hash';


function App() {
  
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/:hash" element={<Hash />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
