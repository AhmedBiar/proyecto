import { useState } from "react";
import Body from '../body.jsx';
import Nav from '../nav.jsx';
import Aside from '../aside.jsx';

export default function Inicio({ isLogged, handleLogout }) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const toggleAside = () => setIsAsideOpen(prev => !prev);
  return (
    <Body>
      <Nav toggleAside={toggleAside} />
      <Aside isOpen={isAsideOpen} isLogged={isLogged} handleLogout={handleLogout} />
      <div className="main-content">
        <h1>Inicio</h1>
        <p>Bienvenido a la página principal.</p>
      </div>
    </Body>
  );
}


