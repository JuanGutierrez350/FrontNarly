import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { Modal, Button, Form } from "react-bootstrap";

const CrearUsuario = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const crearUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await APIInvoke.invokePOST(`/Usuarios`, formData);

      if (response && response.id) {
        handleClose();
        const msg = "El usuario fue creado correctamente.";
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
        navigate("/PanelUsuarios");
      } else {
        // Manejar errores de la API
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  useEffect(() => {
    // Abre automáticamente el modal al renderizar el componente
    handleShow();
  }, []); // Asegúrate de dejar el array de dependencias vacío para que se ejecute solo una vez al montar el componente

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={crearUsuario}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrearUsuario;
