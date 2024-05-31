import React from "react";
import "./home.css";
import { Icon } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

export default function Home({ emprendimientos }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nuevoEmprendimiento = queryParams.get("create");

  if (nuevoEmprendimiento) {
    emprendimientos.push(
      JSON.parse(localStorage.getItem("formNewEmprendimiento"))
    );

    emprendimientos.forEach((element) => {
      if (
        element.nombreTienda ===
        JSON.parse(localStorage.getItem("formNewEmprendimiento")).nombreTienda
      ) {
        emprendimientos.filter((emprendimiento) => {
          return emprendimiento !== element;
        });
      }
    });
  }

  const generarLinkMapa = (emprendimiento) => {
    const url = new URL("http://localhost:3000/mapa");
    url.searchParams.set("id", emprendimiento.id);

    window.location.href = url;
  };

  return (
    <div className="conainer-emprendimientos">
      {emprendimientos.map((emprendimiento) => (
        <>
          <div class="nft">
            <div class="main">
              <img
                class="tokenImage"
                src={
                  emprendimiento.imagen
                    ? emprendimiento.imagen
                    : "https://www.clarin.com/img/2020/08/17/6BOqG1XGY_720x0__1.jpg"
                }
                alt="NFT"
              />
              <h2>
                {emprendimiento.nombreTienda} <Icon name="home" color="brown" />
              </h2>
              <p class="description">{emprendimiento.descripcion}</p>
              <div class="tokenInfo">
                <div class="price">{emprendimiento.direccion}</div>
                <div class="duration">
                  <ins>◷</ins>
                  <p>{emprendimiento.horarios}</p>
                </div>
                <div class="ver-mapa">
                  <p
                    onClick={() => {
                      generarLinkMapa(emprendimiento);
                    }}
                  >
                    Ver Mapa
                  </p>
                </div>
              </div>
              <hr />
              <div class="creator">
                <div class="wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                    alt="Creator"
                  />
                </div>
                <p>+ 54 {emprendimiento.telefono}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
