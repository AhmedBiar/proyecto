import { Link } from "react-router-dom";

export default function Aside({ isOpen, isLogged, handleLogout }) {
    console.log("Aside render", isOpen, isLogged);
  return (
    <aside className={`aside ${isOpen ? "aside-open" : "aside-closed"}`}>
      <h2>Menú lateral</h2>
      <ul>
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/juego">Juego</Link></li>
        {isLogged ? (
          <li className="flex items-center">
            <button 
              onClick={handleLogout} 
              className="aside-logOff text-red-600 hover:underline"
            >
              Log Off
            </button>
          </li>
        ) : (
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}




