import Body from '../body.jsx';
import { useState } from "react";
import Nav from '../nav.jsx';
import Aside from '../aside.jsx';
export default function Login() {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const toggleAside = () => setIsAsideOpen(prev => !prev);
    const handleLogout = () => setIsLogged(false);
  return (
    <Body>
        <Nav toggleAside={toggleAside} />
        <Aside isOpen={isAsideOpen} isLogged={isLogged} handleLogout={handleLogout} />
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form className="login-form">
          <label className="login-label">
            Email:
            <input type="email" className="login-input" />
          </label>

          <label className="login-label">
            Contraseña:
            <input type="password" className="login-input" />
          </label>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
          <button type="submit" className="logOff-button">
            Cerrar sesión
          </button>
        </form>
      </div>
    </Body>
  );
}



