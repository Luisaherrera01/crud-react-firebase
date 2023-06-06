import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { dataBase } from "../config/dataBase.jsx";
import { Link } from "react-router-dom";

const ListarServicios = () => {
  const [servicios, setServicios] = useState([]);

  const mostrarServicios = async () => {
    const serviciosCollection = collection(dataBase, "servicios");
    const data = await getDocs(serviciosCollection);
    console.log(data.docs);
    setServicios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const eliminarServicio = async (id) => {
    const servicioEliminado = doc(dataBase, 'servicios', id)
    await deleteDoc(servicioEliminado)
    mostrarServicios()
  }
  useEffect(() => {
    mostrarServicios();
  }, []);
  console.log(servicios);
  return (
    <section>
      {servicios.map((servicio) => (
        <section key={servicio.id}>   
          <h1>{servicio.nombre}</h1>
          <h1>{servicio.valor}</h1>
          <h1>{servicio.descripcion}</h1>
          <a href={servicio.ulrDoc}>Descargar</a>
          <img src={servicio.ulrImg} alt="" />
          <button onClick={(()=>{eliminarServicio(servicio.id)})}>Eliminar</button>
          <button><Link to={'/editar/'+servicio.id}>Editar</Link></button>
          
        </section>
      ))}
    </section>
  );
};

export default ListarServicios;
