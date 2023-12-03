import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const UsuariosEditar = () => {
  const navigate = useNavigate();
  const { idUsuario } = useParams();
  const arreglo = idUsuario.split("@");

  const [Usuarios, setUsuarios] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
  });

  useEffect(() => {
    cargarProducto();
  }, [idUsuario]); // Dependencia para el useEffect

  const cargarProducto = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Productos/${arreglo[0]}`);
      console.log("Respuesta de la API:", response);

      if (response) {
        setUsuarios({
          nombre: response.nombre,
          email: response.email,
          password: response.password,
    
        });
      } else {
        console.error("No se encontró el producto con el ID proporcionado.");
      }
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  };

  
  const onChange = (e) => {
    setUsuarios({
      ...Usuarios,
      [e.target.name]: e.target.value,
    });
  };

  const editarUsuario = async () => {
    const arreglo = idUsuario.split("@");
    const idUsuarios = arreglo[0];

    const data = {
      nombre: Usuarios.nombre,
      email: Usuarios.email,
      password: Usuarios.password,

    };

    const response = await APIInvoke.invokePUT(`/Usuarios/${idUsuarios}`, data);

    if (response) {
      navigate("/PanelUsuarios");
      const msg = "El usuario fue editado correctamente.";
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
      const msg = "El usuario no fue editado correctamente.";
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
    editarUsuario();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainerMedico />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Editar Usuarios"}
          breadCrumb1={"Listado de usuarios"}
          breadCrumb2={"Edición"}
          ruta1={"/PanelUsuarios"}
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
                    value={Usuarios.nombre}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="email" 
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Ingrese el email"
                    value={Usuarios.email}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Ingrese la Contrasena"
                    value={Usuarios.password}
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

export default UsuariosEditar;
