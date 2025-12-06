import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from './pages/inicio.jsx';
import Juego from './pages/juego.jsx';
import Login from './pages/login.jsx';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Login handleLogin={handleLogin} /> } 
        />
        <Route 
          path="/login" 
          element={<Login handleLogin={handleLogin} />} 
        />
        <Route 
          path="/juego" 
          element={<Juego isLogged={isLogged} handleLogout={handleLogout} />} 
        />
        <Route 
          path="/inicio" 
          element={<Inicio isLogged={isLogged} handleLogout={handleLogout} />} 
        />
      </Routes>
    </Router>
  );
}






