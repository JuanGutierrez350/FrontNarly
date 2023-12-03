import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import SidebarContainer from "../../componentes/SidebarContainer";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import Navbar from "../../componentes/Navbar";
import swal from 'sweetalert';
import Menu from "../../componentes/Menu";

const Productos = () => {
  const [cantidades, setCantidades] = useState({});
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const handleAgregarAlCarrito = (producto) => {
    const cantidad = parseInt(cantidades[producto.id]) || 0;

    if (isNaN(cantidad) || cantidad <= 0) {
      swal({
        text: 'Ingrese una cantidad válida',
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
      return;
    }

    const productoEnCarrito = carrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      productoEnCarrito.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      setCarrito([...carrito, { ...producto, cantidad }]);
    }

    // Restablece la cantidad a 1 después de agregar al carrito
    setCantidades({ ...cantidades, [producto.id]: "" });

    swal({
      text: `${cantidad} ${producto.nombre} agregado al carrito`,
      icon: 'success',
      buttons: {
        confirm: {
          text: 'Ok',
          value: true,
          visible: true,
          className: 'btn btn-primary',
          closeModal: true
        }
      }
    });
  };

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
        <section className="content">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Id</th>
                    <th style={{ width: "30%" }}>Nombre</th>
                    <th style={{ width: "20%" }}>Precio</th>
                    <th style={{ width: "15%" }}>Cantidad</th>
                    <th style={{ width: "20%" }}>Categoría</th>
                    <th style={{ width: "20%" }}>Imagen</th>
                    <th style={{ width: "30%" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>
                        <input
                          type="text"
                          value={cantidades[producto.id] || ""}
                          onChange={(e) => setCantidades({ ...cantidades, [producto.id]: e.target.value })}
                          placeholder="Cantidad"
                          className="form-control"
                        />
                      </td>
                      <td>{producto.categoria}</td>
                      <td>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{ maxWidth: '150px', maxHeight: '150px' }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleAgregarAlCarrito(producto)}
                          className="btn btn-outline-success"
                        >
                          Comprar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Menu carrito={carrito} />
      <Footer />
    </div>
  );
};

export default Productos;
