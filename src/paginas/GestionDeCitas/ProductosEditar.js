import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProductosEditar = () => {
  const navigate = useNavigate();
  const { idProducto } = useParams();
  const arreglo = idProducto.split("@");

  const [Productos, setProductos] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
  });

  useEffect(() => {
    cargarProducto();
  }, [idProducto]); // Dependencia para el useEffect

  const cargarProducto = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Productos/${arreglo[0]}`);
      console.log("Respuesta de la API:", response);

      if (response) {
        setProductos({
          nombre: response.nombre,
          precio: response.precio,
          categoria: response.categoria,
          imagen: response.imagen,
        });
      } else {
        console.error("No se encontró el producto con el ID proporcionado.");
      }
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  };

  
  const onChange = (e) => {
    setProductos({
      ...Productos,
      [e.target.name]: e.target.value,
    });
  };

  const editarProducto = async () => {
    const arreglo = idProducto.split("@");
    const idProductos = arreglo[0];

    const data = {
      nombre: Productos.nombre,
      precio: Productos.precio,
      categoria: Productos.categoria,
      imagen : Productos.imagen,
    };

    const response = await APIInvoke.invokePUT(`/Productos/${idProductos}`, data);

    if (response) {
      navigate("/PanelAdmin");
      const msg = "El producto fue editado correctamente.";
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
    } else {
      const msg = "El producto no fue editado correctamente.";
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

  const onSubmit = (e) => {
    e.preventDefault();
    editarProducto();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainerMedico />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Editar productos"}
          breadCrumb1={"Listado de productos"}
          breadCrumb2={"Edición"}
          ruta1={"/PanelAdmin"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
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
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese el Nombre"
                    value={Productos.nombre}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio">Precio</label>
                  <input
                    type="number" 
                    className="form-control"
                    id="precio"
                    name="precio"
                    placeholder="Ingrese el Precio"
                    value={Productos.precio}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria">Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoria"
                    name="categoria"
                    placeholder="Ingrese la Categoría"
                    value={Productos.categoria}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagen"
                    name="imagen"
                    placeholder="Ingrese link de imagen"
                    value={Productos.imagen}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductosEditar;
