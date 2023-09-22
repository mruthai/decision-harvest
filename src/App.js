
import './App.css';
import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import Profile from './views/Profile'
import CornHistory from './views/CornHistory'
import { AuthContext } from './contexts/AuthProvider'
import MyCornData from './views/MyCornData';

function App() {
  const { login, user, logout } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="">
          <ul className="navBar">
            <img src="./images/farms.png" alt="" />
            {
              (user.loggedIn) ?
                <>
                  <div className="navLinkContainer">
                    <li><Link className="nav-link" to="/">Decision Harvest</Link> </li>
                    <li><Link className="nav-link" to="/profile">Profile</Link> </li>
                    <li><Link className="nav-link" to="/mycorndata">Corn Data</Link> </li>
                    <li><Link className="nav-link" to="/cornhistory">Corn History</Link> </li>
                  </div>
                  <li><button className="auth-btn" onClick={logout}> Logout</button></li>
                </> :

                <li><button className="auth-btn" onClick={login}> Login</button></li>
            }
            <li >{user.displayName}</li>
          </ul>
        </nav>

      </div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mycorndata" element={<MyCornData />} />
        <Route path="/cornhistory" element={<CornHistory />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
