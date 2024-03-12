import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Assuming you have some CSS file for styling
import Navbar from './Navbar/Navbar';
import Join from './Pages/JoinUs/Join'; 
import Home from './Pages/HomePage/Home';

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <div>
        <Navbar /> {/* Render the Navbar component */}
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={ // Adjusted the Route component
              <div>
                <h1>Welcome to SkillNet</h1>
                {backendData.length === 0 ? (
                  <p>Start building SkillNet</p>
                ) : (
                  backendData.map((user, i) => (
                    <p key={i}>{user}</p>
                  ))
                )}
              </div>
            } />
            <Route path="/join" element={<Join />} /> 
            <Route path="/home" element={<Home />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;