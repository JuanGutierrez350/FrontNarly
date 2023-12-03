import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProductosCrear = () => {
  const navigate = useNavigate();

  const [Producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  const [nuevaCategoria, setNuevaCategoria] = useState("");

  useEffect(() => {
    const categoriaElement = document.getElementById("categoria");
    if (categoriaElement) {
      categoriaElement.focus();
    }
  }, []);

  const { nombre, precio, imagen } = Producto;

  const onChange = (e) => {
    setProducto({
      ...Producto,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNuevaCategoria = (e) => {
    setNuevaCategoria(e.target.value);
  };

  const crearProducto = async () => {
    const data = {
      nombre: Producto.nombre,
      precio: Producto.precio,
      imagen: Producto.imagen,
      categoria: nuevaCategoria,
    };
    const response = await APIInvoke.invokePOST(`/Productos`, data);

    if (response && response.id) {
      navigate("/PanelAdmin");
      const msg = "El producto fue creado correctamente.";
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
      setProducto({
        nombre: "",
        precio: "",
        imagen: "",
        categoria: "",
      });
      setNuevaCategoria(""); // Limpiar el campo de nueva categoría
    } else {
      const msg = "El producto no fue creado correctamente.";
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
    crearProducto();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Creación de Productos "}
          breadCrumb1={"Listado de productos"}
          breadCrumb2={"Creación"}
          ruta1={"/ProductosAdmin"}
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
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingrese el Nombre"
                      value={nombre}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      name="precio"
                      value={precio}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="imagen">imagen</label>
                    <input
                      type="text"
                      className="form-control"
                      id="imagen"
                      name="imagen"
                      value={imagen}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nuevaCategoria">Nueva Categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nuevaCategoria"
                      name="nuevaCategoria"
                      value={nuevaCategoria}
                      onChange={onChangeNuevaCategoria}
                      required
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProductosCrear;
