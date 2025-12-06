import './index.css';

export default function Nav({ toggleAside }) {
  return (
    <nav className="nav">
      <div className="text-white text-xl font-bold">GeoGuesser</div>
      {/* IMG */}
      <button onClick={toggleAside} className="nav-button">
        ☰ Menú
      </button>
    </nav>
  );
}

