
import { useEffect, useState } from "react";

export default function Screen({ imgURL, paisCorrecto }) {
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(null);
  const [stats, setStats] = useState({ aciertos: 0, fallos: 0 });
  const[pulsada, setPulsada]= useState(false);
  /* const[pulsadaSiguiente, setPulsadaS]=useState(false) ; */

  useEffect(() => {
  async function cargarStats() {
    const res = await fetch("http://localhost:3000/estadisticas/1");
    const data = await res.json();
    setStats(data);
  }
  cargarStats();
}, []);

  useEffect(() => {
    setLoading(true);
    setImgLoaded(imgURL);
  }, [imgURL]);
   async function actualizarStats(tipo) {
    const nuevosDatos =
      tipo === "acierto"
        ? { aciertos: stats.aciertos + 1, fallos: stats.fallos }
        : { aciertos: stats.aciertos,fallos: stats.fallos + 1 };

    const res = await fetch("http://localhost:3000/estadisticas/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevosDatos),
    });

    if (res.ok) {
      const data = await res.json();
      setStats(data);
    } else {
      console.error("Error actualizando estadísticas");
    }
  }
  async function resetearDatos(){
    const datos= { aciertos:0, fallos: 0 };
     const res = await fetch("http://localhost:3000/estadisticas/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
     if (res.ok) {
      const data = await res.json();
      setStats(data);
    } else {
      console.error("Error actualizando estadísticas");
    }
  }
  async function generarPaisRandom(paisCorrecto, yaElegidos = []) {
    const res = await fetch("http://localhost:3000/ubicaciones");
    const datos = await res.json();
    if (!res.ok) console.log(`Error al obtener datos: ${res.status}`);

    let pais;
    do {
      let index = Math.floor(Math.random() * datos.length);
      pais = datos[index];
    } while (pais.pais === paisCorrecto || yaElegidos.includes(pais.pais));

    return pais.pais;
  }

 function esCorrecta(e) {
  const target = e.target;
  setPulsada(true);
  const correcta = target.textContent === paisCorrecto;
  const botones = document.querySelectorAll(".op");

  botones.forEach(btn => {
    if (btn.textContent === paisCorrecto) {
      btn.className = "op-correcta";
    } else if (btn === target) {
      btn.className = correcta ? "op-correcta" : "op-fallo";
    } else {
      btn.className = "op-bloqueada";
    }
    btn.disabled = true; 
  });
  actualizarStats(correcta ? "acierto" : "fallo");
}


  async function setCorrecta(paisCorrecto) {
    const aviso= document.getElementById("aviso");
    aviso.className= "conTiempo";
    setPulsada(false);
    const opc = [
      document.getElementById("1"),
      document.getElementById("2"),
      document.getElementById("3"),
      document.getElementById("4"),
    ];
    const opciones = [paisCorrecto];

    while (opciones.length < 4) {
      const p = await generarPaisRandom(paisCorrecto, opciones);
      opciones.push(p);
    }

    opciones.sort(() => Math.random() - 0.5);

    for (let i = 0; i < opc.length; i++) {
      opc[i].textContent = opciones[i];
      opc[i].className = "op"; 
    }
  }

  function pasarPagina(){
    // setPulsadaS(true);
    window.location.reload();
  }
  const [tiempo, setTiempo] = useState(10);
  useEffect(() => {
    if (tiempo <= 0) {
      tiempoAgotado(); 
      return;
    }
    if(loading) return;
    if(pulsada) return;
    // if(pulsadaSiguiente) return window.location.reload();
    const intervalo = setInterval(() => {
      setTiempo((t) => t - 1);
    }, 1000);
      return () => clearInterval(intervalo);
  }, [tiempo,loading,pulsada,/* pulsadaSiguiente */]);

  function tiempoAgotado(){
    const botones = document.querySelectorAll(".op");
    const aviso= document.getElementById("aviso");
    aviso.className= "sinTiempo";

    botones.forEach(btn => {
      if (btn.textContent === paisCorrecto) {
        btn.className = "op-correcta";
      } else {
        btn.className = "op-fallo";
      }
      btn.disabled = true;
  });
      actualizarStats("fallo");

  }
  async function reindexarUbicaciones() {
    // console.log("Entro en la reindexación");
    const res = await fetch("http://localhost:3000/ubicaciones");
    if(!res.ok) return console.log("Error: al obtener los datos, en la reindexación");
    const datos = await res.json();
    
    for (let i = 0; i < datos.length; i++) {
      await fetch(`http://localhost:3000/ubicaciones/${datos[i].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: String(i + 1) }),
      });
    }
}
  async function reportarImagen(){
    /* const res = await fetch("http://localhost:3000/ubicaciones");
    if(!res.ok) return console.log("Error: al obtener los datos");
    const datos = await res.json();
    let idImg= datos.find(d=> d.url === imgURL);
    if(!idImg) return console.log("Imagen no encontrada");
    const url= `http://localhost:3000/ubicaciones/${idImg.id}`;
    const eliminarImg= await fetch(url,{ method: 'DELETE' });
    if(eliminarImg.ok){
      console.log("IMG eliminada exitosamente");
      await reindexarUbicaciones();
    }else{
      console.log("Error al intentar eliminar img");
    } */
    
  }
  
  async function resetDB() {
    
    const resReserva = await fetch("/dbReserva.json");
    if (!resReserva.ok) return console.error("Error cargando reserva");

    const reserva = await resReserva.json();  

    const resIMG = await fetch("http://localhost:3000/ubicaciones");
    if (!resIMG.ok) return console.log(`error: ${resIMG.status}`);

    const dataIMG = await resIMG.json();

    for (let i = 0; i < dataIMG.length; i++) {
      const url = `http://localhost:3000/ubicaciones/${dataIMG[i].id}`;
      const eliminarImg = await fetch(url, { method: "DELETE" });

      if (!eliminarImg.ok)
        console.log("Error al eliminar imagen " + eliminarImg.status);
    }

    for (let i = 0; i < reserva.ubicaciones.length; i++) {
      await fetch("http://localhost:3000/ubicaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva.ubicaciones[i]),
      });
    }

    
    await resetearDatos();
    await reindexarUbicaciones();

    console.log("Base de datos reseteada correctamente");
  }
  
  useEffect(() => {
    if (paisCorrecto) setCorrecta(paisCorrecto);
  }, [paisCorrecto]);

  return (
  <div className="screen-content">
    <div className="juego-columna">
      {loading && (
        <img src="/Loading_icon.gif" className="img-screen" alt="Cargando..." />
      )}
      {imgLoaded && (
        <img
          src={imgLoaded}
          alt="Ubicación"
          id="imgScreen"
          className={`img-screen ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
        />
      )}

      <div className="op-div">
        <button className="op" id="1" onClick={esCorrecta}>Cargando...</button>
        <button className="op" id="2" onClick={esCorrecta}>Cargando...</button>
        <button className="op" id="3" onClick={esCorrecta}>Cargando...</button>
        <button className="op" id="4" onClick={esCorrecta}>Cargando...</button>
      </div>
    </div>
    <div className="div-reloj">
        <h1 className="titulo-reloj">Tiempo Restante</h1>
        <p className="reloj">{tiempo}</p>
        <p className="conTiempo" id="aviso">TIEMPO AGOTADO</p>
    </div>
    
    <div className="sidePanel">
      <p className="aciertos" id="ac">Aciertos: {stats.aciertos}</p>
      <p className="fallos" id="fallo">Fallos: {stats.fallos}</p>
      <button className="siguiente" onClick={pasarPagina}>Siguiente</button>
      <button className="resetButton" onClick={resetearDatos}>Resetear datos</button>
      <button className="reportButton" onClick={reportarImagen}>Reportar Imagen </button>
      <button className="resetDB" onClick={resetDB}>Resetear DB </button>
    </div>
  </div>
);

}


