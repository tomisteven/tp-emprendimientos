import React from "react";
import "./Mapa.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapa from "../../assets/mapa.png";
import { Icon } from "semantic-ui-react";

export default function Mapa({ emprendimientos }) {
  const [active, setActive] = React.useState(null);

  const queryString = window.location.search;

  // Crear un nuevo objeto URLSearchParams con la query string
  const urlParams = new URLSearchParams(queryString);

  // Obtener el valor del parámetro 'x'
  const id = urlParams.get("id")

  // Hacer algo con los valores obtenidos

  React.useEffect(() => {
    if (id) {
      const emprendimiento = emprendimientos.find((e) => e.id === parseInt(id));
      console.log(emprendimiento);
      setActive(emprendimiento);
    }
    //getEmprendimientos();
  }, [id, emprendimientos]);

  return (
    <div className="container-mapa">
      <div class="cont-info-emprendimientos">
        {emprendimientos.map((emprendimiento) => (
          <div className="emprendimientos" key={emprendimiento.id}>
            <img src={emprendimiento.imagen} alt={emprendimiento.nombre} />
            <p className="btn-ver-mapa"
              onClick={() => {
                setActive(emprendimiento);
              }}
            >
              <Icon name="map marker alternate" color="red" /> Ver en el mapa
            </p>
            <h2>
              <Icon name="home" color="brown" /> {emprendimiento.nombreTienda}
            </h2>

            <p>
              <Icon name="clock" color="black" />
              4.5 <Icon name="star" color="yellow" />
              <Icon name="star" color="yellow" />
              <Icon name="star" color="yellow" />
              <Icon name="star" color="yellow" />
              <Icon name="star" color="yellow" />
              {"(900)"}
            </p>
            <p className="desc">
              <Icon name="info" color="red" />
              {emprendimiento.descripcion}
            </p>
            <p className="cat">
              <Icon name="tags" color="purple" />
              {emprendimiento.categorias.map((c) => {
                return c + " , ";
              })}
            </p>
            <p>
              <Icon name="street view" color="orange" />
              <span>Direccion:</span> {emprendimiento.direccion}
            </p>
            <p>
              <Icon name="pin" color="green" />
              <span>Localidad:</span> {emprendimiento.localidad}
            </p>
            <p>
              <Icon name="phone" color="blue" />
              <span>Telefono:</span> {emprendimiento.telefono}
            </p>
            <p>
              <Icon name="clock" color="black" />
              <span>Horarios:</span> {emprendimiento.horarios}
            </p>
            <p>
              <Icon name="map marker alternate" color="red" />
              <span>Provincia:</span> {emprendimiento.provincia}
            </p>

          </div>
        ))}
      </div>
      {
        <MapContainer
          center={
            active
              ? [active.x , active.y]
              : [-34.4938511979592, -58.6364124734694]
          }
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {emprendimientos.map((emprendimiento) => (
            <Marker
              icon={
                new L.Icon({
                  iconUrl: mapa,
                  iconSize: [40, 40],
                })
              }
              key={emprendimiento.id}
              position={[emprendimiento.y, emprendimiento.x]}
              onClick={() => {
                setActive(emprendimiento);
              }}
            />
          ))}
          {active ? (
            <Popup
              position={[active.y, active.x]}
              onClose={() => {
                setActive(null);
              }}
            >
              <div>
                <img className="img-popup" src={active.imagen} alt="mapa" />
                <h2>{active.nombreTienda}</h2>
                <p>{active.descripcion}</p>
                <p>{active.horarios}</p>
                <p>{active.telefono}</p>
                <p>{active.direccion}</p>
                <p>{active.localidad}</p>
              </div>
            </Popup>
          ) : null}
        </MapContainer>
      }
    </div>
  );
}

/* {
        "id" : 1,
      "nombreTienda": "La Tienda Feliz",
      "ubicacion": "Calle Sol, 123",
      x: -34.4938511979592,
        y: -58.6364124734694,
      "descripcion": "Tu lugar para encontrar la felicidad en cada compra.",
      "categorias": ["Hogar", "Electrónica", "Moda"],
      "horarios": "Lunes a Viernes: 9:00 - 18:00",
      "telefono": "123-456-789",
      "visibilidad": true,
      "direccion": "Calle Sol, 123",
      "localidad": "Ciudad Feliz",
      "provincia": "Felicidad"
    } */
