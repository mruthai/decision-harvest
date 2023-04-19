
import './App.css';
import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import Profile from './views/Profile'
import Commodities from './views/Commodities'
import Weather from './views/Weather'
import Soybeans from './views/Soybeans'
import { AuthContext } from './contexts/AuthProvider'

function App() {
  const { login, user, logout } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="nav-bar">
          <ul className="nav-left">
            <img src="./images/farms.png" alt="" />

            {/* <li><Link to="/weather">Weather</Link> </li> */}
            {
              (user.loggedIn) ?
                <>
                  <li><Link className="nav-link" to="/">Decision Harvest</Link> </li>
                  <li><Link className="nav-link" to="/profile">Profile</Link> </li>
                  <li><Link className="nav-link" to="/commodities">Corn History</Link> </li>
                  <li><Link className="nav-link" to="/soybeans">Soybean History</Link> </li>
                  <button className="auth-btn" onClick={logout}> Logout</button>
                </> :

                <li>{user.displayName}</li>
            }
          </ul>
          <ul>

            <button className="auth-btn" onClick={login}> Login</button>
          </ul>
        </nav>

      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commodities" element={<Commodities />} />
        <Route path="/soybeans" element={<Soybeans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/weather" element={<Weather />} />           {/* weather = :uid/:id */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
