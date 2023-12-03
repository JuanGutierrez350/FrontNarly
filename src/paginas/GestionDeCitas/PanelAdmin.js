import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const PanelAdmin = () => {
  const [Productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Productos`);
      console.log("Respuesta de la API:", response); 
      if (Array.isArray(response)) {
        setProductos(response); 
        console.log("Productos actualizados:", response); 
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProductos = async (e, idProductos) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/Productos/${idProductos}`);

    if (response === response) {
      const msg = "El producto fue eliminado correctamente.";
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
      cargarProductos();
    } else {
      const msg = "El producto no se elimino correctamente.";
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
          titulo={"Listado de Productos"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Panel"}
          ruta1={"/HomeMedico"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link to="/ProductosCrear" className="btn btn-sm btn-primary">
                  Crear Producto
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
                    <th style={{ width: "30%" }}>precio</th>
                    <th style={{ width: "10%" }}>categoria</th>
                    <th style={{ width: "20%" }}>imagen</th>
                    <th style={{ width: "10%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                {Productos.map((item) => (
  <tr key={item.id}>
    <td>{item.id}</td>
    <td>{item.nombre}</td>
    <td>{item.precio}</td>
    <td>{item.categoria}</td>
    <td>
      {item.imagen && (
        <img
          src={item.imagen}  // Establece la URL de la imagen
          alt={`Imagen de ${item.nombre}`}  // Agrega un texto alternativo
          style={{ maxWidth: '100px', maxHeight: '100px' }}  // Establece el tamaño máximo
        />
      )}
    </td>
    <td>
      <Link
        to={`/ProductosEditar/${item.id}@${encodeURIComponent(item.nombre)}@${encodeURIComponent(item.precio)}@${encodeURIComponent(item.categoria)}@${encodeURIComponent(item.imagen)}`}
        className="btn btn-sm btn-primary"
      >
        Editar
      </Link>
      &nbsp;&nbsp;
      <button
        onClick={(e) => eliminarProductos(e, item.id)}
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

export default PanelAdmin;
