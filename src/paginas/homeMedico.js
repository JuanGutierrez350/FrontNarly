import React from "react";
import Navbar from "../componentes/Navbar";
import SidebarContainerMedico from "../componentes/sideBarContainerVeretinario";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";

const HomeMedico = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado"}
          breadCrumb1={"Incio"}
          breadCrumb2={"Proyectos"}
          ruta1={"/homeMedico"}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Citas</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-edit" />
                  </div>
                  <Link to={"/CitasMedico"} className="small-box-footer">
                    Ver citas medicas
                    <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeMedico;
