import React from "react";
import Navbar from "../componentes/Navbar";
import SidenarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";

// Importar la imagen que deseas usar como fondo
import backgroundImage from "../../node_modules/admin-lte/dist/img/cerca-veterinario-cuidando-perro.jpg";

const Home = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidenarContainer></SidenarContainer>
      {/* Utilizar el estilo para establecer la imagen de fondo */}
      <div className="content-wrapper" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <ContentHeader
          titulo={"Inicio"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Proyectos"}
          ruta1={"/Home"}
        />
        

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Ver Productos</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="nav-icon fa fa-store" />
                  </div>
                  <Link to={"/Productos"} className="small-box-footer">
                     Tienda
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

export default Home;
