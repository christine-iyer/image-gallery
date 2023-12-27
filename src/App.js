import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Lolo from './components/Lolo/Lolo'
import Time from './components/Time/Time';
import Saylor from './components/Saylor/Saylor';
import Vibe from './components/Vibe/Vibe';
import Bar from './components/Bar/Bar';
import Images from './components/Images/Images';
function App() {
  return (
    <div className="App">
      <div className="App-header">
<>
        <BrowserRouter>
          <Bar />
          <Routes>
            <Route path='/' element={<Images />}/>
            <Route path="/times" element={<Time />}/>
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
