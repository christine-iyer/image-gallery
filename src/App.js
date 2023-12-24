import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Lolo from './components/Lolo/Lolo'
import Franky from './components/Franky/Franky';
import Saylor from './components/Saylor/Saylor';
import Vibe from './components/Vibe/Vibe';
import Bar from './components/Bar/Bar';
function App() {
  return (
    <div className="App">
      <div className="App-header">
<>
        <BrowserRouter>
          <Bar />
          <Routes>
            <Route path="/" element={<Franky />}/>
            <Route path="/lolos" element={<Lolo />} />
            <Route path="/saylors" element={<Saylor />} />
            <Route path="/vibes" element={<Vibe />} />
              </Routes> 
        </BrowserRouter>
        </>
        </div>
        </div>
  );
}

export default App;
