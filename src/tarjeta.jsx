import { useState } from "react";

export default function Tarjeta({ titulo, urlIMG, paisCorrecto }) {
  const [respuesta, setRespuesta] = useState("");
  const [resultado, setResultado] = useState(null); 

  function comprobar() {
    
    const normalizar = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const acierto = normalizar(respuesta) === normalizar(paisCorrecto);
    setResultado(acierto);
  }

  return (
    <div className="card">
      <h1>{titulo}</h1>

      {urlIMG ? (
        <img src={urlIMG} alt="Ubicación aleatoria" />
      ) : (
        <p>Cargando imagen...</p>
      )}

      <input
        type="text"
        placeholder="Escribe el país"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />
      <button onClick={comprobar}>Comprobar</button>

      {resultado !== null && (
        <p style={{ color: resultado ? "limegreen" : "crimson" }}>
          {resultado ? " ¡Correcto!" : ` Era ${paisCorrecto}`}
        </p>
      )}
    </div>
  );
}
