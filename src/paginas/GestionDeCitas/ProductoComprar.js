import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';

const ProductoComprar = async ({ idProducto, idUsuario }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    paymentMethod: "cashOnDelivery", // Default to cash on delivery
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await APIInvoke.invokePOST(`/Compras`, {
        idUsuario,
        idProducto,
        name: formData.name,
        city: formData.city,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      });

      if (response && response.id) {
        navigate("/Productos");
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
        setFormData({
          name: "",
          city: "",
          address: "",
          paymentMethod: "",
        });
      } else {
        // Manejar errores de la API
        console.error('Error al realizar la compra');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complete Your Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="form-control"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="cashOnDelivery">Cash on Delivery</option>
            <option value="creditCard">Credit Card</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default ProductoComprar;
