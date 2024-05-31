import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ListaEmprendimientos from "./pages/ListaEmprendientos/ListaEmprendimientos";
import Header from "./components/Header/Header";
import Mapa from "./pages/Mapa/Mapa";
import Form from "./pages/form/Form";
import Login from "./pages/login/Login";
import Donacion from "./pages/donacion/Donacion";

function App() {
  const [emprendimientos, setEmprendimientos] = React.useState([]);
  const [filteredEmprendimientos, setFilteredEmprendimientos] =
    React.useState("");
  const role = localStorage.getItem("role") ? localStorage.getItem("role") : "Espectador"

  const filterEmprendimientos = (e) => {
    setFilteredEmprendimientos(e.target.value);
  };

  const emprendimientosFiltrados = emprendimientos.filter((emprendimiento) => {
    const busqueda = filteredEmprendimientos.toLowerCase();
    return emprendimiento.nombreTienda.toLowerCase().includes(busqueda);
  });

  const getEmprendimientos = async () => {
    try {
      const response = await fetch("http://localhost:3001/");
      const data = await response.json();
      setEmprendimientos(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getEmprendimientos();
  }, []);

  return (
    <div className="App">
      <Header
        role={role}
        filterEmprendimientos={filterEmprendimientos}
        getEmprendimientos={getEmprendimientos}
      />

      <Routes>
        <Route
          path="/"
          element={<Home emprendimientos={emprendimientosFiltrados} />}
        />
        <Route path="/emprendimientos" element={<ListaEmprendimientos />} />
        <Route
          path="/mapa"
          element={<Mapa emprendimientos={emprendimientos} />}
        />
        <Route path="/donacion" element={<Donacion />} />
        <Route path="/form" element={<Form emprendimientos={emprendimientos} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
