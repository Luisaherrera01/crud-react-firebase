import { collection, addDoc } from "firebase/firestore";
import { dataBase, subirImagen } from "../config/dataBase.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearServicio = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const returnListado = useNavigate();
  const agrearServicio = async () => {
    const ulrImg = await subirImagen(img)
    const ulrDoc = await subirImagen(file)
    console.log(ulrImg)
    const servicioCollection = collection(dataBase, "servicios");
    const servicio = {
      nombre,
      descripcion,
      valor,
      ulrImg,
      ulrDoc
    };
    await addDoc(servicioCollection, servicio);
    returnListado("/listar");
  };
  return (
    <section>
      <form>
        <input
          onChange={(e) => setNombre(e.target.value)}
          placeholder={"Nombre servicio"}
          type={"text"}
        />
        <input
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder={"Descripcion servicio"}
          type={"text"}
          max={'50'}
        />
        <input
          onChange={(e) => setValor(e.target.value)}
          placeholder={"Valor servicio"}
          type={"text"}
        />
        <input onChange={(e)=>setImg(e.target.files[0])} type="file" />
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" />
        <input
          onClick={agrearServicio}
          type={"button"}
          value={"Agrear servicio"}
        />
      </form>
    </section>
  );
};

export default CrearServicio;
