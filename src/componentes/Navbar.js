import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Función para manejar la acción de cerrar sesión
  const handleLogout = () => {
    // Eliminar la bandera de autenticación del almacenamiento local
    localStorage.removeItem('isLoggedIn');

    // Mostrar una alerta cuando se hace clic en "Cerrar Sesión"
    alert("Sesión cerrada");

    // Aquí puedes agregar lógica adicional para cerrar la sesión si es necesario
  };

  return (
    <div>
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" data-widget="pushmenu" href="#" role="button">
                <i className="fas fa-bars" />
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              {/* Agregar el manejador de eventos al enlace de "Cerrar Sesión" */}
              <Link to={"/"} className="nav-link" onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" data-widget="fullscreen" role="button">
                <i className="fas fa-expand-arrows-alt" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
