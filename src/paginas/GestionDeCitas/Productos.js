import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import SidebarContainer from "../../componentes/SidebarContainer";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import Navbar from "../../componentes/Navbar";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      const response = await APIInvoke.invokeGET("/Productos");

      if (Array.isArray(response)) {
        setProductos(response);
      } else {
        console.error("La respuesta de la API de productos no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleComprar = (idProducto) => {
    // Redirect to the purchase page with the product ID
    navigate(`/ProductoComprar`);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Productos"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Productos"}
          ruta1={"/Home"}
        />

        {/* Agrega esto para filtrar por categoría */}
        <div className="form-group">
          <label htmlFor="categoria">Filtrar por Categoría:</label>
          <select
            id="categoria"
            className="form-control"
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setSubcategoriaSeleccionada(""); // Restablece la subcategoría cuando se cambia la categoría
            }}
            value={categoriaSeleccionada || ""}
          >
            <option value="">Todas</option>
            {productos
              .map((producto) => producto.categoria)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
          </select>
        </div>

        {/* Agrega esto para filtrar por Subcategoría */}
       

        <section className="content">
          <div className="card">
            <div className="card-body">
              {/* Mapeo de productos con filtrado por categoría y subcategoría */}
              {productos
                .filter(
                  (producto) =>
                    (!categoriaSeleccionada || producto.categoria === categoriaSeleccionada) &&
                    (!subcategoriaSeleccionada || producto.subcategoria === subcategoriaSeleccionada)
                )
                .map((producto) => (
                  <div className="card" key={producto.id}>
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">Precio: {producto.precio}</p>
                      <p className="card-text">Categoría: {producto.categoria}</p>
                      <p className="card-text">Subcategoría: {producto.subcategoria}</p>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{ maxWidth: '150px', maxHeight: '150px' }}
                      />
                      <br />
                      {/* Botón para abrir el formulario de compra */}
                      <button
                        onClick={() => handleComprar(producto.id)}
                        className="btn btn-outline-success"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Productos;
