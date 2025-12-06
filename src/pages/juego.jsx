
import { useState,  useEffect } from "react";
import Body from '../body.jsx';
import Nav from '../nav.jsx';
import Aside from '../aside.jsx';
import Screen from '../screen.jsx';

export default function Juego({ isLogged, handleLogout }) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const toggleAside = () => setIsAsideOpen(prev => !prev);
  const [imgURL, setImgURL] = useState(null);
  const[pais, setPais]= useState(null);

  async function getRandomIMG(){
    let urlIMG="http://localhost:3000/ubicaciones";
    let res= await fetch(urlIMG);
    let datos = await res.json();
    if (!res.ok) console.log(`Error al obtener datos: ${res.status}`);

    let randomNum= Math.floor(Math.random() * datos.length);
    let img= datos[randomNum];
    return img.url;
  }
  async function getPais(url){
    let urlIMG="http://localhost:3000/ubicaciones";
    let res= await fetch(urlIMG);
    let datos = await res.json();
    if (!res.ok) console.log(`Error al obtener datos: ${res.status}`);
    let p= datos.find(d=> d.url == url);
    let pais= p.pais;
    return pais;
  }
  useEffect(() => {
    async function cargarDatos() {
      const url = await getRandomIMG();  
      setImgURL(url);

      const p = await getPais(url);     
      setPais(p);
    }

    cargarDatos();
  }, []);

 
  return (
    <Body>
      <Nav toggleAside={toggleAside} />
      <Aside isOpen={isAsideOpen} isLogged={isLogged} handleLogout={handleLogout} />
      <Screen imgURL={imgURL} paisCorrecto={pais} />
    </Body>
  );
}