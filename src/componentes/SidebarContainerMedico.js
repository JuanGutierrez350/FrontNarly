import React from "react";
import MenuMedico from "./MenuMedico";
import Logo from '../../node_modules/admin-lte/dist/img/favicon.ico'
import { Link } from "react-router-dom";
const SidebarContainerMedico = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to={"/HomeAdmin"} className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">OmegaPetShop</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            &nbsp;
          </div>
          <div className="info">
            &nbsp;
          </div>
          <div className="info">
            <Link to={"/HomeAdmin"} className="d-block">
              Menu Principal
            </Link>
          </div>
        </div>
        <MenuMedico></MenuMedico>
      </div>
    </aside>
  );
};

export default SidebarContainerMedico;
