import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { Modal, Button, Form } from "react-bootstrap";

const AgendarCita = () => {
    const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    nombrePerro: "",
    fecha: "",
    hora: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const agendarCita = async (e) => {
    e.preventDefault();

    try {
      const response = await APIInvoke.invokePOST("/citas", formData);

      if (response && response.id) {
        handleClose();
        const msg = "La cita fue agendada correctamente.";
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
        
        // Redirigir al usuario al inicio
        navigate("/PanelUsuarios");
      } else {
        // Manejar errores de la API
        console.error('Error al agendar la cita');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  // Abre el modal automáticamente al cargar el componente
  useEffect(() => {
    handleShow();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agendar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={agendarCita}>
          <Form.Group controlId="formNombrePerro">
            <Form.Label>Nombre del Perro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del perro"
              name="nombrePerro"
              value={formData.nombrePerro}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formHora">
            <Form.Label>Hora</Form.Label>
            <Form.Control
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción de la cita"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Agendar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AgendarCita;
