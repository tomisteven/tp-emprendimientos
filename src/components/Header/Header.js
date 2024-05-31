import React, { useState } from "react";
import "./Header.css"; // Importa estilos CSS
import logo from "../../assets/tienda.png"; // Importa imagen

const Header = ({ filterEmprendimientos, role }) => {
  const [showSearch, setShowSearch] = useState(false); // Estado para mostrar/ocultar buscador

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Cambia el estado del buscador
  };

  const validarRol = () => {
    if (role === "admin") {
      return "Administrador";
    } else if (role === "Emprendedor") {
      return "Emprendedor";
    } else {
      return "Espectador";
    }
  };

  const requires = [
    {
      path: "/",
      roles: ["admin", "Emprendedor", "Espectador"],
    },
    {
      path: "/mapa",
      roles: ["admin", "Emprendedor", "Espectador"],
    },
    {
      path: "/form",
      roles: ["Emprendedor"],
    },
    {
      path: "/login",
      roles: ["Espectador"],
    },
    {
      path: "/donacion",
      roles: ["Emprendedor"],
    },
    {
      path: "/logout",
      roles: ["admin", "Emprendedor"],
      logout: () => {
        localStorage.removeItem("role");
        window.location.href = "/";
      },
    },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="header__search">
        <input
          disabled={
            window.location.pathname === "/mapa" ||
            window.location.pathname === "/form"
          }
          type="text"
          placeholder="Buscar emprendimiento..."
          className="header__search-input"
          onFocus={toggleSearch}
          onBlur={toggleSearch}
          onChange={filterEmprendimientos}
        />
        <i
          className={`fas fa-search header__search-icon ${
            showSearch ? "active" : ""
          }`}
          onClick={toggleSearch}
        ></i>
      </div>

      <Navigation requires={requires} role={role} />
      <h4 className="rol-h4">ROL: {validarRol()}</h4>
    </header>
  );
};

const pathNames = {
  "/mapa": "Mapa",
  "/form": "Nuevo Emprendimiento",
  "/login": "Login",
  "/": "Inicio",
  "/logout": "Cerrar Sesion",
  "/donacion": "Donacion",
};

const Navigation = ({ requires, role }) => {
  return (
    <nav>
      {requires.map((require) => {
        const isEnabled = require.roles.includes(role);
        return (
          <a
            key={require.path}
            href={isEnabled ? require.path : ""}
            className="header-links"
            aria-disabled={!isEnabled}
            hidden={!isEnabled}
            onClick={require.logout}
          >
            {pathNames[require.path]}
          </a>
        );
      })}
    </nav>
  );
};

export default Header;
