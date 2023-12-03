import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";



const encriptarPassword = (password) => {
    // Lógica de encriptación aquí (puedes usar bibliotecas como bcrypt en un entorno de producción)
    const asteriscos = '*'.repeat(password.length);
    return asteriscos;
  };

const PanelUsuarios = () => {
  const [Usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {

    try {

      const response = await APIInvoke.invokeGET(`/Usuarios`);
      console.log("Respuesta de la API:", response); 
      if (Array.isArray(response)) {
        setUsuarios(response); 
        console.log("Usuarios actualizados:", response); 
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  

  const eliminarUsuarios = async (e, idUsuarios) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/Usuarios/${idUsuarios}`);

    if (response === response) {
      const msg = "El usuario fue eliminado correctamente.";
      swal({
        title: "Información",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });
      cargarUsuarios();
    } else {
      const msg = "El usuario no se elimino correctamente.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    }
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Usuarios"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Panel"}
          ruta1={"/HomeAdmin"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                
              <Link to="/UsuarioCrear" className="btn btn-sm btn-primary">
  Crear Usuario
</Link>
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "20%" }}>nombre</th>
                    <th style={{ width: "10%" }}>email</th>
                    <th style={{ width: "10%" }}>contrasena</th>
                    <th style={{ width: "10%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
  {Usuarios.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.nombre}</td>
      <td>{item.email}</td>
      <td>{encriptarPassword(item.password)}</td>
      <td>
        <Link
          to={`/UsuariosEditar/${item.id}@${encodeURIComponent(item.nombre)}@${encodeURIComponent(item.email)}@${encodeURIComponent(item.password)}`}
          className="btn btn-sm btn-primary"
        >
          Editar
        </Link>
        &nbsp;&nbsp;
        <button
          onClick={(e) => eliminarUsuarios(e, item.id)}
          className="btn btn-sm btn-danger"
        >
          Eliminar
        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PanelUsuarios;
